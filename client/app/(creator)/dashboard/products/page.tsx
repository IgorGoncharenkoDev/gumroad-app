import { Plus } from 'lucide-react'
import Link from 'next/link'

import { apiServerClient } from '@/lib/api-client/api-server-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'

export default async function ProductsPage() {
  const products = await unwrapApiResultOrThrow(apiServerClient.creator.products.get())

  return (
    <main className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-border bg-white p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <h1 className="line-clamp-2 hidden text-2xl font-semibold sm:block">
            Products
          </h1>
          <div className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-none md:-my-2">
            <Link
              className="inline-flex h-9 items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] px-4 text-sm font-medium"
              href={'/dashboard/products/new'}
            >
              <Plus className="h-5 w-5" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="p-4 md:p-8">
        {!products.length ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">No products yet</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ id, price, stats, title }) => (
              <div
                className="rounded-xl border border-border bg-card p-4 transition hover:bg-card/80"
                key={id}
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    className="no-underline"
                    href={`/dashboard/products/${id}`}
                  >
                    <h3 className="truncate text-base font-semibold">
                      {title}
                    </h3>
                  </Link>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p>EUR {price}</p>
                    <p className="text-right">{stats.assetCount} assets</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="text-sm text-muted-foreground">
                    ID: <span className="font-mono">{id.slice(-6)}</span>
                  </div>
                  <Link
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] px-4 text-sm font-medium"
                    href={`/dashboard/products/${id}`}
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
