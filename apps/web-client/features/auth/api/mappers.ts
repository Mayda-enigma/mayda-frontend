import type { UserDto, User, LoginInput, LoginPayloadDto } from '../types';

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  name: dto.name,
  role: dto.role,
});

export const toLoginPayloadDto = (input: LoginInput): LoginPayloadDto => ({
  email: input.email,
  password: input.password,
});
