package com.school.attendance.dto;

import com.school.attendance.entity.User;
import java.util.*;
import java.util.stream.Collectors;

public record UserResponse(Long id, String name, String email, String role, boolean active, List<ClassResponse> classes) {
    public static UserResponse from(User u) {
        return new UserResponse(
            u.getId(), u.getName(), u.getEmail(),
            u.getRole().name(), u.isActive(),
            u.getAssignedClasses().stream().map(ClassResponse::from).collect(Collectors.toList())
        );
    }
}

