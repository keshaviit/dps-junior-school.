package com.school.attendance.dto;
public record ReportRow(Long studentId, String studentName, String rollNo, int present, int absent, int leave, double percentage) {}

