import { ReactNode } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type ImportModeTabsProps = {
  children?: ReactNode
  onValueChange: (value: string) => void
  value: string
}

export function ImportModeTabs({
  children,
  onValueChange,
  value,
}: ImportModeTabsProps) {
  return (
    <Tabs className="space-y-5" value={value} onValueChange={onValueChange}>
      <TabsList className="h-auto grid w-full max-w-xl grid-cols-2 rounded-none border border-border bg-card">
        <TabsTrigger
          className="rounded-none data-active:bg-[#ff90e8] data-active:text-black"
          value="search"
        >
          Search
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none data-active:bg-[#ff90e8] data-active:text-black"
          value="scrape"
        >
          Quick Import (Scrape)
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
