'use client'

import { Box } from '@mui/material'
import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'

import Profile from '../profile/profile'
import * as S from './proposal-form.styles'
import { proposalFormSchema, ProposalFormData } from './validation'
import ProposalFormItem from './proposal-form-item/proposal-form-item'
import { formatOptions, locationOptions } from './proposal-form-options/options'

//TODO: If user has profile, set initial values to profile values
const initialValues: ProposalFormData = {
  sessionName: '',
  sessionDescription: '',
  audienceTakeaway: '',
  presentationLocation: '',
  sessionFormat: '',
  specialRequests: '',
  otherComments: '',
  speakerName: '',
  pronouns: '',
  title: '',
  company: '',
  speakerBio: '',
  linkedinProfile: '',
  profilePicture: '' as unknown as File,
}

const ProposalForm = () => {
  const [isClient, setIsClient] = useState(false)

  const hasProfile = true

  useEffect(() => {
    setIsClient(true)
  }, [])

  //TODO: Plugin with BE to submit proposal
  const handleSubmit = (values: ProposalFormData) => {
    console.log('Form submitted:', values)
    // Handle form submission here
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
        validationSchema={proposalFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
      >
        {(formik) => (
          <Form>
            <S.Section>
              <S.SectionTitle>SESSION INFORMATION</S.SectionTitle>
              <Box>{JSON.stringify(formik.errors)}</Box>
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
