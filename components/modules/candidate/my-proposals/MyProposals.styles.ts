import Box from '@mui/material/Box'
import { styled } from '@mui/system'

import palette from '@/theme/palette'
import { ProposalStatus } from '@/type/proposal/proposal-status'

export const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  overflowY: 'auto',
}))

export const statusMap: Record<ProposalStatus, string> = {
  [ProposalStatus.PENDING]: palette.white.main,
  [ProposalStatus.REVIEW]: palette.orange.main,
  [ProposalStatus.APPROVED]: palette.blue.light,
  [ProposalStatus.REJECTED]: palette.red.light,
  [ProposalStatus.PUBLISHED]: palette.green.main,
}

export const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: ProposalStatus }>(({ theme, status }) => ({
  padding: '6px 20px',
  backgroundColor: statusMap[status],
  border:
    status === ProposalStatus.PENDING
      ? `0.5px solid ${theme.palette.black.main}`
      : 'none',
  borderRadius: '40px',
  color: theme.palette.white.main,
  textAlign: 'center',
}))
