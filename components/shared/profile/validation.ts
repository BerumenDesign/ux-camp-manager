import * as yup from 'yup'

export const userFormSchema = yup.object({
  firstName: yup
    .string()
    .test('not-empty', 'User first name is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  lastName: yup
    .string()
    .test('not-empty', 'User last name is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  pronouns: yup.string().optional(),
  title: yup.string().optional(),
  company: yup.string().optional(),
  bio: yup.string().test('not-empty', 'Speaker bio is required', (value) => {
    if (!value || value.trim().length === 0) {
      return false
    }
    return true
  }),
  linkedin: yup.string().optional(),
  profilePicture: yup.string().url('Must be a valid URL'),
})

export type UserFormData = yup.InferType<typeof userFormSchema>
