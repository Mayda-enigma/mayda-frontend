import type { UserDto, User, LoginInput, LoginPayloadDto } from '../types';

const roleMap: Record<string, 'customer' | 'chef' | 'waiter' | 'manager'> = {
  CLIENT: 'customer',
  CHEF: 'chef',
  WAITER: 'waiter',
  MANAGER: 'manager',
  ADMIN: 'manager',
};

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  name: `${dto.firstName} ${dto.lastName}`.trim(),
  role: roleMap[dto.role] || 'customer',
  restaurantId: dto.restaurantId,
});

export const toLoginPayloadDto = (input: LoginInput): LoginPayloadDto => ({
  email: input.email,
  password: input.password,
});
