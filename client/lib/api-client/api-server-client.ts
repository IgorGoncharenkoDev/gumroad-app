import { apiServerRequest } from '@/lib/api-client/api-server-request'
import { GetCurrentUserReturn } from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { UserDTO } from '@/types/dtos.types'

export const apiServerClient = {
  user: {
    currentUser: {
      get: (): GetCurrentUserReturn =>
        apiServerRequest<ApiResponse<UserDTO>>('/me'),
    },
  },
}

export type ApiClient = typeof apiServerClient
