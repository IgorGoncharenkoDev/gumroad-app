import { apiRequest } from '@/lib/api-client/api-request'
import {
  PostLoginUserParams,
  PostLoginUserReturn,
  PostLogoutUserReturn,
  PostProductParams, PostProductReturn,
  PostRegisterUserParams,
  PostRegisterUserReturn,
} from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { ProductDTO, UserDTO } from '@/types/dtos.types'

export const apiClient = {
  auth: {
    loginUser: {
      post: (data: PostLoginUserParams): PostLoginUserReturn =>
        apiRequest<ApiResponse<UserDTO>>('/auth/login', {
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
        apiRequest<ApiResponse<UserDTO>>('/auth/register', {
          body: JSON.stringify({ ...data }),
          method: 'POST',
        }),
    },
  },
  creator: {
    products: {
      post: (data: PostProductParams): PostProductReturn =>
        apiRequest<ApiResponse<ProductDTO>>('/creator/products', {
          body: JSON.stringify({ ...data }),
          method: 'POST',
        }),
    },
  },
  user: {},
}

export type ApiClient = typeof apiClient
