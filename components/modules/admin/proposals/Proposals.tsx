'use client'

import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Typography, useTheme } from '@mui/material'

import * as s from '../../candidate/my-proposals/MyProposals.styles'
import { createClient } from '@/lib/supabase/client'
import Table, { Column } from '@/components/shared/table/Table'
import {
  PresentationLocationMap,
  ProposalStatusMap,
  SessionFormatMap,
} from '@/util/proposal/proposalDTO'

interface Proposal {
  id: string
  index: number
  title: string
  status: string
  format: string
  location: string
  userName: string
  [key: string]: unknown
}

const Proposals = () => {
  const theme = useTheme()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const supabase = createClient()

        const { data: proposalsData, error } = await supabase.from('proposals')
          .select(`
            id,
            session_name,
            status,
            session_format,
            presentation_location,
            users:user_id (
              first_name,
              last_name
            )
          `)

        console.log('proposalsData🦄', proposalsData)
        console.log('error🦄', error)

        if (error || !proposalsData) {
          toast.error('Failed to fetch proposals, please refresh the page')
          console.error('Error details:', error)
          setLoading(false)
          return
        }

        const formattedProposals = proposalsData.map((proposal, index) => {
          const user = proposal.users as unknown as {
            first_name: string
            last_name: string
          } | null
          const userName = user?.first_name + ' ' + user?.last_name || 'N/A'

          return {
            id: proposal.id,
            index: index + 1,
            title: proposal.session_name,
            status: proposal.status,
            format: proposal.session_format,
            location: proposal.presentation_location,
            userName,
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
      maxWidth: 100,
    },
    {
      id: 'title',
      label: 'Session Name',
      minWidth: 200,
      render: (value: unknown) => (
        <Typography
          variant="body1"
          color={theme.palette.black.main}
          fontWeight={600}
        >
          {value as string}
        </Typography>
      ),
    },
    {
      id: 'userName',
      label: 'Presenter',
      minWidth: 150,
      render: (value: unknown) => (
        <Typography variant="body1" color={theme.palette.black.main}>
          {value as string}
        </Typography>
      ),
    },
    {
      id: 'format',
      label: 'Session Format',
      minWidth: 200,
      render: (value: unknown) => (
        <Typography variant="body1" color={theme.palette.black.main}>
          {SessionFormatMap[value as string]}
        </Typography>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 200,
      render: (value: unknown) => (
        <Typography variant="body1" color={theme.palette.black.main}>
          {PresentationLocationMap[value as string]}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Application Status',
      width: 200,
      align: 'center',
      render: (value: unknown) => (
        <s.Status status={value as string}>
          <Typography
            variant="body1"
            color={theme.palette.black.main}
            fontWeight={600}
          >
            {ProposalStatusMap[value as string]}
          </Typography>
        </s.Status>
      ),
    },
  ]

  if (loading) {
    return (
      <s.Container>
        <Typography variant="body1">Loading proposals...</Typography>
      </s.Container>
    )
  }

  return (
    <s.Container>
      {proposals?.length > 0 ? (
        <Table columns={columns} rows={proposals} path="proposal" />
      ) : (
        <Typography variant="body1">No proposals found</Typography>
      )}
    </s.Container>
  )
}

export default Proposals
