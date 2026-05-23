import { useQuery } from "@tanstack/react-query"
import { authService } from "./services"
import { toUser } from "./mappers"
import { authKeys } from "./queryKeys"

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.me().then(toUser),
    retry: false,
  })
}
