import { ConflictError } from '@/errors/conflict.error'
import { logger } from '@/lib/logger'
import { hasUserProductAccess } from '@/repositories/mongodb/product-access.repository'
import { findProductById } from '@/repositories/product.repository'
import { createCheckoutSession } from '@/services/stripe.service'

type HandleCheckoutParams = {
  productId: string
  userId: string
}

export async function handleCheckout({
  productId,
  userId,
}: HandleCheckoutParams) {
  const dbProduct = await findProductById(productId)

  if (!dbProduct || dbProduct.visibility !== 'published') {
    throw new ConflictError('Product not found')
  }

  const hasAccessToProduct = await hasUserProductAccess({
    productId,
    userId,
  })

  if (hasAccessToProduct) {
    logger.info('Checkout rejected: product already purchased', {
      userId,
      productId,
    })

    throw new ConflictError('You have already purchased this product')
  }

  return await createCheckoutSession({
    product: {
      id: productId,
      title: dbProduct.title,
      price: dbProduct.price,
    },
    userId,
  })
}
