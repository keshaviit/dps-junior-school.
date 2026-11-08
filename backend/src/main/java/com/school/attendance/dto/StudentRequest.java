package com.school.attendance.dto;
import jakarta.validation.constraints.*;
public record StudentRequest(@NotBlank String rollNo, @NotBlank String name, @NotNull Long classId) {}

