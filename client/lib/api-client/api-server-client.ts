import { apiServerRequest } from '@/lib/api-client/api-server-request'
import {
  GetAssetsReturn,
  GetCurrentUserReturn,
  GetProductDetailReturn,
  GetProductsReturn,
} from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import { AssetDTO, ProductDTO, UserDTO } from '@/types/dtos.types'

export const apiServerClient = {
  creator: {
    products: {
      get: (): GetProductsReturn =>
        apiServerRequest<ApiResponse<ProductDTO[]>>('/creator/products'),
      getAssets: (productId: string): GetAssetsReturn =>
        apiServerRequest<ApiResponse<AssetDTO[]>>(
          `/creator/products/${productId}/assets`,
        ),
      getDetail: (productId: string): GetProductDetailReturn =>
        apiServerRequest<ApiResponse<ProductDTO>>(
          `/creator/products/${productId}`,
        ),
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
