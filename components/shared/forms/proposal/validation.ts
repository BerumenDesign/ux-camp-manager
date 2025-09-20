import * as yup from 'yup'

export const proposalFormSchema = yup.object({
  // Session Information
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
  presentationLocation: yup
    .string()
    .test('not-empty', 'Please select a presentation location', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  sessionFormat: yup
    .string()
    .test('not-empty', 'Please select a session format', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  specialRequests: yup.string().optional(),
  otherComments: yup.string().optional(),

  // Speaker Information
  firstName: yup
    .string()
    .test('not-empty', 'Speaker name is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  lastName: yup
    .string()
    .test('not-empty', 'Speaker name is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  pronouns: yup.string().optional(),
  title: yup.string().optional(),
  company: yup.string().optional(),
  speakerBio: yup
    .string()
    .test('not-empty', 'Speaker bio is required', (value) => {
      if (!value || value.trim().length === 0) {
        return false
      }
      return true
    }),
  linkedinProfile: yup.string().optional(),
  profilePicture: yup.string().optional().url('Must be a valid URL'),
})

export type ProposalFormData = yup.InferType<typeof proposalFormSchema>
