'use client'

import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { AssetsGrid } from '@/components/creator/products/assets-grid'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  usePublishProduct,
  useUpdateCover,
  useUpdateProduct,
} from '@/lib/hooks/mutations/useProduct'
import { useProductAssetsQuery } from '@/lib/hooks/queries/useProduct'
import { AssetDTO, ProductDTO } from '@/types/dtos.types'

type EditPanelProps = {
  product: ProductDTO
  assets: AssetDTO[]
  coverUrl: string | null
  onProductChange: Dispatch<SetStateAction<ProductDTO>>
  onAssetsChange: Dispatch<SetStateAction<AssetDTO[]>>
}

export function EditPanel({
  assets,
  coverUrl,
  product,
  onAssetsChange,
  onProductChange,
}: EditPanelProps) {
  const {
    isPending: isUpdateProductMutationPending,
    mutate: mutateUpdateProduct,
  } = useUpdateProduct()

  const { isPending: isUpdateCoverMutationPending, mutate: mutateUpdateCover } =
    useUpdateCover()

  const {
    isPending: isPublishProductMutationPending,
    mutate: mutatePublishProduct,
  } = usePublishProduct()

  const {
    isFetching: isProductAssetsQueryFetching,
    refetch: refetchProductAssets,
  } = useProductAssetsQuery(product.id)

  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState<string | number>(product.price)
  const [title, setTitle] = useState(product.title)

  const setCover = async (imageAssetId: string) => {
    mutateUpdateCover(
      {
        imageAssetId,
        productId: product.id,
      },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: (product) => {
          onProductChange(product)
        },
      },
    )
  }

  const handlePublish = async () => {
    mutatePublishProduct(
      { productId: product.id },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: (product) => {
          toast.success('Product published successfully')
          onProductChange(product)
        },
      },
    )
  }

  const handleSave = async () => {
    mutateUpdateProduct(
      {
        productData: {
          description: description.trim(),
          price: price.toString(),
          title: title.trim(),
        },
        productId: product.id,
      },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: (product) => {
          toast.success('Product details saved successfully')
          onProductChange(product)
        },
      },
    )
  }

  const handleRefreshAssets = async () => {
    const { data, isSuccess } = await refetchProductAssets()

    if (isSuccess) {
      toast.success('Assets refreshed successfully')
      onAssetsChange(data)
    }
  }

  const isLoading =
    isUpdateProductMutationPending ||
    isUpdateCoverMutationPending ||
    isPublishProductMutationPending

  return (
    <div className="space-y-5">
      <Card className="rounded-none border border-border bg-card p-4 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-base font-medium">Basics</div>
            <div className="text-xs text-muted-foreground">
              Slug: <span className="text-foreground">{product?.slug}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`px-2 py-1 text-xs ${
                product?.visibility === 'draft'
                  ? 'border border-border bg-[#ff90e8] text-black'
                  : 'border border-border bg-green-600 text-white'
              } `}
            >
              Status:{' '}
              <span>
                {product?.visibility === 'draft' ? 'Draft' : 'Published'}
              </span>
            </div>

            <Button
              className="text-black hover:bg-[#ff90e8] hover:text-black rounded-none bg-[#ff90e8]"
              disabled={isLoading}
              onClick={handleSave}
            >
              {isUpdateProductMutationPending ? 'Saving...' : 'Save'}
            </Button>
            {product.visibility === 'draft' ? (
              <Button
                className="text-black hover:bg-[#ff90e8] hover:text-black rounded-none bg-[#ff90e8]"
                disabled={isLoading}
                onClick={handlePublish}
              >
                {isPublishProductMutationPending ? 'Publishing...' : 'Publish'}
              </Button>
            ) : (
              <Button className="rounded-none" disabled={true}>
                Published
              </Button>
            )}

            <Button
              className="text-black hover:bg-[#ff90e8] hover:text-black rounded-none bg-[#ff90e8]"
              disabled={isProductAssetsQueryFetching}
              onClick={handleRefreshAssets}
            >
              Refresh Assets
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-none border border-border bg-card p-4 md:p-5">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div>Title</div>
              <Input
                className="h-10 rounded-none bg-card shadown-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div>Description</div>
              <Textarea
                className="h-32 rounded-none bg-card shadown-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div>Price</div>
              <Input
                className="h-10 rounded-none bg-card shadown-none focus-visible:ring-0 focus-visible:ring-offset-0"
                min={1}
                placeholder="Price"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="rounded-none border border-border bg-card p-4 md:p-5">
          <div className="text-base font-medium">Cover Image</div>
          <div className="mt-4 overflow-hidden border border-border bg-background">
            {coverUrl ? (
              <img
                alt="Cover image of the digital asset"
                className="h-64 w-full object-cover"
                src={coverUrl}
              />
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                No Cover set yet.
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="rounded-none border border-border bg-card p-4 md:p-5">
        <AssetsGrid
          actionLabel={(asset: AssetDTO): string =>
            asset.id === product.coverImageAssetId ? 'Cover' : 'Set as cover'
          }
          assets={assets}
          isActionActive={(asset: AssetDTO) =>
            asset.id === product.coverImageAssetId
          }
          onAction={(asset: AssetDTO) => setCover(asset.id)}
        />
      </Card>
    </div>
  )
}
