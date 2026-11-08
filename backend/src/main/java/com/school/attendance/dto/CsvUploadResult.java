package com.school.attendance.dto;
import java.util.List;
public record CsvUploadResult(int created, List<RowError> errors) {
    public record RowError(int row, String message) {}
}

