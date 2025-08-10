'use client'

import React from 'react'
import { FormikProps } from 'formik'

import * as S from '../proposal/proposal-form.styles'
import { ProposalFormData } from '../proposal/validation'
import UploadProfileImage from '../upload-image/upload-image'

interface ProfileProps {
  formik: FormikProps<ProposalFormData>
}

const Profile = ({ formik }: ProfileProps) => {
  const { values, errors, touched, setFieldValue } = formik

  const handleFileChange = (file: File) => {
    setFieldValue('profilePicture', file)
  }

  return (
    <S.Section>
      <S.SectionTitle>SPEAKER INFORMATION</S.SectionTitle>

      <S.FormField>
        <S.Label>
          First Name <S.RequiredIcon />
        </S.Label>
        <S.StyledTextField
          fullWidth
          name="firstName"
          variant="outlined"
          value={values.firstName}
          onChange={(e) => setFieldValue('firstName', e.target.value)}
          error={touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>
          Last Name <S.RequiredIcon />
        </S.Label>
        <S.StyledTextField
          fullWidth
          name="lastName"
          variant="outlined"
          value={values.lastName}
          onChange={(e) => setFieldValue('lastName', e.target.value)}
          error={touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>Pronouns</S.Label>
        <S.StyledTextField
          fullWidth
          name="pronouns"
          placeholder="e.g., she/her, they/them, he/him"
          variant="outlined"
          value={values.pronouns}
          onChange={(e) => setFieldValue('pronouns', e.target.value)}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>Title</S.Label>
        <S.StyledTextField
          fullWidth
          name="title"
          placeholder="e.g., Senior UX Designer, Product Manager"
          variant="outlined"
          value={values.title}
          onChange={(e) => setFieldValue('title', e.target.value)}
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>Company</S.Label>
        <S.StyledTextField
          fullWidth
          name="company"
          placeholder="e.g., Google, Microsoft, Freelance"
          variant="outlined"
          value={values.company}
          onChange={(e) => setFieldValue('company', e.target.value)}
          error={touched.company && !!errors.company}
          helperText={touched.company && errors.company}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>
          Speaker Bio <S.RequiredIcon />
        </S.Label>
        <S.StyledTextField
          fullWidth
          name="speakerBio"
          variant="outlined"
          multiline
          value={values.speakerBio}
          onChange={(e) => setFieldValue('speakerBio', e.target.value)}
          error={touched.speakerBio && !!errors.speakerBio}
          helperText={touched.speakerBio && errors.speakerBio}
        />
      </S.FormField>

      <S.FormField>
        <S.Label>LinkedIn Profile</S.Label>
        <S.StyledTextField
          fullWidth
          name="linkedinProfile"
          variant="outlined"
          value={values.linkedinProfile}
          onChange={(e) => setFieldValue('linkedinProfile', e.target.value)}
        />
      </S.FormField>

      <UploadProfileImage formik={formik} handleFileChange={handleFileChange} />
    </S.Section>
  )
}

export default Profile
