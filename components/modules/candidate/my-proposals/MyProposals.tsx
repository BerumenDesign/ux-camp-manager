'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Typography, useTheme } from '@mui/material'

import * as S from './MyProposals.styles'
import { createClient } from '@/lib/supabase/client'
import Table, { Column } from '@/components/shared/table/Table'
import { ProposalStatusMap } from '@/type/proposal/proposalDTO'

interface Proposal {
  id: string
  index: number
  title: string
  status: string
  [key: string]: unknown
}

const MyProposals = () => {
  const theme = useTheme()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const supabase = createClient()

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          toast.error('Not authenticated')
          setLoading(false)
          return
        }

        const { data: proposalsData, error } = await supabase
          .from('proposals')
          .select('id, session_name, status')
          .eq('user_id', user.id)

        if (error || !proposalsData) {
          toast.error('Failed to fetch proposals, please refresh the page')
          setLoading(false)
          return
        }

        const formattedProposals = proposalsData.map((proposal, index) => {
          return {
            id: proposal.id,
            index: index + 1,
            title: proposal.session_name,
            status: proposal.status,
          }
        })

        setProposals(formattedProposals)
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : 'Failed to fetch proposals'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  const columns: Column[] = [
    {
      id: 'index',
      label: 'No.',
      maxWidth: 10,
    },
    {
      id: 'title',
      label: 'Session Name',
      minWidth: 300,
    },
    {
      id: 'status',
      label: 'Application Status',
      width: 200,
      align: 'center',
      render: (value: unknown) => (
        <S.Status status={value as string}>
          <Typography
            variant="body1"
            color={theme.palette.black.main}
            fontWeight={600}
          >
            {ProposalStatusMap[value as string]}
          </Typography>
        </S.Status>
      ),
    },
  ]

  if (loading) {
    return (
      <S.Container>
        <Typography variant="body1">Loading proposals...</Typography>
      </S.Container>
    )
  }

  return (
    <S.Container>
      {proposals?.length > 0 ? (
        <Table columns={columns} rows={proposals} path="proposal" />
      ) : (
        <Typography variant="body1">No proposals found</Typography>
      )}
    </S.Container>
  )
}

export default MyProposals
