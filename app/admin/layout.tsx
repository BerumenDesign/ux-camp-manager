import { requireRole } from '@/lib/auth/role-guard'
import { UserNav } from '@/components/modules/auth/user-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect if user is not authenticated or doesn't have admin role
  const user = await requireRole('admin')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin Panel</span>
              <UserNav user={user} />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
