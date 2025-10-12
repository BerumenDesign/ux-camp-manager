import { useState } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import type { SupabaseClient } from '@supabase/supabase-js'

import * as S from './Profile.styles'
import { User } from '@/type/user/user'
import userDTO from '@/type/user/userDTO'
import { userFormSchema } from './validation'
import { createClient } from '@/lib/supabase/client'
import ProfileForm from '@/components/shared/forms/profile/profile-form'

const Profile = () => {
  const [user, setUser] = useState<User | null>(null)

  const handleSubmit = async (values: any) => {
    const supabase: SupabaseClient = createClient()

    // Get current user
    const {
      data: { user: userData },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !userData) {
      console.error('User not authenticated:', userError)
      toast.error('You must be logged in to update your profile')
      return
    }

    setUser(userDTO(userData))

    const { data: updatedUserData, error: error } = await supabase
      .from('users')
      .insert([
        {
          first_name: values.firstName,
          last_name: values.lastName,
          bio: values.speakerBio,
          linkedin: values.linkedin,
          avatar_url: values.avatarUrl,
          company: values.company,
          pronouns: values.pronouns,
          title: values.title,
          email: values.email,
        },
      ])
      .select()

    if (error || !updatedUserData) {
      toast.error('Error updating user profile. Please try again.')
      return
    }
  }

  return (
    <S.Container>
      <Formik
        initialValues={user || {}}
        validationSchema={userFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
      >
        {(formik) => (
          <Form>
            <ProfileForm formik={formik} />
          </Form>
        )}
      </Formik>
    </S.Container>
  )
}

export default Profile
