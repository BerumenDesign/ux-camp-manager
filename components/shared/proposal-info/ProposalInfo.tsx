'use client'

import { useState } from 'react'
import { Proposal } from '@/type/proposal/proposal'
import * as S from './ProposalInfo.styles'
import DetailItem from '../detail-item/DetailItem'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ProposalInfoProps {
  values: Proposal
  initialValues: Proposal
  isEdit: boolean
  touched: any
  errors: any
}

const ProposalInfo = ({
  values,
  initialValues, // eslint-disable-line @typescript-eslint/no-unused-vars
  isEdit,
  touched, // eslint-disable-line @typescript-eslint/no-unused-vars
  errors,
}: ProposalInfoProps) => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fetchUserRole = async () => {
      const supabase = createClient()
      const { data: user } = await supabase.auth.getUser()
      const isAdmin = user?.user?.role === 'admin'
      setIsAdmin(isAdmin)
    }

    fetchUserRole()
  }, [])

  return (
    <S.Container>
      {/* <DetailItem isEdit={false} item={values.id} name="id" label="ID #" /> */}
      <DetailItem
        isEdit={isAdmin}
        item={values.status}
        name="status"
        label="ProposalStatus"
        displayValue={values.status.toUpperCase()}
      />

      <DetailItem
        isEdit={isEdit}
        item={values.sessionName}
        name="sessionName"
        label="Session Name"
        error={errors?.sessionName}
      />
      <DetailItem
        isEdit={isEdit}
        item={values.sessionDescription}
        name="sessionDescription"
        label="Session Description"
        isParagraph={true}
        error={errors?.sessionDescription}
      />
      <DetailItem
        isEdit={isEdit}
        item={values.audienceTakeaway}
        name="audienceTakeaway"
        label="Audience Takeaway"
        isParagraph={true}
        error={errors?.audienceTakeaway}
      />
      <DetailItem
        isEdit={isAdmin}
        item={values.sessionFormat}
        name="sessionFormat"
        label="Session Format"
        error={errors?.sessionFormat}
      />
      <DetailItem
        isEdit={isAdmin}
        item={values.presentationLocation}
        name="presentationLocation"
        label="Presentation Location"
        error={errors?.presentationLocation}
      />
      <DetailItem
        isEdit={isEdit}
        item={values.specialRequests}
        name="specialRequests"
        label="Special Requests"
        isParagraph={true}
        error={errors?.specialRequests}
      />
      <DetailItem
        isEdit={isAdmin}
        item={values.otherComments}
        name="otherComments"
        label="Other Comments"
        isParagraph={true}
        error={errors?.otherComments}
      />
    </S.Container>
  )
}

export default ProposalInfo
