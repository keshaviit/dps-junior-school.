package com.school.attendance.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "classrooms")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ClassRoom {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String section;

    @ManyToMany(mappedBy = "assignedClasses")
    private Set<User> teachers = new HashSet<>();

    @OneToMany(mappedBy = "classRoom", cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();
}

