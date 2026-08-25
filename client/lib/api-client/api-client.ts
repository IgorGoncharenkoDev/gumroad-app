import { apiRequest } from '@/lib/api-client/api-request'
import {
  PostLoginUserParams,
  PostLoginUserReturn, PostLogoutUserReturn,
  PostRegisterUserParams,
  PostRegisterUserReturn,
} from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { SafeUserDTO } from '@/types/dtos.types'

export const apiClient = {
  auth: {
    loginUser: {
      post: (data: PostLoginUserParams): PostLoginUserReturn =>
        apiRequest<ApiResponse<SafeUserDTO>>('/auth/login', {
          body: JSON.stringify({ ...data }),
          method: 'POST',
        }),
    },
    logoutUser: {
      post: (): PostLogoutUserReturn =>
        apiRequest<ApiResponse<null>>('/auth/logout', { method: 'POST' }),
    },
    registerUser: {
      post: (data: PostRegisterUserParams): PostRegisterUserReturn =>
        apiRequest<ApiResponse<SafeUserDTO>>('/auth/register', {
          body: JSON.stringify({ ...data }),
          method: 'POST',
        }),
    },
  },
  user: {},
}

export type ApiClient = typeof apiClient
