'use client'

import { useLogout } from '@/hooks/auth/use-auth'
import { Button } from '@/components/shared/button'

export function LogoutButton() {
  const { logout } = useLogout()

  return <Button onClick={logout}>Logout</Button>
}
