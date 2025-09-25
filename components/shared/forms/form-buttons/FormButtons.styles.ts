import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const ButtonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
}))
