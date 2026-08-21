import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/lib/apiClient'
import { unwrapApiResultOrThrow } from '@/lib/apiClient/helpers'

export function useRegisterUser() {
  return useMutation({
    mutationFn: (userData: {
      email: string
      name: string
      password: string
    }) => unwrapApiResultOrThrow(apiClient.auth.registerUser.post({ ...userData })),

    onSuccess: () => {
      // TODO i |> invalidate user related queries
    },
  })
}
