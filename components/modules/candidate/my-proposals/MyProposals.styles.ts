import Box from '@mui/material/Box'
import { styled } from '@mui/system'

import palette from '@/theme/palette'

export const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  overflowY: 'auto',
}))

export const statusMap: Record<string, string> = {
  pending: palette.white.main,
  review: palette.orange.main,
  approved: palette.blue.light,
  rejected: palette.red.light,
  published: palette.green.main,
}

export const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ theme, status }) => ({
  padding: '6px 20px',
  backgroundColor: statusMap[status],
  border:
    status === 'pending' ? `0.5px solid ${theme.palette.black.main}` : 'none',
  borderRadius: '40px',
  color: theme.palette.white.main,
  textAlign: 'center',
}))
