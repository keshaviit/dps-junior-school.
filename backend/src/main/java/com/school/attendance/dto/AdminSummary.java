package com.school.attendance.dto;
import java.util.List;
public record AdminSummary(long totalStudents, long presentToday, long absentToday, List<ClassResponse> classesNotMarked) {}

