export interface Student {
  _id: string;
  studentId: string;
  fullName: string;
  course: string;
  yearLevel: number;
  email: string;
  status: 'enrolled' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type StudentFormData = Omit<Student, '_id' | 'createdAt' | 'updatedAt'>;
