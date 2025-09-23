export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}
