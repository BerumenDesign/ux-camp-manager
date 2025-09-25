import { ProposalStatus } from '@/type/proposal/proposal'

export const proposalDTO = (proposalData) => {
  return {
    id: proposalData.id,
    sessionName: proposalData.session_name,
    sessionDescription: proposalData.session_description,
    audienceTakeaway: proposalData.audience_takeaway,
    presentationLocation: proposalData.presentation_location,
    sessionFormat: proposalData.session_format,
    specialRequests: proposalData.special_requests,
    otherComments: proposalData.other_comments,
    status: proposalData.status || ProposalStatus.pending,
  }
}
