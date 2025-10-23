package com.app.task_manager_backend.task;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    /** Read all tasks */
    public List<Task> findAll() {
        return repository.findAll();
    }

    /** Read one task or throw 404-style domain exception */
    public Task findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    /** Create a new task (ignore any incoming id) */
    public Task create(Task task) {
        task.setId(null);                  // ensure a new row is created
        return repository.save(task);
    }

    /**
     * Update an existing task using the path id.
     * Loads the existing entity (throws if missing), copies fields from incoming,
     * and returns the updated entity.
     */
    @Transactional
    public Task update(Long id, Task incoming) {
        Task existing = findById(id);      // throws TaskNotFoundException if not present

        // apply updates (you can add null checks if you want partial updates)
        existing.setTitle(incoming.getTitle());
        existing.setDescription(incoming.getDescription());
        existing.setStatus(incoming.getStatus());
        existing.setDueDate(incoming.getDueDate());

        // inside a transaction, the managed entity is flushed automatically;
        // returning existing is enough. (Alternatively: return repository.save(existing);)
        return existing;
    }

    /** Delete by id (throws if not found to keep behavior consistent) */
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
