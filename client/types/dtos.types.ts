export type UserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type ProductDTO = {
  id: string
  creatorId: string
  title: string
  description: string
  price: number
  slug: string
  coverImageAssetId: string | null
  stats: {
    assetCount: number
    soldCount: number
  }
}