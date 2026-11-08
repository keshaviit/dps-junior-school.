package com.school.attendance.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public record AttendanceRequest(
    @NotNull Long classId,
    @NotNull LocalDate date,
    @NotNull @Size(min = 1) List<AttendanceEntry> attendance
) {
    public record AttendanceEntry(@NotNull Long studentId, @NotNull String status) {}
}

