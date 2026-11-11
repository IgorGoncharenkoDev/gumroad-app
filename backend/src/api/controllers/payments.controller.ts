import type { Response } from 'express'

import type { CreateCheckoutRequestBodyDTO } from '@/api/schemas/payments/payments.schema'
import type { ApiResponse, RequestWithBody } from '@/api/types/api.types'
import { handleCheckout } from '@/services/payments.service'

type CreateCheckoutResponse = ApiResponse<{
  url: string | null
}>

export async function httpPostCheckout(
  req: RequestWithBody<CreateCheckoutRequestBodyDTO>,
  res: Response<CreateCheckoutResponse>,
) {
  const { productId } = req.body
  const { id: userId } = req.user

  const session = await handleCheckout({
    productId,
    userId,
  })

  return res.json({
    status: 'success',
    data: {
      url: session.url,
    },
    message: 'Checkout session created successfully',
  })
}