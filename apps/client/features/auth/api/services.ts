import { apiClient } from "@/shared/api/client"
import type { LoginInput, LoginResponseDto, UserDto } from "@/features/auth/types"

export const authService = {
  login: (payload: LoginInput) =>
    apiClient<LoginResponseDto>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  register: (payload: LoginInput) =>
    apiClient<LoginResponseDto>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => apiClient<UserDto>("/auth/me"),
}
