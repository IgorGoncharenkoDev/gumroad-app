import { SearchData } from 'firecrawl'

import { apiRequest } from '@/lib/api-client/api-request'
import {
  GetImageAssetsReturn,
  GetProductDetailReturn,
  PatchImageAssetParams,
  PatchImageAssetReturn,
  PatchProductParams,
  PatchProductReturn,
  PatchPublishProductReturn, PostFirecrawlIngestParams,
  PostFirecrawlIngestReturn, PostFirecrawlScrapeParams, PostFirecrawlScrapeReturn,
  PostFirecrawlSearchParams,
  PostFirecrawlSearchReturn,
  PostLoginUserParams,
  PostLoginUserReturn,
  PostLogoutUserReturn,
  PostProductParams,
  PostProductReturn,
  PostRegisterUserParams,
  PostRegisterUserReturn,
} from '@/lib/api-client/types'
import { ApiResponse } from '@/types/api.types'
import {
  AssetDTO,
  ProductDTO,
  ProductIngestAssetsDTO,
  ProductScrapeDTO,
  UserDTO,
} from '@/types/dtos.types'

export const apiClient = {
  auth: {
    loginUser: {
      post: (data: PostLoginUserParams): PostLoginUserReturn =>
        apiRequest<ApiResponse<UserDTO>>('/auth/login', {
          body: JSON.stringify(data),
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
          body: JSON.stringify(data),
          method: 'POST',
        }),
    },
  },
  creator: {
    imageAssets: {
      get: (productId: string): GetImageAssetsReturn =>
        apiRequest<ApiResponse<AssetDTO[]>>(
          `/creator/products/${productId}/assets`,
        ),
      patch: ({
        imageAssetId,
        productId,
      }: PatchImageAssetParams): PatchImageAssetReturn =>
        apiRequest<ApiResponse<ProductDTO>>(
          `/creator/products/${productId}/cover`,
          {
            body: JSON.stringify({ imageAssetId }),
            method: 'PATCH',
          },
        ),
    },

    products: {
      getDetail: (productId: string): GetProductDetailReturn =>
        apiRequest<ApiResponse<ProductDTO>>(`/creator/products/${productId}`),
      patch: ({ data, productId }: PatchProductParams): PatchProductReturn =>
        apiRequest<ApiResponse<ProductDTO>>(`/creator/products/${productId}`, {
          body: JSON.stringify(data),
          method: 'PATCH',
        }),

      post: (data: PostProductParams): PostProductReturn =>
        apiRequest<ApiResponse<ProductDTO>>('/creator/products', {
          body: JSON.stringify(data),
          method: 'POST',
        }),

      publish: (productId: string): PatchPublishProductReturn =>
        apiRequest<ApiResponse<ProductDTO>>(
          `/creator/products/${productId}/publish`,
          {
            method: 'PATCH',
          },
        ),
    },
  },
  firecrawl: {
    ingest: ({
      productId,
      selectedCandidates,
    }: PostFirecrawlIngestParams): PostFirecrawlIngestReturn =>
      apiRequest<ApiResponse<ProductIngestAssetsDTO>>(
        `/creator/products/${productId}/assets/ingest`,
        {
          body: JSON.stringify({ selectedCandidates }),
          method: 'POST',
        },
      ),
    scrape: ({
      productId,
      url,
    }: PostFirecrawlScrapeParams): PostFirecrawlScrapeReturn =>
      apiRequest<ApiResponse<ProductScrapeDTO>>(
        `/creator/products/${productId}/firecrawl/scrape`,
        {
          body: JSON.stringify({ url }),
          method: 'POST',
        },
      ),
    search: ({
      searchParams,
      productId,
    }: PostFirecrawlSearchParams): PostFirecrawlSearchReturn =>
      apiRequest<ApiResponse<SearchData>>(
        `/creator/products/${productId}/firecrawl/search`,
        {
          body: JSON.stringify(searchParams),
          method: 'POST',
        },
      ),
  },
  user: {},
}

export type ApiClient = typeof apiClient
