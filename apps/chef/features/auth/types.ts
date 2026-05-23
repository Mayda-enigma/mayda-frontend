export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'chef' | 'waiter' | 'manager';
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'chef' | 'waiter' | 'manager';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginPayloadDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  access_token: string;
  user: UserDto;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface RegisterPayloadDto {
  email: string;
  password: string;
  name: string;
}
