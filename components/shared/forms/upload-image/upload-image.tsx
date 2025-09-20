'use client'

import Image from 'next/image'
import { FormikProps } from 'formik'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

import { createClient } from '@/lib/supabase/client'
import * as S from '../proposal/proposal-form.styles'
import { ProposalFormData } from '../proposal/validation'
import { uploadProfileImage, listAllFiles } from '@/lib/supabase/storage'

interface UploadProfileImageProps {
  formik: FormikProps<ProposalFormData>
}

const UploadProfileImage = ({ formik }: UploadProfileImageProps) => {
  const { values, errors, touched, setFieldValue } = formik

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Get current user
      const supabase = createClient()
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        toast.error('You must be logged in to upload an image')
        return
      }

      // Upload image to Supabase Storage
      const imageUrl = await uploadProfileImage(file, user.id)

      console.log('Uploaded image URL:', imageUrl)
      console.log('User ID:', user.id)

      // Store the URL in formik
      setFieldValue('profilePicture', imageUrl)
      toast.success('Profile image uploaded successfully!')

      // Debug: List all files to see what's in the bucket
      await listAllFiles()
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  console.log(values.profilePicture)

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
        {values.profilePicture && !isUploading ? (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={values.profilePicture as string}
              alt="Profile preview"
              width={100}
              height={100}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: 8,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Image uploaded successfully!
            </Typography>
          </div>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            {isUploading
              ? 'Uploading...'
              : 'Drag & drop image here or click to browse'}
          </Typography>
        )}
      </S.FileUploadArea>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0])
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
