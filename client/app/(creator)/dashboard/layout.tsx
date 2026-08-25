import { SideBar } from '@/components/creator/side-bar/side-bar'
import { getAuthenticatedUser } from '@/lib/auth/get-authenticated-user'

export default async function DashboardLayout ({ children }: LayoutProps<'/dashboard'>) {
  await getAuthenticatedUser()

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <SideBar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}