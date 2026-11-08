package com.school.attendance.repository;

import com.school.attendance.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.*;
import java.util.*;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);

    List<Attendance> findByStudentClassRoomIdAndDate(Long classId, LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.student.classRoom.id = :classId AND a.date >= :from AND a.date <= :to")
    List<Attendance> findByClassAndDateRange(@Param("classId") Long classId, @Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND FUNCTION('YEAR', a.date) = :year AND FUNCTION('MONTH', a.date) = :month")
    List<Attendance> findByStudentAndMonth(@Param("studentId") Long studentId, @Param("year") int year, @Param("month") int month);

    @Query("SELECT DISTINCT a.student.classRoom.id FROM Attendance a WHERE a.date = :today")
    List<Long> findClassIdsWithAttendanceToday(@Param("today") LocalDate today);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.date = :today AND a.status = :status")
    long countByDateAndStatus(@Param("today") LocalDate today, @Param("status") AttendanceStatus status);
}

