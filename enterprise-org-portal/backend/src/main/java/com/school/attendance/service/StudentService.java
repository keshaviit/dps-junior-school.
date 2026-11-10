package com.school.attendance.service;

import com.school.attendance.dto.*;
import com.school.attendance.entity.*;
import com.school.attendance.exception.*;
import com.school.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {
    private final StudentRepository studentRepository;
    private final ClassRoomRepository classRoomRepository;

    @Transactional(readOnly = true)
    public List<StudentResponse> getByClass(Long classId) {
        return studentRepository.findByClassRoomIdAndActiveTrue(classId).stream()
            .map(StudentResponse::from).collect(Collectors.toList());
    }

    public StudentResponse create(StudentRequest req) {
        ClassRoom c = classRoomRepository.findById(req.classId())
            .orElseThrow(() -> new NotFoundException("Class not found"));
        if (studentRepository.existsByRollNoAndClassRoomId(req.rollNo(), req.classId()))
            throw new BadRequestException("Roll number " + req.rollNo() + " already exists in this class");
        Student s = Student.builder()
            .rollNo(req.rollNo()).name(req.name()).classRoom(c).active(true).build();
        return StudentResponse.from(studentRepository.save(s));
    }

    public StudentResponse update(Long id, StudentRequest req) {
        Student s = studentRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        ClassRoom c = classRoomRepository.findById(req.classId())
            .orElseThrow(() -> new NotFoundException("Class not found"));
        s.setName(req.name());
        s.setRollNo(req.rollNo());
        s.setClassRoom(c);
        return StudentResponse.from(studentRepository.save(s));
    }

    public void disable(Long id) {
        Student s = studentRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Student not found"));
        s.setActive(false);
        studentRepository.save(s);
    }

    public CsvUploadResult uploadCsv(MultipartFile file) throws IOException {
        int created = 0;
        List<CsvUploadResult.RowError> errors = new ArrayList<>();
        try (Reader reader = new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);
             CSVParser parser = CSVFormat.DEFAULT.builder()
                 .setHeader().setSkipHeaderRecord(true).setIgnoreHeaderCase(true).setTrim(true).build()
                 .parse(reader)) {

            int row = 2;
            for (CSVRecord record : parser) {
                try {
                    String rollNo = record.get("rollNo");
                    String name = record.get("name");
                    String className = record.get("className");
                    String section = record.get("section");
                    if (rollNo == null || rollNo.isBlank() || name == null || name.isBlank()) {
                        errors.add(new CsvUploadResult.RowError(row, "rollNo and name are required"));
                        row++; continue;
                    }
                    ClassRoom c = classRoomRepository.findByNameAndSection(className, section)
                        .orElseGet(() -> classRoomRepository.save(
                            ClassRoom.builder().name(className).section(section).build()));
                    if (studentRepository.existsByRollNoAndClassRoomId(rollNo, c.getId())) {
                        errors.add(new CsvUploadResult.RowError(row, "Duplicate roll number: " + rollNo));
                        row++; continue;
                    }
                    studentRepository.save(Student.builder().rollNo(rollNo).name(name).classRoom(c).active(true).build());
                    created++;
                } catch (Exception e) {
                    errors.add(new CsvUploadResult.RowError(row, e.getMessage()));
                }
                row++;
            }
        }
        return new CsvUploadResult(created, errors);
    }
}

