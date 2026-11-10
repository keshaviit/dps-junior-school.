package com.school.attendance.dto;
import jakarta.validation.constraints.*;
public record ResetPasswordRequest(@NotBlank @Size(min = 6) String newPassword) {}

