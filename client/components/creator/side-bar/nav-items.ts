import { BadgeDollarSign, Compass, Home, Library, Package } from 'lucide-react'
import type { ComponentType } from 'react'

export type NavItem = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const topLevelLinks: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'Sales', href: '/dashboard/sales', icon: BadgeDollarSign },
]

export const midLevelLinks: NavItem[] = [
  { label: 'Discover', href: '/discover', icon: Compass },
  { label: 'Library', href: '/library', icon: Library },
]
