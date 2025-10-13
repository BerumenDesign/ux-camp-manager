import Box from '@mui/material/Box'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '24px',
}))

export const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '50%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  padding: '16px',
}))
