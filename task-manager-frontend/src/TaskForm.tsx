import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import type { Task } from './types';

interface TaskFormProps {
  open: boolean;
  initialTask?: Task;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, initialTask, onClose, onSave }) => {
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'TODO',
    dueDate: '',
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    setTask({
      title: initialTask?.title ?? '',
      description: initialTask?.description ?? '',
      status: initialTask?.status ?? 'TODO',
      dueDate: initialTask?.dueDate ?? '',
    });
    setErrors({});
  }, [initialTask, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err: typeof errors = {};
    if (!task.title.trim()) err.title = 'Title is required';
    if (task.title.length > 100) err.title = 'Max 100 characters';
    if (task.description && task.description.length > 500)
      err.description = 'Max 500 characters';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(task);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
        {initialTask ? 'Edit Task' : 'Add Task'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={task.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="TODO">TODO</MenuItem>
          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
        </TextField>
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.dark' } }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
