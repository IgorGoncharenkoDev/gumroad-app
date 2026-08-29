'use client'

import { useRouter } from 'next/navigation'
import { SubmitEvent, useState } from 'react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { ApiError } from '@/lib/errors/ApiError'
import { useCreateProduct } from '@/lib/hooks/mutations/useProduct'

export function NewProductForm({ formId }: { formId: string }) {
  const router = useRouter()

  const { isPending: isMutationPending, mutate: mutateCreateProduct } =
    useCreateProduct()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    mutateCreateProduct(
      {
        price,
        title,
      },
      {
        onSuccess: () => {
          toast.success('A new product was successfully created!')
          router.push('/dashboard/products')
          router.refresh()
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            error.getValidationFieldError()?.forEach(({ field, message }) => {
              toast.error(`Incorrect '${field}' value, reason: ${message}`)
            })
          }
        }
      },
    )
  }

  return (
    <form className="w-full" id={formId} onSubmit={handleFormSubmit}>
      <section className="p-4 md:p-8">
        <div className="space-y-6">
          <fieldset className="space-y-1">
            <legend>Name</legend>
            <Input
              className="h-10 rounded-none bg-card shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isMutationPending}
              placeholder="Name of yout digital product"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className="space-y-1">
            <legend>Price</legend>
            <p>
              <small className="mb-1">(EUR, example: 10, 10.99)</small>
            </p>
            <Input
              className="h-10 rounded-none bg-card shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isMutationPending}
              placeholder="Price of yout digital product"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </section>
    </form>
  )
}
