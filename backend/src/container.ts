/* * This is a composition root - place where the dependencies are assembled.
 * Its job is to create implementations and wire them together.
 * */

import { createPurchaseService } from '@/services/purchase.service'
import { createMongoPurchaseTransaction } from '@/services/purchase/mongodb-purchase-transaction'

// mongodb specific transaction
const purchaseTransaction = createMongoPurchaseTransaction()

export const purchaseService = createPurchaseService({
  transaction: purchaseTransaction,
})