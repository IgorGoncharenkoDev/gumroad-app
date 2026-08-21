import { apiRequest } from '@/lib/apiClient/apiRequest'
import {
  PostRegisterUserParams,
  PostRegisterUserReturn,
} from '@/lib/apiClient/types'
import { ApiResponse } from '@/types/api.types'
import { SafeUserDTO } from '@/types/dtos.types'

export const apiClient = {
  auth: {
    registerUser: {
      post: (data: PostRegisterUserParams): PostRegisterUserReturn =>
        apiRequest<ApiResponse<SafeUserDTO>>('/auth/register', {
          body: JSON.stringify({ ...data }),

          method: 'POST',
        }),
    },
  },
}

export type ApiClient = typeof apiClient
