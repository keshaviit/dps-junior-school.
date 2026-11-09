package com.school.attendance.config;

import com.school.attendance.entity.*;
import com.school.attendance.repository.ClassRoomRepository;
import com.school.attendance.repository.StudentRepository;
import com.school.attendance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ClassRoomRepository classRoomRepository;
    private final StudentRepository studentRepository;
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
            log.info("Default admin created: admin@school.com");
        }

        // Seed classrooms for Playgroup to Class 8 (Section A)
        String[] classNames = {
            "Playgroup", "Nursery", "LKG", "UKG",
            "Class 1", "Class 2", "Class 3", "Class 4",
            "Class 5", "Class 6", "Class 7", "Class 8"
        };
        Map<String, ClassRoom> savedClasses = new HashMap<>();
        for (String cName : classNames) {
            ClassRoom cr = classRoomRepository.findByNameAndSection(cName, "A")
                .orElseGet(() -> classRoomRepository.save(
                    ClassRoom.builder().name(cName).section("A").build()
                ));
            savedClasses.put(cName, cr);
        }

        // Seed default teacher: teacher@dpsjunior.edu.in
        if (!userRepository.existsByEmail("teacher@dpsjunior.edu.in")) {
            Set<ClassRoom> teacherClasses = new HashSet<>();
            if (savedClasses.containsKey("LKG")) teacherClasses.add(savedClasses.get("LKG"));
            if (savedClasses.containsKey("UKG")) teacherClasses.add(savedClasses.get("UKG"));
            if (savedClasses.containsKey("Class 1")) teacherClasses.add(savedClasses.get("Class 1"));
            if (savedClasses.containsKey("Class 2")) teacherClasses.add(savedClasses.get("Class 2"));

            User teacher = User.builder()
                .name("Anita Sharma")
                .email("teacher@dpsjunior.edu.in")
                .passwordHash(passwordEncoder.encode("teacher123"))
                .role(Role.TEACHER)
                .active(true)
                .assignedClasses(teacherClasses)
                .build();
            userRepository.save(teacher);
            log.info("Default teacher created: teacher@dpsjunior.edu.in (Classes: LKG, UKG, Class 1, Class 2)");
        }

        // Seed initial sample students in Class 1 if empty
        ClassRoom class1 = savedClasses.get("Class 1");
        if (class1 != null && studentRepository.findByClassRoomId(class1.getId()).isEmpty()) {
            String[] names = {"Aarav Sharma", "Ananya Verma", "Vihaan Patel", "Diya Gupta", "Reyansh Singh"};
            int roll = 1;
            for (String sName : names) {
                studentRepository.save(Student.builder()
                    .name(sName)
                    .rollNo(String.format("1A%02d", roll++))
                    .classRoom(class1)
                    .active(true)
                    .build());
            }
        }
    }
}

