package com.school.attendance.dto;

import com.school.attendance.entity.Attendance;
import java.time.LocalDate;

public record AttendanceResponse(Long id, Long studentId, String studentName, String rollNo, LocalDate date, String status) {
    public static AttendanceResponse from(Attendance a) {
        return new AttendanceResponse(
            a.getId(), a.getStudent().getId(),
            a.getStudent().getName(), a.getStudent().getRollNo(),
            a.getDate(), a.getStatus().name()
        );
    }
}

