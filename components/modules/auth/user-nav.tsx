'use client'

import { useLogout } from '@/hooks/auth/use-auth'
import { UserClaims } from '@/lib/auth/role-guard'
import { Button } from '@/components/shared/button'

interface UserNavProps {
  user: UserClaims
}

export function UserNav({ user }: UserNavProps) {
  const { logout, isLoading } = useLogout()

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm text-gray-700">
        <span className="font-medium">{user.email}</span>
        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          {user.role}
        </span>
      </div>
      <Button variant="outline" size="sm" onClick={logout} disabled={isLoading}>
        {isLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  )
}
