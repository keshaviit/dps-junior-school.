package com.school.attendance.repository;

import com.school.attendance.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByClassRoomIdAndActiveTrue(Long classId);
    List<Student> findByClassRoomId(Long classId);
    boolean existsByRollNoAndClassRoomId(String rollNo, Long classId);
}

