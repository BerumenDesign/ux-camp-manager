import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { Button, TextField, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import getLastSegment from '@/util/getLastSegment'

import * as S from './VoteForm.styles'
import SlideBar from '../../slide-bar/SlideBar'
import { voteValidationSchema } from './validation'

export type VoteFormData = {
  audienceInterest: number
  topicOriginalityDepth: number
  contentQualityClarity: number
  speakerExperiencePresence: number
  comment?: string
}

const VoteForm = () => {
  const pathname = usePathname()
  const proposalId = getLastSegment(pathname)

  const initialValues: VoteFormData = {
    audienceInterest: 5,
    topicOriginalityDepth: 5,
    contentQualityClarity: 5,
    speakerExperiencePresence: 5,
    comment: '',
  }

  const calcTotalScore = (values: VoteFormData) => {
    return (
      values.audienceInterest +
      values.topicOriginalityDepth +
      values.contentQualityClarity +
      values.speakerExperiencePresence
    )
  }

  const handleSubmit = async (values: VoteFormData, { setSubmitting }: any) => {
    try {
      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        toast.error('You must be logged in to vote')
        return
      }

      console.log('values💰', values)
      console.log('user🧰', user)
      console.log('proposalId💎', proposalId)
      console.log('calcTotalScore🦠', calcTotalScore(values))

      // Save vote to database
      //   const { error } = await supabase.from('votes').insert({
      //     proposal_id: proposalId,
      //     user_id: user.id,
      //     audience_interest: values.audienceInterest,
      //     topic_originality_depth: values.topicOriginalityDepth,
      //     content_quality_clarity: values.contentQualityClarity,
      //     speaker_experience_presence: values.speakerExperiencePresence,
      //     created_at: new Date().toISOString(),
      //   })

      //   if (error) {
      //     console.error('Vote submission error:', error)
      //     toast.error('Failed to submit vote')
      //     return
      //   }

      toast.success('Vote submitted successfully!')
    } catch (err) {
      console.error('Vote submission error:', err)
      toast.error('Failed to submit vote')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={voteValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form style={{ width: '100%' }}>
          <S.Container>
            <S.SlideBarContainer>
              <SlideBar
                ariaLabel="Audience Interest"
                value={values.audienceInterest}
                onChange={(event, newValue) =>
                  setFieldValue('audienceInterest', newValue)
                }
                name="audienceInterest"
              />
              {touched.audienceInterest && errors.audienceInterest && (
                <S.ErrorText>{errors.audienceInterest}</S.ErrorText>
              )}
            </S.SlideBarContainer>

            <S.SlideBarContainer>
              <SlideBar
                ariaLabel="Topic Originality & Depth"
                value={values.topicOriginalityDepth}
                onChange={(event, newValue) =>
                  setFieldValue('topicOriginalityDepth', newValue)
                }
                name="topicOriginalityDepth"
              />
              {touched.topicOriginalityDepth &&
                errors.topicOriginalityDepth && (
                  <S.ErrorText>{errors.topicOriginalityDepth}</S.ErrorText>
                )}
            </S.SlideBarContainer>

            <S.SlideBarContainer>
              <SlideBar
                ariaLabel="Content Quality & Clarity"
                value={values.contentQualityClarity}
                onChange={(event, newValue) =>
                  setFieldValue('contentQualityClarity', newValue)
                }
                name="contentQualityClarity"
              />
              {touched.contentQualityClarity &&
                errors.contentQualityClarity && (
                  <S.ErrorText>{errors.contentQualityClarity}</S.ErrorText>
                )}
            </S.SlideBarContainer>

            <S.SlideBarContainer>
              <SlideBar
                ariaLabel="Speaker Experience & Presence"
                value={values.speakerExperiencePresence}
                onChange={(event, newValue) =>
                  setFieldValue('speakerExperiencePresence', newValue)
                }
                name="speakerExperiencePresence"
              />
              {touched.speakerExperiencePresence &&
                errors.speakerExperiencePresence && (
                  <S.ErrorText>{errors.speakerExperiencePresence}</S.ErrorText>
                )}
            </S.SlideBarContainer>

            <S.TotalScoreBox>
              <Typography variant="body1">
                Total Score: {calcTotalScore(values)}
              </Typography>
            </S.TotalScoreBox>

            <Typography variant="body1" textAlign="left" width="100%" mb={0.5}>
              Comment
            </Typography>
            <TextField
              value={values.comment}
              onChange={(event) => setFieldValue('comment', event.target.value)}
              name="comment"
              fullWidth
              multiline
              rows={4}
              placeholder="Enter your review comment here..."
              sx={{
                marginBottom: '16px',
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              style={{ marginTop: '16px', padding: '12px 32px' }}
              fullWidth
            >
              {isSubmitting ? 'Submitting Vote...' : 'Submit Vote'}
            </Button>
          </S.Container>
        </Form>
      )}
    </Formik>
  )
}

export default VoteForm
