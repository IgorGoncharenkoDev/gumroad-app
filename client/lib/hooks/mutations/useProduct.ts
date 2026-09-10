import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client/api-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

export function useCreateProduct() {
  return useMutation({
    mutationFn: (productData: {
      price: string,
      title: string,
    }) => unwrapApiResultOrThrow(apiClient.creator.products.post({ ...productData })),
  })
}