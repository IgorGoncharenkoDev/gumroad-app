import type { SearchData } from 'firecrawl'

import { Candidate } from '@/lib/types/product'
import { ApiResponse, ClientResult } from '@/types/api.types';
import {
  AssetDTO,
  ProductDTO, ProductIngestAssetsDTO,
  ProductScrapeDTO,
  UserDTO,
} from '@/types/dtos.types'

export type PostLoginUserParams = {
  email: string
  password: string
}
export type PostLoginUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostRegisterUserParams = {
  email: string
  name: string
  password: string
}
export type PostRegisterUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostLogoutUserReturn = Promise<
  ClientResult<ApiResponse<null>>
>

export type GetCurrentUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostProductParams = {
  title: string
  price: string | number
}
export type PostProductReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>

export type GetProductsReturn = Promise<ClientResult<ApiResponse<ProductDTO[]>>>
export type GetProductDetailReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>
export type GetAssetsReturn = Promise<ClientResult<ApiResponse<AssetDTO[]>>>

export type PatchProductParams = {
  data: {
    description?: string
    price?: string
    title?: string
  }
  productId: string
}
export type PatchProductReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>

export type GetImageAssetsReturn = Promise<ClientResult<ApiResponse<AssetDTO[]>>>
export type PatchImageAssetParams = {
  imageAssetId: string
  productId: string
}
export type PatchImageAssetReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>

export type PatchPublishProductReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>

export type PostFirecrawlIngestParams = {
  productId: string
  selectedCandidates: Candidate[]
}

export type PostFirecrawlIngestReturn = Promise<
  ClientResult<ApiResponse<ProductIngestAssetsDTO>>
>

export type PostFirecrawlScrapeParams = {
  productId: string
  url: string
}
export type PostFirecrawlScrapeReturn = Promise<
  ClientResult<ApiResponse<ProductScrapeDTO>>
>

export type PostFirecrawlSearchParams = {
  productId: string
  searchParams: {
    limit: number
    query: string
  }
}
export type PostFirecrawlSearchReturn = Promise<ClientResult<ApiResponse<SearchData>>>