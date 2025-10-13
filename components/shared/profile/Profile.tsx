'use client'

import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import type { SupabaseClient } from '@supabase/supabase-js'

import * as S from './Profile.styles'
import { User } from '@/type/user/user'
import userDTO from '@/type/user/userDTO'
import { userFormSchema } from './validation'
import { createClient } from '@/lib/supabase/client'
import ProfileForm from '@/components/shared/forms/profile/profile-form'

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)

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
      }

      fetchUser()
    } catch (error) {
      console.error('Error fetching user information:', error)
      toast.error('Error fetching user information. Please try again.')
    }
  }, [])

  const handleSubmit = async (values: any) => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }

    try {
      const supabase: SupabaseClient = createClient()
      const { data: updatedUserData, error: error } = await supabase
        .from('users')
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          bio: values.bio,
          linkedin_url: values.linkedin,
          avatar_url: values.profilePicture,
          company: values.company,
          pronouns: values.pronouns,
          title: values.title,
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error || !updatedUserData) {
        console.error('Error updating user:', error)
        toast.error('Error updating user profile. Please try again.')
        return
      }

      toast.success('Profile updated successfully!')
      setUser(userDTO(updatedUserData))
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error updating user profile. Please try again.')
    }
  }

  return (
    <S.Container>
      {user ? (
        <Formik
          initialValues={user}
          validationSchema={userFormSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={true}
          validateOnMount={false}
        >
          {(formik) => (
            <Form>
              <ProfileForm formik={formik} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, padding: '12px 32px' }}
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Box>Loading...</Box>
      )}
    </S.Container>
  )
}

export default Profile
