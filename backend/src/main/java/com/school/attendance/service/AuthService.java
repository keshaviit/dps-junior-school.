package com.school.attendance.service;

import com.school.attendance.dto.*;
import com.school.attendance.entity.User;
import com.school.attendance.exception.BadRequestException;
import com.school.attendance.repository.UserRepository;
import com.school.attendance.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
            .orElseThrow(() -> new BadRequestException("Invalid email or password"));
        if (!user.isActive())
            throw new BadRequestException("Account is disabled. Contact admin.");
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash()))
            throw new BadRequestException("Invalid email or password");
        String token = jwtUtil.generateToken(user);
        return new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}

