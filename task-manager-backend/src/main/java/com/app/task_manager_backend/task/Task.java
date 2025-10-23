package com.app.task_manager_backend.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Task.java
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private TaskStatus status = TaskStatus.TODO;

    private LocalDate dueDate;
}
