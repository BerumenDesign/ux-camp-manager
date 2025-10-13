import * as Yup from 'yup'

export const voteValidationSchema = Yup.object({
  audienceInterest: Yup.number()
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must be at most 10')
    .required('Audience Interest score is required'),
  topicOriginalityDepth: Yup.number()
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must be at most 10')
    .required('Topic Originality & Depth score is required'),
  contentQualityClarity: Yup.number()
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must be at most 10')
    .required('Content Quality & Clarity score is required'),
  speakerExperiencePresence: Yup.number()
    .min(0, 'Score must be at least 0')
    .max(10, 'Score must be at most 10')
    .required('Speaker Experience & Presence score is required'),
  comment: Yup.string().optional(),
})
