import type { ReactNode } from 'react'

import { getVisitor } from '@/lib/auth/get-visitor'

type AuthLayoutProps = {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await getVisitor()
  
  return (
    <div className="flex min-h-dvh">
      <div className="flex-1">
        <div className="mx-auto flex h-full max-w-2xl flex-col">{children}</div>
      </div>
      <div className="relative hidden w-[40vw] border-l border-zinc-200 md:block">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src="https://assets.gumroad.com/packs/static/822e112a3b444c69f7ef.png"
        />
      </div>
    </div>
  )
}
