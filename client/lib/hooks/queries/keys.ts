export const productKeys = {
  all: () => ['product'] as const,
  details: () => [...productKeys.all(), 'detail'] as const,
  detail: (productId: string) => [productKeys.details(), productId] as const,
}

export const productAssetsKeys = {
  all: () => ['productAssets'] as const,
  lists: () => [...productAssetsKeys.all(), 'list'] as const,
  list: (productId: string) =>
    [...productAssetsKeys.lists(), productId] as const,
}
