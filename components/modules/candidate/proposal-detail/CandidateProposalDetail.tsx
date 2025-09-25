'use client'

import { Form, Formik } from 'formik'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import getLastSegment from '@/util/getLastSegment'
import { Proposal } from '@/type/proposal/proposal'
import { validationSchema } from './util/validation'
import * as S from './CandidateProposalDetail.styles'
import { proposalDTO } from '@/util/proposal/proposalDTO'
import ProposalInfo from '@/components/shared/proposal-info/ProposalInfo'
import FormButtons from '@/components/shared/forms/form-buttons/FormButtons'

// Removed initialValues as it's no longer needed

const CandidateProposalDetail = () => {
  const pathname = usePathname()
  const lastSegment = getLastSegment(pathname)

  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (typeof window === 'undefined') return

    const fetchProposal = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Convert lastSegment to number if it's a numeric string
        const proposalId = isNaN(Number(lastSegment))
          ? lastSegment
          : Number(lastSegment)

        const { data: proposalData, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', proposalId)
          .single()

        if (error) {
          setError(error.message)
          return
        }

        console.log('proposalData🦄', proposalData)

        if (proposalData) {
          const mappedProposal = proposalDTO(proposalData)
          console.log('mappedProposal🐳', mappedProposal)
          setProposal(mappedProposal)
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to fetch proposal')
      } finally {
        setLoading(false)
      }
    }

    if (lastSegment) {
      fetchProposal()
    }
  }, [lastSegment])

  console.log('proposal🐳', proposal)

  const handleFormSubmit = async (values: Proposal) => {
    try {
      const supabase = createClient()

      // Convert camelCase to snake_case for database update
      const updateData = {
        session_name: values.sessionName,
        session_description: values.sessionDescription,
        audience_takeaway: values.audienceTakeaway,
        special_requests: values.specialRequests,
        other_comments: values.otherComments,
      }

      const { error } = await supabase
        .from('proposals')
        .update(updateData)
        .eq('id', lastSegment)

      if (error) {
        setError(error.message)
        return
      }

      setProposal(values)
      setIsEdit(false)
    } catch {
      setError('Failed to update proposal')
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = (resetForm: () => void) => {
    resetForm()
    setIsEdit(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Don't render the form until we have proposal data
  if (!proposal) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Formik
        initialValues={proposal}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, resetForm, isValid, errors, touched }) => {
          return (
            <Form style={{ width: '100%' }}>
              <S.Header>
                <S.TitleBox>
                  <Typography variant="h4">Proposal Detail</Typography>
                  {/* <S.Status status={values.status}>{values.status}</S.Status> */}
                  <FormButtons
                    isEdit={isEdit}
                    isValid={isValid}
                    handleCancel={() => handleCancel(resetForm)}
                    handleEdit={handleEdit}
                  />
                </S.TitleBox>
              </S.Header>

              {proposal && (
                <ProposalInfo
                  values={values}
                  initialValues={proposal}
                  isEdit={isEdit}
                  touched={touched}
                  errors={errors}
                />
              )}
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default CandidateProposalDetail
