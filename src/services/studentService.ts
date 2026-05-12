import axios from 'axios';
import type { Student, StudentFormData } from '../types/Student';

const API_URL = 'http://localhost:5000/api/students';

export const studentService = {
  getAll: (): Promise<Student[]> =>
    axios.get<Student[]>(API_URL).then((res) => res.data),

  getById: (id: string): Promise<Student> =>
    axios.get<Student>(`${API_URL}/${id}`).then((res) => res.data),

  create: (data: StudentFormData): Promise<Student> =>
    axios.post<Student>(API_URL, data).then((res) => res.data),

  update: (id: string, data: StudentFormData): Promise<Student> =>
    axios.put<Student>(`${API_URL}/${id}`, data).then((res) => res.data),

  remove: (id: string): Promise<void> =>
    axios.delete(`${API_URL}/${id}`).then(() => undefined),
};
