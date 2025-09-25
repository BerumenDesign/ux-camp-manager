import * as yup from 'yup'

export const validationSchema = yup.object({
  sessionName: yup
    .string()
    .test('not-empty', 'Session name is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  sessionDescription: yup
    .string()
    .test('not-empty', 'Session description is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    })
    .max(500, 'Description must be 500 characters or less'),
  audienceTakeaway: yup
    .string()
    .test('not-empty', 'Audience takeaway is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    })
    .max(500, 'Audience takeaway must be 500 characters or less'),
})
