package com.school.attendance.controller;

import com.school.attendance.dto.ClassResponse;
import com.school.attendance.entity.User;
import com.school.attendance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final UserService userService;

    @GetMapping("/classes")
    public List<ClassResponse> myClasses(@AuthenticationPrincipal User teacher) {
        return userService.getTeacherClasses(teacher);
    }
}

