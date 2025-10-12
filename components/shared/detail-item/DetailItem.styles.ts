import { Box } from '@mui/material'
import { styled } from '@mui/system'

import palette from '@/theme/palette'

export const EditBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'center',
  padding: '8px 0px',
  color: theme.palette.black.main,
  borderRadius: '8px',
  marginBottom: '8px',
  width: '100%',
}))

export const TitleBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isEdit' && prop !== 'isArray',
})<{ isEdit: boolean; isArray: boolean }>(({ isEdit, isArray }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: isEdit ? '0 12px' : isArray ? '0 18px' : '0 12px',
}))

export const ItemBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
}))

export const customStyles = {
  width: '100%',
  height: 'auto',
  resize: 'none',
  marginTop: '4px',
  padding: '4px 12px',
  borderRadius: '4px',
  overflow: 'hidden',
  outline: 'none',
  border: `1px solid ${palette.gray.main}`,
}
