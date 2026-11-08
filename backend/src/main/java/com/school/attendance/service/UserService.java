package com.school.attendance.service;

import com.school.attendance.dto.*;
import com.school.attendance.entity.*;
import com.school.attendance.exception.*;
import com.school.attendance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final ClassRoomRepository classRoomRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserResponse> getAllTeachers() {
        return userRepository.findByRole(Role.TEACHER).stream()
            .map(UserResponse::from).collect(Collectors.toList());
    }

    public UserResponse createTeacher(CreateUserRequest req) {
        if (userRepository.existsByEmail(req.email()))
            throw new BadRequestException("Email already in use");
        User user = User.builder()
            .name(req.name()).email(req.email())
            .passwordHash(passwordEncoder.encode(req.password()))
            .role(Role.TEACHER).active(true).build();
        return UserResponse.from(userRepository.save(user));
    }

    public UserResponse updateTeacher(Long id, UpdateUserRequest req) {
        User user = findTeacher(id);
        user.setName(req.name());
        user.setEmail(req.email());
        return UserResponse.from(userRepository.save(user));
    }

    public void disableTeacher(Long id) {
        User user = findTeacher(id);
        user.setActive(false);
        userRepository.save(user);
    }

    public void resetPassword(Long id, ResetPasswordRequest req) {
        User user = findTeacher(id);
        user.setPasswordHash(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
    }

    public UserResponse assignClasses(Long id, AssignClassesRequest req) {
        User user = findTeacher(id);
        Set<ClassRoom> classes = new HashSet<>(classRoomRepository.findAllById(req.classIds()));
        user.setAssignedClasses(classes);
        return UserResponse.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public List<ClassResponse> getTeacherClasses(User teacher) {
        return teacher.getAssignedClasses().stream()
            .map(ClassResponse::from).collect(Collectors.toList());
    }

    private User findTeacher(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Teacher not found"));
        if (user.getRole() != Role.TEACHER)
            throw new BadRequestException("User is not a teacher");
        return user;
    }
}

