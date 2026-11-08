package com.school.attendance.config;

import com.school.attendance.entity.*;
import com.school.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@school.com")) {
            User admin = User.builder()
                .name("School Admin")
                .email("admin@school.com")
                .passwordHash(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .active(true)
                .build();
            userRepository.save(admin);
            log.info("==============================================");
            log.info("Default admin created:");
            log.info("  Email   : admin@school.com");
            log.info("  Password: admin123");
            log.info("  CHANGE THIS PASSWORD IMMEDIATELY!");
            log.info("==============================================");
        }
    }
}

