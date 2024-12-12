export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type RegistrationDto = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expiresIn: number;
  role: string;
};
