package com.school.attendance.controller;

import com.school.attendance.dto.*;
import com.school.attendance.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final ClassService classService;
    private final StudentService studentService;
    private final AttendanceService attendanceService;

    // Teachers
    @GetMapping("/teachers")
    public List<UserResponse> listTeachers() {
        return userService.getAllTeachers();
    }

    @PostMapping("/teachers")
    public ResponseEntity<UserResponse> createTeacher(@Valid @RequestBody CreateUserRequest req) {
        return ResponseEntity.status(201).body(userService.createTeacher(req));
    }

    @PutMapping("/teachers/{id}")
    public UserResponse updateTeacher(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest req) {
        return userService.updateTeacher(id, req);
    }

    @PatchMapping("/teachers/{id}/disable")
    public ResponseEntity<Void> disableTeacher(@PathVariable Long id) {
        userService.disableTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/teachers/{id}/reset-password")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id, @Valid @RequestBody ResetPasswordRequest req) {
        userService.resetPassword(id, req);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/teachers/{id}/classes")
    public UserResponse assignClasses(@PathVariable Long id, @RequestBody AssignClassesRequest req) {
        return userService.assignClasses(id, req);
    }

    // Classes
    @GetMapping("/classes")
    public List<ClassResponse> listClasses() {
        return classService.getAll();
    }

    @PostMapping("/classes")
    public ResponseEntity<ClassResponse> createClass(@Valid @RequestBody ClassRequest req) {
        return ResponseEntity.status(201).body(classService.create(req));
    }

    @PutMapping("/classes/{id}")
    public ClassResponse updateClass(@PathVariable Long id, @Valid @RequestBody ClassRequest req) {
        return classService.update(id, req);
    }

    @DeleteMapping("/classes/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Students
    @GetMapping("/students")
    public List<StudentResponse> listStudents(@RequestParam Long classId) {
        return studentService.getByClass(classId);
    }

    @PostMapping("/students")
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest req) {
        return ResponseEntity.status(201).body(studentService.create(req));
    }

    @PutMapping("/students/{id}")
    public StudentResponse updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequest req) {
        return studentService.update(id, req);
    }

    @PatchMapping("/students/{id}/disable")
    public ResponseEntity<Void> disableStudent(@PathVariable Long id) {
        studentService.disable(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/students/upload")
    public CsvUploadResult uploadStudents(@RequestParam("file") MultipartFile file) throws IOException {
        return studentService.uploadCsv(file);
    }

    // Summary Dashboard
    @GetMapping("/summary")
    public AdminSummary getSummary() {
        return attendanceService.getAdminSummary();
    }
}

