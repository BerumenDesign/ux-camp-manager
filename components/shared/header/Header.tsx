'use client'

import { Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { UserClaims } from '@/lib/auth/role-guard'

import * as S from './Header.styles'
import getLastSegment from '@/util/getLastSegment'
import { UserNav } from '@/components/modules/auth/user-nav'
import getHeaderTitle from '@/util/getHeaderTitle'

interface HeaderProps {
  type: 'candidate' | 'admin'
  user: UserClaims
}

const Header = ({ type, user }: HeaderProps) => {
  const pathname = usePathname()
  const lastSegment = getLastSegment(pathname)
  const title = getHeaderTitle({ type, lastSegment })

  return (
    <S.Container>
      <S.Title>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </S.Title>
      <UserNav user={user} />
    </S.Container>
  )
}

export default Header
