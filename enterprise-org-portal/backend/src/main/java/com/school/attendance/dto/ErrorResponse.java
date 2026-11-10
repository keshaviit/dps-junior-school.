package com.school.attendance.dto;
import java.time.LocalDateTime;
public record ErrorResponse(int status, String message, LocalDateTime timestamp) {}

