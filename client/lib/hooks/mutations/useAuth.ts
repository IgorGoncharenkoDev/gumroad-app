import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client/api-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

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

export function useLoginUser() {
  return useMutation({
    mutationFn: (userData: {
      email: string
      password: string
    }) => unwrapApiResultOrThrow(apiClient.auth.loginUser.post({ ...userData })),

    onSuccess: () => {
      // TODO i |> invalidate user related queries
    },
  })
}