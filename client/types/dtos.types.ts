export type UserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type ProductDTO = {
  coverImageAssetId: string | null
  creatorId: string
  description: string
  id: string
  price: number
  slug: string
  stats: {
    assetCount: number
    soldCount: number
  }
  title: string
  visibility: 'draft' | 'published'
}

export type AssetDTO = {
  id: string
  cloudinary: {
    secureUrl: string
  }
  creatorId: string
  productId: string
  meta: {
    filename: string
    contentType: string
    sizeBytes: number
    width: number
    height: number
  }
  source: {
    sourcePageUrl?: string
    sourceUrl: string
  }
}

export type ProductScrapeDTO = {
  candidates: {
    url: string
    sourcePageUrl: string
  }[]
  description: string
}

type SelectedAsset = {
  url: string
  sourcePageUrl: string
}

export type ProductIngestAssetsDTO = {
  assetsIngested: AssetDTO[]
  assetsFailedToIngest: (SelectedAsset & { message: string })[]
}