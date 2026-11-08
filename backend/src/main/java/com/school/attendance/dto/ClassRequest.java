package com.school.attendance.dto;
import jakarta.validation.constraints.*;
public record ClassRequest(@NotBlank String name, @NotBlank String section) {}

