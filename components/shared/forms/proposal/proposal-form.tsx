'use client'

import { Box, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

import { User } from '@/type/user/user'
import userDTO from '@/type/user/userDTO'
import { useRouter } from 'next/navigation'
import * as S from './proposal-form.styles'
import Profile from '../profile/profile-form'
import { createClient } from '@/lib/supabase/client'
import { proposalFormSchema, ProposalFormData } from './validation'
import ProposalFormItem from './proposal-form-item/proposal-form-item'
import { formatOptions, locationOptions } from './proposal-form-options/options'

interface ProposalFormProps {
  type: 'candidate' | 'admin'
}

const ProposalForm = ({ type }: ProposalFormProps) => {
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    try {
      const supabase: SupabaseClient = createClient()

      const fetchUser = async () => {
        const {
          data: { user },
          error: userAuthError,
        } = await supabase.auth.getUser()

        if (userAuthError || !user) {
          console.error('User not authenticated:', userAuthError)
          toast.error('You must be logged in to update your profile')
          return
        }

        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (userDataError || !userData || userData.length === 0) {
          console.error('Error fetching user:', userDataError)
          toast.error('Error fetching user. Please try again.')
          return
        }

        setUser(userDTO(userData))
        setHasProfile(
          userData.first_name &&
            userData.last_name &&
            userData.bio &&
            userData.avatar_url
        )
      }

      fetchUser()
    } catch (error) {
      console.error('Error fetching user information:', error)
      toast.error('Error fetching user information. Please try again.')
    }
  }, [])

  const initialValues: ProposalFormData = {
    sessionName: '',
    sessionDescription: '',
    audienceTakeaway: '',
    presentationLocation: locationOptions[0].value,
    sessionFormat: formatOptions[0].value,
    specialRequests: '',
    otherComments: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    pronouns: user?.pronouns || '',
    title: user?.title || '',
    company: user?.company || '',
    bio: user?.bio || '',
    linkedin: user?.linkedin || '',
    profilePicture: user?.profilePicture || undefined,
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (values: ProposalFormData) => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }

    try {
      const supabase: SupabaseClient = createClient()

      const { data: proposalData, error: proposalError } = await supabase
        .from('proposals')
        .insert([
          {
            user_id: user.id,
            session_name: values.sessionName,
            session_description: values.sessionDescription,
            audience_takeaway: values.audienceTakeaway,
            presentation_location: values.presentationLocation,
            session_format: values.sessionFormat,
            special_requests: values.specialRequests,
            other_comments: values.otherComments,
          },
        ])
        .select()
        .single()

      if (proposalError) {
        toast.error('Error submitting proposal. Please try again.')
        return
      }

      if (hasProfile && proposalData) {
        toast.success('Proposal submitted successfully')
        router.push(`/${type}/proposal/${proposalData?.id}`)
        return
      }

      if (proposalData && !hasProfile) {
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .upsert([
            {
              id: user.id,
              first_name: values.firstName,
              last_name: values.lastName,
              bio: values.bio,
              pronouns: values.pronouns,
              title: values.title,
              company: values.company,
              linkedin_url: values.linkedin,
              avatar_url: values.profilePicture,
            },
          ])
          .select()

        if (profileError) {
          toast.error(
            'Proposal submitted successfully, but error submitting profile. Please update your profile in Profile page'
          )

          return
        }

        if (profileData) {
          toast.success('Proposal submitted successfully')
          router.push(`/${type}/proposal/${proposalData?.id}`)
          return
        }
      }
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast.error('Error submitting proposal. Please try again.')
    }
  }

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <S.Container>
      <S.Header>
        <S.Logo>UX CAMP</S.Logo>
        <S.Title>SUBMIT YOUR PROPOSAL</S.Title>
      </S.Header>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={
          hasProfile
            ? proposalFormSchema.omit([
                'firstName',
                'lastName',
                'bio',
                'profilePicture',
              ])
            : proposalFormSchema
        }
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
      >
        {(formik) => (
          <Form>
            <S.Section>
              <S.SectionTitle>SESSION INFORMATION</S.SectionTitle>

              <ProposalFormItem
                formik={formik}
                name="sessionName"
                label="Name of the session"
                required
                maxLength={100}
              />
              <ProposalFormItem
                formik={formik}
                name="sessionDescription"
                label="Description of the session"
                required
                type="textarea"
                maxLength={500}
              />
              <ProposalFormItem
                formik={formik}
                name="audienceTakeaway"
                label="What do you hope the audience will take away from your session?"
                required
                type="textarea"
                maxLength={500}
              />
              <ProposalFormItem
                formik={formik}
                name="presentationLocation"
                label="Where would you like to present?"
                required
                type="radio"
                radioOptions={locationOptions}
              />
              <ProposalFormItem
                formik={formik}
                name="sessionFormat"
                label="What is the format of your session?"
                required
                type="radio"
                radioOptions={formatOptions}
              />
              <ProposalFormItem
                formik={formik}
                name="specialRequests"
                label="Any special requests for your session?"
                type="textarea"
                maxLength={500}
              />
              <ProposalFormItem
                formik={formik}
                name="otherComments"
                label="Any other comments?"
                type="textarea"
                maxLength={500}
              />
            </S.Section>

            {/* Profile Component */}
            {!hasProfile && <Profile formik={formik} />}

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {Object.keys(formik.errors).length > 0 && (
                <S.ErrorMessage>
                  Complete all required information before submit
                </S.ErrorMessage>
              )}

              <Button
                type="submit"
                disabled={
                  formik.isSubmitting || Object.keys(formik.errors).length > 0
                }
                variant="contained"
                fullWidth
                sx={{
                  marginTop: '24px',
                  padding: '12px 32px',
                }}
              >
                Submit Proposal
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </S.Container>
  )
}

export default ProposalForm
