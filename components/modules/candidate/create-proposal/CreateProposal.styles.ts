import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  margin: '0 auto',
  minHeight: '100vh',
  color: theme.palette.black.main,
}))

export const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const Logo = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
})

export const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
})
