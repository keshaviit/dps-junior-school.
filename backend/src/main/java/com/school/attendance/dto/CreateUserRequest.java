package com.school.attendance.dto;
import jakarta.validation.constraints.*;
public record CreateUserRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    @NotBlank @Size(min = 6) String password
) {}

