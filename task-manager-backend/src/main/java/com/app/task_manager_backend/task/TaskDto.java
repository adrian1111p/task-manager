package com.app.task_manager_backend.task;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TaskDto {
    private Long id;
    @NotBlank @Size(max = 100) private String title;
    @Size(max = 500) private String description;
    @NotNull private TaskStatus status;
    private LocalDate dueDate;
}
