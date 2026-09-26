import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'

type PanelCardProps = {
  children?: ReactNode
  rightSection?: ReactNode
  title: string
}

export function PanelCard({ children, rightSection, title }: PanelCardProps) {
  return (
    <Card className="rounded-none border border-border bg-card p-4 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base font-medium">{title}</div>
          {rightSection ? <div className="shrink-0">{rightSection}</div> : null}
        </div>
      </div>
      {children ? <div className="mt-0">{children}</div> : null}
    </Card>
  )
}