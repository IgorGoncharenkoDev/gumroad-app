import Stripe from 'stripe'

import { env } from '@/config/env'
import type { DbProductDocument } from '@/db/mongodb/models/product.model'

export const stripe = new Stripe(env.STRIPE_KEY_SECRET)

type CheckoutProduct = {
  id: string
  title: DbProductDocument['title']
  price: DbProductDocument['price']
}

type CreateCheckoutSessionParams = {
  product: CheckoutProduct
  userId: string
}

export async function createCheckoutSession({
  product,
  userId,
}: CreateCheckoutSessionParams) {
  return stripe.checkout.sessions.create({
    mode: 'payment',

    metadata: {
      productId: product.id,
      userId,
    },

    line_items: [
      {
        price_data: {
          currency: 'eur',

          product_data: {
            name: product.title,
          },

          unit_amount: product.price,
        },

        quantity: 1,
      },
    ],

    success_url: `${env.WEB_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.WEB_BASE_URL}/payment/cancelled`,
  })
}

export function constructWebhookEvent(payload: Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  )
}
