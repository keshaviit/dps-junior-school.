package com.school.attendance.repository;

import com.school.attendance.entity.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClassRoomRepository extends JpaRepository<ClassRoom, Long> {
    Optional<ClassRoom> findByNameAndSection(String name, String section);
}

