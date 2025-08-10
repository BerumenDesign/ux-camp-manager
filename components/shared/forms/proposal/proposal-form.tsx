'use client'

import { Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

import Profile from '../profile/profile'
import * as S from './proposal-form.styles'
import { createClient } from '@/lib/supabase/client'
import { proposalFormSchema, ProposalFormData } from './validation'
import ProposalFormItem from './proposal-form-item/proposal-form-item'
import { formatOptions, locationOptions } from './proposal-form-options/options'

//TODO: If user has profile, set initial values to profile values
const initialValues: ProposalFormData = {
  sessionName: '',
  sessionDescription: '',
  audienceTakeaway: '',
  presentationLocation: locationOptions[0].value,
  sessionFormat: formatOptions[0].value,
  specialRequests: '',
  otherComments: '',
  firstName: '',
  lastName: '',
  pronouns: '',
  title: '',
  company: '',
  speakerBio: '',
  linkedinProfile: '',
  profilePicture: undefined,
}

const ProposalForm = () => {
  const [isClient, setIsClient] = useState(false)

  //TODO: fetch it from BE
  const hasProfile = true

  useEffect(() => {
    setIsClient(true)
  }, [])

  //TODO: Plugin with BE to submit proposal
  const handleSubmit = async (values: ProposalFormData) => {
    const supabase: SupabaseClient = createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('User not authenticated:', userError)
      toast.error('You must be logged in to submit a proposal')
      return
    }

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

    if (proposalError) {
      toast.error('Error submitting proposal. Please try again.')
      return
    }

    if (hasProfile && proposalData) {
      toast.success('Proposal submitted successfully')
      //TODO: redirect to this proposal detail page
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
            bio: values.speakerBio,
            pronouns: values.pronouns,
            title: values.title,
            company: values.company,
            linkedin_url: values.linkedinProfile,
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
        //TODO: redirect to this proposal detail page
        return
      }
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
        validationSchema={
          hasProfile
            ? proposalFormSchema.omit(['firstName', 'lastName', 'speakerBio'])
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

              <S.SubmitButton
                type="submit"
                disabled={
                  formik.isSubmitting || Object.keys(formik.errors).length > 0
                }
                variant="contained"
              >
                Submit Proposal
              </S.SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </S.Container>
  )
}

export default ProposalForm
