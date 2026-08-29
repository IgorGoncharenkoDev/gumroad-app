import { XSquare } from 'lucide-react'
import Link from 'next/link'

import { NewProductForm } from '@/components/creator/products/new-product-form'

export default function NewProductPage () {
  const formId = 'newProductForm'
  return (
    <main className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-border bg-white p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <h1 className="line-clamp-2 hidden text-2xl font-semibold sm:block">
            Publish your product
          </h1>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-none md:-my-2">
            <Link
              className="inline-flex h-9 items-center justify-center gap-2 rounded-none border border-border bg-card px-4 text-sm font-medium"
              href={'/dashboard/products'}
            >
              <XSquare className="h-5 w-5" />
              <span>Cancel</span>
            </Link>

            <button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium"
              form={formId}
              type="submit"
            >
              Save Draft
            </button>
          </div>
        </div>
      </header>
      <div>
        <NewProductForm formId={formId} />
      </div>
    </main>
  )
}