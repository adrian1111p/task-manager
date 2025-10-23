package com.app.task_manager_backend.task;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<TaskDto> getAll() {
        return service.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public TaskDto getById(@PathVariable Long id) {
        return toDto(service.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto create(@Valid @RequestBody TaskDto dto) {
        // ignore incoming dto.id on create
        Task toCreate = toEntity(dto);
        toCreate.setId(null);
        Task saved = service.create(toCreate);
        return toDto(saved);
    }

    @PutMapping("/{id}")
    public TaskDto update(@PathVariable Long id, @Valid @RequestBody TaskDto dto) {
        Task incoming = toEntity(dto);
        // the service should apply 'id' to the existing entity and save
        Task updated = service.update(id, incoming);
        return toDto(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // --- mapping ---

    private TaskDto toDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate()); // LocalDate in DTO -> Jackson serializes as "yyyy-MM-dd"
        return dto;
    }

    private Task toEntity(TaskDto dto) {
        Task task = new Task();
        // do NOT trust dto.id for create; service will handle id on update
        task.setId(dto.getId());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());
        return task;
    }
}
