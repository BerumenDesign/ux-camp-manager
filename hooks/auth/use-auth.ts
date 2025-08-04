'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

interface LoginCredentials {
  email: string
  password: string
}

interface SignupCredentials {
  email: string
  password: string
}

interface AuthError {
  message: string
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError({ message: 'Invalid email or password' })
        return { success: false }
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (userError || !userData) {
        setError({ message: 'Role is not set' })
        await supabase.auth.signOut()
        router.push('/auth/login')
        return { success: false }
      }

      const role = userData.role

      if (!role || !['admin', 'candidate'].includes(role)) {
        setError({ message: 'Invalid user role' })
        await supabase.auth.signOut()
        router.push('/auth/login')
        return { success: false }
      }

      if (role === 'candidate') {
        router.push('/candidate')
      } else if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/auth/login')
      }

      return { success: true, role }
    } catch (error) {
      console.error('Login error:', error)
      setError({ message: 'An unexpected error occurred' })
      router.push('/auth/login')
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  const signup = async ({ email, password }: SignupCredentials) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError({ message: error.message })
        return { success: false }
      }

      if (data.user) {
        router.push('/auth/sign-up-success')
        return { success: true }
      }

      return { success: false }
    } catch (error) {
      console.error('Signup error:', error)
      setError({ message: 'An unexpected error occurred' })
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const logout = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/auth/login')
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading }
}

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [success, setSuccess] = useState(false)

  const resetPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        setError({ message: error.message })
        return { success: false }
      }

      setSuccess(true)
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      setError({ message: 'An unexpected error occurred' })
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  return { resetPassword, isLoading, error, success }
}

export function useUpdatePassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  const updatePassword = async (password: string) => {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError({ message: error.message })
        return { success: false }
      }

      router.push('/auth/login')
      return { success: true }
    } catch (error) {
      console.error('Password update error:', error)
      setError({ message: 'An unexpected error occurred' })
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  return { updatePassword, isLoading, error }
}
