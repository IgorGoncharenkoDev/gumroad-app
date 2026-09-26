'use client'

import { useCallback, useMemo, useState } from 'react'

import { EditPanel } from '@/components/creator/products/edit-panel'
import { ImportPanel } from '@/components/creator/products/import-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useProductAssetsQuery,
  useProductDetailQuery,
} from '@/lib/hooks/queries/useProduct'
import { AssetDTO, ProductDTO } from '@/types/dtos.types'

type ProductEditorProps = {
  assets: AssetDTO[]
  product: ProductDTO
}

export default function ProductEditor({
  assets: initialAssets,
  product: initialProduct,
}: ProductEditorProps) {
  const { refetch: refetchProductDetail } = useProductDetailQuery(
    initialProduct.id,
  )
  const { refetch: refetchAssets } = useProductAssetsQuery(initialProduct.id)

  const [assets, setAssets] = useState<AssetDTO[]>(initialAssets)
  const [product, setProduct] = useState<ProductDTO>(initialProduct)

  const coverUrl = useMemo(() => {
    const cover = assets.find((asset) => asset.id === product.coverImageAssetId)

    return cover?.cloudinary.secureUrl ?? null
  }, [assets, product.coverImageAssetId])

  const refreshAll = useCallback(async () => {
    const [productResult, assetsResult] = await Promise.all([
      refetchProductDetail(),
      refetchAssets(),
    ])

    if (productResult.data) {
      setProduct(productResult.data)
    }

    if (assetsResult.data) {
      setAssets(assetsResult.data)
    }
  }, [refetchProductDetail, refetchAssets])

  return (
    <Tabs className="space-y-6" defaultValue="edit">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="w-full sm:w-90 rounded-none border border-border bg-card">
          <TabsTrigger
            className="rounded-none data-active:bg-[#ff90e8] data-active:text-black"
            value="edit"
          >
            Edit
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none data-active:bg-[#ff90e8] data-active:text-black"
            value="import"
          >
            Firecrawl Import Suite
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent className="space-y-6" value="edit">
        <EditPanel
          assets={assets}
          coverUrl={coverUrl}
          product={product}
          onAssetsChange={setAssets}
          onProductChange={setProduct}
        />
      </TabsContent>

      <TabsContent className="space-y-6" value="import">
        <ImportPanel productId={initialProduct.id} onAfterIngest={refreshAll} />
      </TabsContent>
    </Tabs>
  )
}
