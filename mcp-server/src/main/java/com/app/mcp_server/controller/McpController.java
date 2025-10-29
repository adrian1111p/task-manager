package com.app.mcp_server.controller;

import com.app.mcp_server.entity.Task;
import com.app.mcp_server.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mcp")
public class McpController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/schema/tasks")
    public ResponseEntity<Map<String, String>> getTaskSchema() {
        Map<String, String> schema = Map.of(
                "id", "Long",
                "title", "String (max 100 characters, required)",
                "description", "String (max 500 characters, optional)",
                "status", "Enum [TODO, IN_PROGRESS, DONE]",
                "dueDate", "LocalDate (required)"
        );
        return ResponseEntity.ok(schema);
    }

    @PostMapping("/tasks")
    public ResponseEntity<String> insertTasks(@RequestBody List<Task> tasks) {
        taskRepository.saveAll(tasks);
        return ResponseEntity.ok("Tasks inserted successfully.");
    }

    @GetMapping("/tasks-summary")
    public ResponseEntity<Map<String, Long>> getTasksSummary() {
        Map<String, Long> summary = taskRepository.findAll().stream()
                .collect(Collectors.groupingBy(task -> task.getStatus().name(), Collectors.counting()));
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/help")
    public ResponseEntity<String> getHelp() {
        String helpMessage = "Available endpoints:\n" +
                "/mcp/schema/tasks - Returns the database schema for the tasks table.\n" +
                "/mcp/tasks - Accepts a JSON array of Task objects and inserts them into the database.\n" +
                "/mcp/tasks-summary - Returns summary statistics (e.g., task counts per status).\n" +
                "/mcp/help - Returns this help message.";
        return ResponseEntity.ok(helpMessage);
    }
}