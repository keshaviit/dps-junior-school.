package com.school.attendance.dto;

import com.school.attendance.entity.ClassRoom;

public record ClassResponse(Long id, String name, String section) {
    public static ClassResponse from(ClassRoom c) {
        return new ClassResponse(c.getId(), c.getName(), c.getSection());
    }
}

