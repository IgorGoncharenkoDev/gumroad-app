import type { Request, Response } from 'express'
import type { SearchData } from 'firecrawl'

import type {
  CreateProductRequestBodyDTO,
  CreatorProductSearchRequestBodyDTO,
  IngestAssetsRequestBodyDTO,
  ScrapeProductRequestBodyDTO,
  UpdateProductCoverRequestBodyDTO,
  UpdateProductRequestBodyDTO,
} from '@/api/schemas/creator/product.schema'
import type {
  ApiResponse,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from '@/api/types/api.types'
import type {
  ProductIngestAssetsDTO,
  ProductScrapeDTO,
  SafeImageAssetDTO,
  SafeProductDTO,
} from '@/api/types/dtos.types'
import { ProductModel } from '@/db/mongodb/models/product.model'
import { toSafeProductDTO } from '@/lib/mappers/product.mapper'
import searchCreatorProduct, {
  createProduct,
  getProductAssets,
  getProductDetails,
  ingestAssets,
  scrapeCreatorProduct,
  updateProduct,
  updateProductCover,
  updateProductVisibility,
} from '@/services/creator-product.service'

/* IMPORT ROUTE HANDLERS */

type SearchProductResponse = ApiResponse<SearchData>

export async function httpPostCreatorProductSearch(
  req: RequestWithParamsAndBody<
    { productId: string },
    CreatorProductSearchRequestBodyDTO
  >,
  res: Response<SearchProductResponse>,
) {
  const searchData = await searchCreatorProduct({
    productId: req.params.productId,
    searchData: req.body,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: searchData,
  })
}

type ScrapeProductResponse = ApiResponse<ProductScrapeDTO>

export async function httpPostCreatorProductScrape(
  req: RequestWithParamsAndBody<
    { productId: string },
    ScrapeProductRequestBodyDTO
  >,
  res: Response<ScrapeProductResponse>,
) {
  const scrape = await scrapeCreatorProduct({
    productId: req.params.productId,
    url: req.body.url,
    userId: req.user.id
  })

  return res.json({ status: 'success', data: scrape })
}

/* PRODUCT ROUTE HANDLERS */

type CreateProductResponse = ApiResponse<SafeProductDTO>

export async function httpPostProduct(
  req: RequestWithBody<CreateProductRequestBodyDTO>,
  res: Response<CreateProductResponse>,
) {
  const product = await createProduct({
    productData: req.body,
    user: req.user,
  })

  return res.json({
    status: 'success',
    data: product,
  })
}

type GetProductsResponse = ApiResponse<SafeProductDTO[]>

export async function httpGetProducts(
  req: Request,
  res: Response<GetProductsResponse>,
) {
  const products = await ProductModel.find({ creatorId: req.user.id }).sort({
    createdAt: -1,
  })

  const productsDTO = products.map((p) => toSafeProductDTO(p))

  return res.json({
    status: 'success',
    data: productsDTO,
  })
}

type GetProductResponse = ApiResponse<SafeProductDTO>

export async function httpGetProduct(
  req: RequestWithParams<{ productId: string }>,
  res: Response<GetProductResponse>,
) {
  const product = await getProductDetails({
    productId: req.params.productId,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: product,
  })
}

type PatchProductResponse = ApiResponse<SafeProductDTO>

export async function httpPatchProduct(
  req: RequestWithParamsAndBody<
    { productId: string },
    UpdateProductRequestBodyDTO
  >,
  res: Response<PatchProductResponse>,
) {
  const updatedProduct = await updateProduct({
    data: req.body,
    productId: req.params.productId,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: updatedProduct,
  })
}

type PatchProductCoverResponse = ApiResponse<SafeProductDTO>

export async function httpPatchProductCover(
  req: RequestWithParamsAndBody<
    { productId: string },
    UpdateProductCoverRequestBodyDTO
  >,
  res: Response<PatchProductCoverResponse>,
) {
  const updatedProduct = await updateProductCover({
    data: req.body,
    productId: req.params.productId,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: updatedProduct,
  })
}

type PatchProductVisibilityResponse = ApiResponse<SafeProductDTO>

export async function httpPatchProductVisibility(
  req: RequestWithParams<{ productId: string }>,
  res: Response<PatchProductVisibilityResponse>,
) {
  const updatedProduct = await updateProductVisibility({
    productId: req.params.productId,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: updatedProduct,
  })
}

type GetProductAssetsResponse = ApiResponse<SafeImageAssetDTO[]>

export async function httpGetProductAssets(
  req: RequestWithParams<{ productId: string }>,
  res: Response<GetProductAssetsResponse>,
) {
  const assets = await getProductAssets({
    productId: req.params.productId,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: assets,
  })
}

type PostProductIngestAssets = ApiResponse<ProductIngestAssetsDTO>

export async function httpPostProductIngestAssets(
  req: RequestWithParamsAndBody<
    { productId: string },
    IngestAssetsRequestBodyDTO
  >,
  res: Response<PostProductIngestAssets>,
) {
  const result = await ingestAssets({
    productId: req.params.productId,
    selectedCandidates: req.body.selectedCandidates,
    userId: req.user.id,
  })

  return res.json({
    status: 'success',
    data: result,
  })
}