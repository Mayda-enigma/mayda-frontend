import type { UserDto, User, LoginInput } from "@/features/auth/types"

export function toUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    role: dto.role,
  }
}

export function toLoginPayloadDto(input: LoginInput) {
  return { email: input.email, password: input.password }
}
