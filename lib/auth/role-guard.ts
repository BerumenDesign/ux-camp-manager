import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UserRole = 'admin' | 'candidate'

export interface UserClaims {
  role: UserRole
  sub: string
  email: string
}

export async function getUserRole(): Promise<UserClaims | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (userError || !userData) {
    redirect('/auth/login')
  }

  const role = userData.role as UserRole

  if (!role || !['admin', 'candidate'].includes(role)) {
    redirect('/auth/login')
  }

  return {
    role,
    sub: user.id,
    email: user.email || '',
  }
}

export async function requireAuth(): Promise<UserClaims> {
  const user = await getUserRole()

  if (!user) {
    redirect('/auth/login')
  }

  return user
}

export async function requireRole(requiredRole: UserRole): Promise<UserClaims> {
  const user = await requireAuth()

  if (user.role !== requiredRole) {
    if (user.role === 'admin') {
      redirect('/admin')
    } else if (user.role === 'candidate') {
      redirect('/candidate')
    } else {
      redirect('/auth/login')
    }
  }

  return user
}

export async function redirectBasedOnRole(): Promise<void> {
  const user = await getUserRole()

  if (!user) {
    redirect('/auth/login')
  }

  if (user.role === 'admin') {
    redirect('/admin')
  } else if (user.role === 'candidate') {
    redirect('/candidate')
  } else {
    redirect('/auth/login')
  }
}
