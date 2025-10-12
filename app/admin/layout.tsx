import { ReactNode } from 'react'

import { requireRole } from '@/lib/auth/role-guard'
import Header from '@/components/shared/header/Header'
import Sidebar from '@/components/shared/sidebar/Sidebar'
import { adminMenuItems } from './util/AdminMenuItems'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await requireRole('admin')

  return (
    <Sidebar menuItems={adminMenuItems}>
      <Header user={user} type="candidate" />
      {children}
    </Sidebar>
  )
}
