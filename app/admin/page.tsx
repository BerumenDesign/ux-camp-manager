'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  return router.push('/admin/dashboard')
}
