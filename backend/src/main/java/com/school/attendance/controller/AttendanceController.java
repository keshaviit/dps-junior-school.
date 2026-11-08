package com.school.attendance.controller;

import com.school.attendance.dto.*;
import com.school.attendance.entity.User;
import com.school.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @GetMapping
    public List<AttendanceResponse> getAttendance(
            @RequestParam Long classId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getForClass(classId, date);
    }

    @PostMapping
    public ResponseEntity<Void> saveAttendance(@Valid @RequestBody AttendanceRequest req,
                                                @AuthenticationPrincipal User user) {
        attendanceService.saveAttendance(req, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report")
    public List<ReportRow> monthlyReport(@RequestParam Long classId, @RequestParam String month) {
        String[] parts = month.split("-");
        return attendanceService.getMonthlyReport(classId, Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
    }

    @GetMapping("/report/export")
    public ResponseEntity<byte[]> exportReport(@RequestParam Long classId, @RequestParam String month) throws IOException {
        String[] parts = month.split("-");
        byte[] data = attendanceService.exportMonthlyReportExcel(classId, Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));
        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=attendance-report-" + month + ".xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(data);
    }

    @GetMapping("/history")
    public List<AttendanceResponse> history(
            @RequestParam Long classId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return attendanceService.getHistory(classId, from, to);
    }
}

