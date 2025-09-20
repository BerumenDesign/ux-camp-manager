import Box from '@mui/material/Box'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
  component: 'header',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0px',
  marginBottom: '16px',
}))

export const Title = styled(Box)(() => ({
  display: 'flex',
  flexGrow: 1,
}))
