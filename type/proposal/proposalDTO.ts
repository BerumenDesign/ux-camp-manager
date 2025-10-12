export const SessionFormatMap: Record<string, string> = {
  'half-day': 'Half Day',
  'full-day': 'Full Day',
  presentation: 'Presentation',
  'quick-talk': 'Quick Talk',
  panel: 'Panel',
}

export const PresentationLocationMap: Record<string, string> = {
  calgary: 'Calgary',
  edmonton: 'Edmonton',
  both: 'Both',
}

export const ProposalStatusMap: Record<string, string> = {
  pending: 'Pending',
  review: 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
  published: 'Published',
}

export const proposalDTO = (proposalData) => {
  return {
    id: proposalData.id,
    sessionName: proposalData.session_name,
    sessionDescription: proposalData.session_description,
    audienceTakeaway: proposalData.audience_takeaway,
    presentationLocation:
      PresentationLocationMap[proposalData.presentation_location],
    sessionFormat: SessionFormatMap[proposalData.session_format],
    specialRequests: proposalData.special_requests,
    otherComments: proposalData.other_comments,
    status: proposalData.status,
  }
}
