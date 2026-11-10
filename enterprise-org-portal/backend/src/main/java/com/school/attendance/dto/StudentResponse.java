package com.school.attendance.dto;

import com.school.attendance.entity.Student;

public record StudentResponse(Long id, String rollNo, String name, Long classId, String className, String section, boolean active) {
    public static StudentResponse from(Student s) {
        return new StudentResponse(
            s.getId(), s.getRollNo(), s.getName(),
            s.getClassRoom().getId(), s.getClassRoom().getName(),
            s.getClassRoom().getSection(), s.isActive()
        );
    }
}

