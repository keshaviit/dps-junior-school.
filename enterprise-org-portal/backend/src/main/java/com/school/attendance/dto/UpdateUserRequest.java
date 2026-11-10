package com.school.attendance.dto;
import jakarta.validation.constraints.*;
public record UpdateUserRequest(@NotBlank String name, @NotBlank @Email String email) {}

