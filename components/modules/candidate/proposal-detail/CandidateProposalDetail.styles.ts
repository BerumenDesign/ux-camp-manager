import { ProposalStatus } from '@/type/proposal/proposal'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import palette from '@/theme/palette'

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '24px',
}))

export const TitleBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  flex: 1,
  gap: '16px',
}))

export const statusMap: Record<ProposalStatus, string> = {
  [ProposalStatus.pending]: palette.white.main,
  [ProposalStatus.review]: palette.orange.main,
  [ProposalStatus.approved]: palette.blue.light,
  [ProposalStatus.rejected]: palette.red.light,
  [ProposalStatus.published]: palette.green.main,
}

export const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: ProposalStatus }>(({ theme, status }) => ({
  padding: '6px 20px',
  backgroundColor: statusMap[status],
  border:
    status === ProposalStatus.pending
      ? `0.5px solid ${theme.palette.black.main}`
      : 'none',
  borderRadius: '40px',
  color:
    status === ProposalStatus.pending
      ? theme.palette.black.main
      : theme.palette.white.main,
  textAlign: 'center',
  textTransform: 'capitalize',
}))
