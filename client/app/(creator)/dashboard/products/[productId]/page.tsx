import Link from 'next/link'

import ProductEditor from '@/components/creator/products/product-editor'
import { apiServerClient } from '@/lib/api-client/api-server-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

type ProductPageProps<TParams extends Record<string, string | string[]>> = {
  params: Promise<TParams>
}

export default async function ProductPage({
  params,
}: ProductPageProps<{ productId: string }>) {
  const { productId } = await params

  const [product, assets] = await Promise.all([
    unwrapApiResultOrThrow(
      apiServerClient.creator.products.getDetail(productId),
    ),
    unwrapApiResultOrThrow(
      apiServerClient.creator.products.getAssets(productId),
    ),
  ])

  return (
    <main className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-border bg-white p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <h1 className="line-clamp-2 hidden text-2xl font-semibold sm:block">
            Product Details
          </h1>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-none md:-my-2">
            <Link
              className="inline-flex h-9 items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] px-4 text-sm font-medium"
              href={'/dashboard/products'}
            >
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="p-4 md:p-8">
        <ProductEditor assets={assets} product={product} />
      </section>
    </main>
  )
}
