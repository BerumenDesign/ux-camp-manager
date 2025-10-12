import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: theme.palette.black.main,
}))
