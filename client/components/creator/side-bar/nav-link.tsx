import Link from 'next/link'

import { NavItem } from '@/components/creator/side-bar/nav-items'
import { cn } from '@/lib/utils'

type NavLinkProps = {
  isActive: boolean
  item: NavItem
  onClick?: () => void
}

export function NavLink({ isActive, item, onClick }: NavLinkProps) {
  const {
    href,
    icon: Icon,
    label,
  } = item

  return (
    <Link
      className={cn(
        'flex items-center gap-3 truncate border-b border-white/40 px-6 py-4 text-sm no-underline transition',
        'hover:text-fuchsia-400',
        isActive && 'text-fuchsia-400',
      )}
      href={href}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  )
}
