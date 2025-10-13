'use client'

// import { Form, Formik } from 'formik'
// import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import getLastSegment from '@/util/getLastSegment'
import { Proposal } from '@/type/proposal/proposal'
// import { validationSchema } from './util/validation'
// import * as S from '@/components/modules/candidate/proposal-detail/CandidateProposalDetail.styles'
import * as S from './ProposalDetails.styles'
import { proposalDTO } from '@/type/proposal/proposalDTO'
import ProposalInfo from '@/components/shared/proposal-info/ProposalInfo'
// import FormButtons from '@/components/shared/forms/form-buttons/FormButtons'
import { toast } from 'react-toastify'
import VoteForm from '@/components/shared/forms/vote/VoteForm'

const SubmittedProposalDetails = () => {
  const pathname = usePathname()
  const lastSegment = getLastSegment(pathname)

  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  //   const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fetchProposal = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        const proposalId = isNaN(Number(lastSegment))
          ? lastSegment
          : Number(lastSegment)

        const { data: proposalData, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', proposalId)
          .single()

        if (error) {
          toast.error('Failed to fetch proposal')
          return
        }

        if (proposalData) {
          const mappedProposal = proposalDTO(proposalData)
          setProposal(mappedProposal)
        }
      } catch (err) {
        toast.error('Failed to fetch proposal')
        console.log('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (lastSegment) {
      fetchProposal()
    }
  }, [lastSegment])

  console.log('proposal🐳', proposal)

  //TODO: Vote proposal
  //   const handleFormSubmit = async (values: Proposal) => {
  //     try {
  //       const supabase = createClient()

  //       const updateData = {
  //         session_name: values.sessionName,
  //         session_description: values.sessionDescription,
  //         audience_takeaway: values.audienceTakeaway,
  //         special_requests: values.specialRequests,
  //         other_comments: values.otherComments,
  //       }

  //       const { error } = await supabase
  //         .from('proposals')
  //         .update(updateData)
  //         .eq('id', lastSegment)

  //       if (error) {
  //         toast.error('Failed to saving vote')
  //         return
  //       }

  //       setProposal(values)
  //       setIsEdit(false)
  //     } catch {
  //       toast.error('Failed to saving vote')
  //     }
  //   }

  //   const handleEdit = () => {
  //     setIsEdit(true)
  //   }

  //   const handleCancel = (resetForm: () => void) => {
  //     resetForm()
  //     setIsEdit(false)
  //   }

  if (loading || !proposal) {
    return <div>Loading...</div>
  }

  return (
    <S.Container>
      {proposal && (
        <ProposalInfo
          values={proposal}
          initialValues={proposal}
          isEdit={false}
          //   touched={touched}
          //   errors={errors}
        />
      )}
      <VoteForm />

      {/* <Formik
        initialValues={proposal}
        // validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, resetForm, isValid, errors, touched }) => {
          return (
            <Form style={{ width: '100%' }}>
              <S.Header>
                <S.TitleBox>
                  <Typography variant="h4">Proposal Detail</Typography>
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
      </Formik> */}
    </S.Container>
  )
}

export default SubmittedProposalDetails
