import { requireRole } from '@/lib/auth/role-guard'
import Header from '@/components/shared/header/Header'
import Sidebar from '@/components/shared/sidebar/Sidebar'

import { candidateMenuItems } from './util/candidateMenuItems'

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireRole('candidate')

  return (
    <Sidebar menuItems={candidateMenuItems}>
      <Header user={user} type="candidate" />
      {children}
    </Sidebar>
  )
}
