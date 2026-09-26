import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client/api-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

export function useCreateProduct() {
  return useMutation({
    mutationFn: (productData: { price: string; title: string }) =>
      unwrapApiResultOrThrow(
        apiClient.creator.products.post({ ...productData }),
      ),
  })
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({
      productData: data,
      productId,
    }: {
      productData: {
        description?: string
        price?: string
        title?: string
      }
      productId: string
    }) =>
      unwrapApiResultOrThrow(
        apiClient.creator.products.patch({
          data,
          productId,
        }),
      ),
  })
}

export function useUpdateCover() {
  return useMutation({
    mutationFn: ({
      imageAssetId,
      productId,
    }: {
      imageAssetId: string
      productId: string
    }) =>
      unwrapApiResultOrThrow(
        apiClient.creator.imageAssets.patch({
          imageAssetId,
          productId,
        }),
      ),
  })
}

export function usePublishProduct() {
  return useMutation({
    mutationFn: ({ productId }: { productId: string }) =>
      unwrapApiResultOrThrow(apiClient.creator.products.publish(productId)),
  })
}
