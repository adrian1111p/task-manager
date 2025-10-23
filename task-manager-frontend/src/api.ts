import axios from 'axios';
import type { Task } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export default api;