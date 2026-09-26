import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client/api-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'
import { productAssetsKeys, productKeys } from '@/lib/hooks/queries/keys'

export function useProductDetailQuery(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () =>
      unwrapApiResultOrThrow(apiClient.creator.products.getDetail(productId)),
    enabled: !!productId,
    staleTime: 30_000,
  })
}

export function useProductAssetsQuery(productId: string) {
  return useQuery({
    queryKey: productAssetsKeys.list(productId),
    queryFn: () =>
      unwrapApiResultOrThrow(apiClient.creator.imageAssets.get(productId)),
    enabled: !!productId,
    staleTime: 30_000,
  })
}
