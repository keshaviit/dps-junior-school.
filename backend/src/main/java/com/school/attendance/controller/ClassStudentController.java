package com.school.attendance.controller;

import com.school.attendance.dto.StudentResponse;
import com.school.attendance.entity.*;
import com.school.attendance.exception.BadRequestException;
import com.school.attendance.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassStudentController {
    private final StudentService studentService;

    @GetMapping("/{id}/students")
    public List<StudentResponse> getStudents(@PathVariable Long id, @AuthenticationPrincipal User user) {
        if (user.getRole() == Role.TEACHER) {
            boolean assigned = user.getAssignedClasses().stream().anyMatch(c -> c.getId().equals(id));
            if (!assigned) {
                throw new BadRequestException("You are not assigned to this class");
            }
        }
        return studentService.getByClass(id);
    }
}

