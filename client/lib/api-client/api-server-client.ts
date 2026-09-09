import { apiServerRequest } from '@/lib/api-client/api-server-request'
import { GetCurrentUserReturn, GetProductsReturn } from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { ProductDTO, UserDTO } from '@/types/dtos.types'

export const apiServerClient = {
  user: {
    currentUser: {
      get: (): GetCurrentUserReturn =>
        apiServerRequest<ApiResponse<UserDTO>>('/me'),
    },
  },
  products: {
    get: (): GetProductsReturn =>
      apiServerRequest<ApiResponse<ProductDTO[]>>('/products'),
  },
}

export type ApiServerClient = typeof apiServerClient
