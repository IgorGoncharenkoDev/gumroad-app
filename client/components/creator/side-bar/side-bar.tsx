'use client'

import { LogOut, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  midLevelLinks,
  NavItem,
  topLevelLinks,
} from '@/components/creator/side-bar/nav-items'
import { NavLink } from '@/components/creator/side-bar/nav-link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useLogoutUser } from '@/lib/hooks/mutations/useAuth'

type LinksBlockProps = {
  items: NavItem[]
  onClick?: () => void
}

function LinksBlock({ items, onClick }: LinksBlockProps) {
  const pathname = usePathname()

  return (
    <div className="grid">
      {items.map((item) => (
        <NavLink
          isActive={item.href === pathname}
          item={item}
          key={item.href}
          onClick={() => onClick?.()}
        />
      ))}
    </div>
  )
}

export function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { isPending: isMutationPending, mutate: mutateLogoutUser } =
    useLogoutUser()

  const handleLogout = () => {
    mutateLogoutUser()
  }

  return (
    <nav
      className={cn(
        'flex flex-col overflow-x-hidden overflow-y-auto bg-black text-white',
        'md:static md:w-52',
      )}
    >
      <div className="hidden md:flex md:flex-1 md:flex-col">
        <header className="p-6">
          <div className="text-xl font-semibold leading-none">Dashboard</div>
        </header>
        <section className="mb-10">
          <LinksBlock items={topLevelLinks} />
        </section>
        <section className="mb-10">
          <LinksBlock items={midLevelLinks} />
        </section>

        <footer className="mt-auto">
          <Button
            className="w-full h-auto cursor-pointer flex items-center gap-3 border-y border-white/30 rounded-none px-6 py-4 transition"
            disabled={isMutationPending}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </Button>
        </footer>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4 md:hidden">
        <div className="text-base font-semibold leading-none">Dashboard</div>
        <div className="w-full" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button size={'icon'} variant={'ghost'}>
                <Menu className="h-5 w-5" />
              </Button>
            }
          ></SheetTrigger>
          <SheetContent className="p-0" side="left">
            <div className="flex flex-col h-full bg-black text-white">
              <div className="px-4 py-4 text-base font-semibold">Dashboard</div>
              <div className="grow flex flex-col gap-20">
                <LinksBlock
                  items={topLevelLinks}
                  onClick={() => setIsOpen(false)}
                />
                <LinksBlock
                  items={midLevelLinks}
                  onClick={() => setIsOpen(false)}
                />
                <div className="mt-auto">
                  <Button
                    className="w-full h-auto rounded-none cursor-pointer flex items-center gap-3 border-x-0 border-b-0 border-t border-white/30 px-6 py-4 transition"
                    disabled={isMutationPending}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
