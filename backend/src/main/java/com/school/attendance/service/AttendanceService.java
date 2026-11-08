package com.school.attendance.service;

import com.school.attendance.dto.*;
import com.school.attendance.entity.*;
import com.school.attendance.exception.*;
import com.school.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final ClassRoomRepository classRoomRepository;

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getForClass(Long classId, LocalDate date) {
        return attendanceRepository.findByStudentClassRoomIdAndDate(classId, date)
            .stream().map(AttendanceResponse::from).collect(Collectors.toList());
    }

    public void saveAttendance(AttendanceRequest req, User markedBy) {
        if (req.date().isAfter(LocalDate.now()))
            throw new BadRequestException("Cannot mark attendance for a future date");
        if (!classRoomRepository.existsById(req.classId()))
            throw new NotFoundException("Class not found");

        Set<Long> classStudentIds = studentRepository.findByClassRoomId(req.classId())
            .stream().map(Student::getId).collect(Collectors.toSet());

        for (AttendanceRequest.AttendanceEntry entry : req.attendance()) {
            if (!classStudentIds.contains(entry.studentId()))
                throw new BadRequestException("Student " + entry.studentId() + " does not belong to this class");
            AttendanceStatus status;
            try {
                status = AttendanceStatus.valueOf(entry.status());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status: " + entry.status());
            }
            Student student = studentRepository.findById(entry.studentId()).orElseThrow();
            Attendance attendance = attendanceRepository
                .findByStudentIdAndDate(entry.studentId(), req.date())
                .orElse(Attendance.builder().student(student).date(req.date()).build());
            attendance.setStatus(status);
            attendance.setMarkedBy(markedBy);
            attendanceRepository.save(attendance);
        }
    }

    @Transactional(readOnly = true)
    public List<ReportRow> getMonthlyReport(Long classId, int year, int month) {
        List<Student> students = studentRepository.findByClassRoomIdAndActiveTrue(classId);
        return students.stream().map(s -> {
            List<Attendance> records = attendanceRepository.findByStudentAndMonth(s.getId(), year, month);
            int present = (int) records.stream().filter(a -> a.getStatus() == AttendanceStatus.PRESENT).count();
            int absent  = (int) records.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count();
            int leave   = (int) records.stream().filter(a -> a.getStatus() == AttendanceStatus.LEAVE).count();
            int total   = present + absent + leave;
            double pct  = total > 0 ? Math.round((double) present / total * 1000.0) / 10.0 : 0.0;
            return new ReportRow(s.getId(), s.getName(), s.getRollNo(), present, absent, leave, pct);
        }).collect(Collectors.toList());
    }

    public byte[] exportMonthlyReportExcel(Long classId, int year, int month) throws IOException {
        List<ReportRow> rows = getMonthlyReport(classId, year, month);
        ClassRoom c = classRoomRepository.findById(classId)
            .orElseThrow(() -> new NotFoundException("Class not found"));
        try (Workbook wb = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = wb.createSheet("Attendance " + c.getName() + " " + c.getSection());
            CellStyle headerStyle = wb.createCellStyle();
            Font font = wb.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            Row header = sheet.createRow(0);
            String[] cols = {"Roll No", "Student Name", "Present", "Absent", "Leave", "Attendance %"};
            for (int i = 0; i < cols.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(cols[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 4000);
            }
            int r = 1;
            for (ReportRow row : rows) {
                Row dataRow = sheet.createRow(r++);
                dataRow.createCell(0).setCellValue(row.rollNo());
                dataRow.createCell(1).setCellValue(row.studentName());
                dataRow.createCell(2).setCellValue(row.present());
                dataRow.createCell(3).setCellValue(row.absent());
                dataRow.createCell(4).setCellValue(row.leave());
                dataRow.createCell(5).setCellValue(row.percentage() + "%");
            }
            wb.write(out);
            return out.toByteArray();
        }
    }

    @Transactional(readOnly = true)
    public AdminSummary getAdminSummary() {
        long total   = studentRepository.count();
        long present = attendanceRepository.countByDateAndStatus(LocalDate.now(), AttendanceStatus.PRESENT);
        long absent  = attendanceRepository.countByDateAndStatus(LocalDate.now(), AttendanceStatus.ABSENT);
        List<Long> markedClassIds = attendanceRepository.findClassIdsWithAttendanceToday(LocalDate.now());
        List<ClassResponse> notMarked = classRoomRepository.findAll().stream()
            .filter(cl -> !markedClassIds.contains(cl.getId()) && !cl.getStudents().isEmpty())
            .map(ClassResponse::from)
            .collect(Collectors.toList());
        return new AdminSummary(total, present, absent, notMarked);
    }

    @Transactional(readOnly = true)
    public List<AttendanceResponse> getHistory(Long classId, LocalDate from, LocalDate to) {
        return attendanceRepository.findByClassAndDateRange(classId, from, to)
            .stream().map(AttendanceResponse::from).collect(Collectors.toList());
    }
}

