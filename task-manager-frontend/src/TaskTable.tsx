import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { Task } from './types';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './TaskForm';

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'' | 'status' | 'dueDate'>('');

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task: Omit<Task, 'id'>) => {
    try {
      if (editingTask?.id != null) {
        await updateTask(editingTask.id, task);
      } else {
        await createTask(task);
      }
      setOpenForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch {
      setError('Failed to save task.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = (event.target.value || '') as '' | 'status' | 'dueDate';
    setSortBy(value);
    if (!value) {
      fetchTasks();
      return;
    }
    setTasks(prev => {
      const copy = [...prev];
      copy.sort((a, b) => {
        const av = (a[value] ?? '') as string;
        const bv = (b[value] ?? '') as string;
        return av.localeCompare(bv);
      });
      return copy;
    });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 1, backgroundColor: 'primary.main' }}
        onClick={() => setOpenForm(true)}
      >
        Add Task
      </Button>

      <FormControl size="small" sx={{ ml: 2, minWidth: 160 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
        </Select>
      </FormControl>

      <TableContainer
        component={Paper}
        sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.200' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell width={160}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate ?? ''}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => {
                      setEditingTask(task);
                      setOpenForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => task.id && handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <TaskForm
        open={openForm}
        initialTask={editingTask || undefined}
        onClose={() => {
          setOpenForm(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
      />
    </>
  );
};

export default TaskTable;
