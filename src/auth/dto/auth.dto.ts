export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: 'CLIENT' | 'ADMIN';
}

export interface LogInDTO {
  email: string;
  password: string;
}
