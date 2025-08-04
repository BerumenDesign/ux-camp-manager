import { redirect } from 'next/navigation'
import { getUserRole } from '@/lib/auth/role-guard'
import { AuthButton } from '@/components/modules/auth/auth-button'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: PageProps) {
  // Check if URL contains code parameter (email confirmation)
  if (searchParams.code) {
    redirect('/auth/login')
  }

  try {
    const userData = await getUserRole()

    if (userData?.role === 'admin') {
      redirect('/admin')
    } else if (userData?.role === 'candidate') {
      redirect('/candidate')
    } else {
      redirect('/auth/login')
    }
  } catch {
    return <AuthButton />
  }
}
