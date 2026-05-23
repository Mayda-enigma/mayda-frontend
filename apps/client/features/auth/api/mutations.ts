import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "./services"
import { authKeys } from "./queryKeys"

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("mayda_token", data.access_token)
      document.cookie = `mayda_token=${data.access_token}; path=/`
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem("mayda_token", data.access_token)
      document.cookie = `mayda_token=${data.access_token}; path=/`
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("mayda_token")
      localStorage.removeItem("mayda_cart")
      document.cookie = "mayda_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
