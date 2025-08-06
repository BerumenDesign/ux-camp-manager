'use client'

import { FormikProps } from 'formik'
import { Typography } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import * as S from '../proposal/proposal-form.styles'
import { ProposalFormData } from '../proposal/validation'
import { useRef, useState } from 'react'

interface UploadProfileImageProps {
  formik: FormikProps<ProposalFormData>
  handleFileChange: (file: File) => void
}
const UploadProfileImage = ({
  formik,
  handleFileChange,
}: UploadProfileImageProps) => {
  const { values, errors, touched } = formik

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <S.FormField>
      <S.Label>Profile Picture (min. 500x500px, image only)</S.Label>
      <S.FileUploadArea
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          borderColor: dragActive ? '#e91e63' : 'rgba(255, 255, 255, 0.5)',
          backgroundColor: dragActive
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <CloudUpload
          sx={{
            fontSize: 48,
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: 2,
          }}
        />
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {values.profilePicture &&
          typeof values.profilePicture === 'object' &&
          'name' in values.profilePicture
            ? (values.profilePicture as File).name
            : 'Drag & drop image here or click to browse'}
        </Typography>
      </S.FileUploadArea>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0])
          }
        }}
      />
      {touched.profilePicture && errors.profilePicture && (
        <S.ErrorMessage>{errors.profilePicture as string}</S.ErrorMessage>
      )}
    </S.FormField>
  )
}

export default UploadProfileImage
