import type { ProductSchemaType } from '@/db/models/product.model'

export type SafeUserDTO = {
  email: string
  id: string
  isCreator: boolean
  name: string
}

export type ProductDTO = ProductSchemaType