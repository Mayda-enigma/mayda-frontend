export interface User {
  id: number;
  email: string | null;
  name: string;
  role: 'customer' | 'chef' | 'waiter' | 'manager';
  restaurantId: number | null;
}

export interface UserDto {
  id: number;
  email: string | null;
  phone: number;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  restaurantId: number | null;
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
  refresh_token: string;
  token_type: string;
  expires_in: number;
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

export interface StaffLoginInput {
  phone: number;
  password: string;
}

export interface StaffLoginPayloadDto {
  phone: number;
  password: string;
}

export interface TempTokenResponseDto {
  tempToken: string;
  message: string;
  requiresOtp: boolean;
  expiresIn: number;
}

export interface OtpVerificationInput {
  tempToken: string;
  otpCode: string;
}

export interface OtpVerificationDto {
  tempToken: string;
  otpCode: string;
}
