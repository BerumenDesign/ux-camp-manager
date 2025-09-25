export enum PresentationLocation {
  calgary = 'calgary',
  edmonton = 'edmonton',
  both = 'both',
}

export enum SessionFormat {
  halfDay = 'half-day',
  fullDay = 'full-day',
  presentation = 'presentation',
  quickTalk = 'quick-talk',
  panel = 'panel',
}

export enum SessionStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export enum ProposalStatus {
  pending = 'pending',
  review = 'review',
  approved = 'approved',
  rejected = 'rejected',
  published = 'published',
}

export type Proposal = {
  id: string
  sessionName: string
  sessionDescription: string
  audienceTakeaway: string
  presentationLocation: PresentationLocation | null
  sessionFormat: string
  specialRequests: string
  otherComments: string
  status: ProposalStatus
}
