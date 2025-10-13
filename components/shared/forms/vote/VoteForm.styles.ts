import Box from '@mui/material/Box'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '8px',
}))

export const SlideBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  marginBottom: '16px',
  width: '100%',
  backgroundColor: `${theme.palette.gray.light}4D`,
  borderRadius: '8px',
}))

export const ErrorText = styled(Box)(({ theme }) => ({
  color: theme.palette.red.main,
  fontSize: '14px',
  marginTop: '4px',
  textAlign: 'center',
}))

export const TotalScoreBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '24px',
  width: '100%',
  borderRadius: '4px',
  backgroundColor: `${theme.palette.primary.light}4D`,
  padding: '8px',
}))
