'use client'

import * as S from './CreateProposal.styles'
import ProposalForm from '@/components/shared/forms/proposal/proposal-form'

const CreateProposal = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Logo>UX CAMP</S.Logo>
        <S.Title>SUBMIT YOUR PROPOSAL</S.Title>
      </S.Header>

      <ProposalForm type="candidate" />
    </S.Container>
  )
}

export default CreateProposal
