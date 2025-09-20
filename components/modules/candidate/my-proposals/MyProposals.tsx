'use client'

import { Typography, useTheme } from '@mui/material'

import * as S from './MyProposals.styles'
import { mockMyProposals } from './mockData'
import Table, { Column } from '@/components/shared/table/Table'
import { ProposalStatus } from '@/type/proposal/proposal-status'

interface Data {
  id: string
  title: string
  status: string
  [key: string]: unknown
}

const MyProposals = () => {
  const theme = useTheme()

  const columns: Column[] = [
    {
      id: 'id',
      label: 'ID',
      maxWidth: 10,
    },
    {
      id: 'title',
      label: 'Title',
      minWidth: 300,
    },
    {
      id: 'status',
      label: 'Application Status',
      width: 200,
      align: 'center',
      render: (value: unknown) => (
        <S.Status status={value as ProposalStatus}>
          <Typography
            variant="body1"
            color={theme.palette.black.main}
            fontWeight={600}
          >
            {value as string}
          </Typography>
        </S.Status>
      ),
    },
  ]

  // TODO: use real data from BE
  const rows: Data[] = mockMyProposals
    .filter((item) => item !== undefined && item !== null)
    .map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status,
    }))

  return (
    <S.Container>
      <Table columns={columns} rows={rows} path="my-proposals" />
    </S.Container>
  )
}

export default MyProposals
