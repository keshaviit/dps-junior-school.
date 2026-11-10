package com.school.attendance.service;

import com.school.attendance.dto.*;
import com.school.attendance.entity.ClassRoom;
import com.school.attendance.exception.*;
import com.school.attendance.repository.ClassRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClassService {
    private final ClassRoomRepository classRoomRepository;

    @Transactional(readOnly = true)
    public List<ClassResponse> getAll() {
        return classRoomRepository.findAll().stream()
            .map(ClassResponse::from).collect(Collectors.toList());
    }

    public ClassResponse create(ClassRequest req) {
        classRoomRepository.findByNameAndSection(req.name(), req.section()).ifPresent(c -> {
            throw new BadRequestException("Class " + req.name() + " Section " + req.section() + " already exists");
        });
        ClassRoom c = ClassRoom.builder().name(req.name()).section(req.section()).build();
        return ClassResponse.from(classRoomRepository.save(c));
    }

    public ClassResponse update(Long id, ClassRequest req) {
        ClassRoom c = classRoomRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Class not found"));
        c.setName(req.name());
        c.setSection(req.section());
        return ClassResponse.from(classRoomRepository.save(c));
    }

    public void delete(Long id) {
        if (!classRoomRepository.existsById(id))
            throw new NotFoundException("Class not found");
        classRoomRepository.deleteById(id);
    }
}

