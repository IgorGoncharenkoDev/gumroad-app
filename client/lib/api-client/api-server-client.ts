import { apiServerRequest } from '@/lib/api-client/api-server-request'
import { GetCurrentUserReturn, GetProductsReturn } from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { ProductDTO, UserDTO } from '@/types/dtos.types'

export const apiServerClient = {
  creator: {
    products: {
      get: (): GetProductsReturn =>
        apiServerRequest<ApiResponse<ProductDTO[]>>('/creator/products'),
    },
  },
  user: {
    currentUser: {
      get: (): GetCurrentUserReturn =>
        apiServerRequest<ApiResponse<UserDTO>>('/me'),
    },
  },
}

export type ApiServerClient = typeof apiServerClient
