export interface UserDto {
  id: string
  email: string
  name: string
  role: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponseDto {
  access_token: string
  user: UserDto
}
