/**
 * Utility functions for vote calculations and analytics
 */

export interface VoteData {
  id: string
  proposal_id: string
  user_id: string
  audience_interest: number
  topic_originality_depth: number
  content_quality_clarity: number
  speaker_experience_presence: number
  created_at: string
}

export interface ProposalVoteStats {
  proposalId: string
  totalVotes: number
  averageScores: {
    audienceInterest: number
    topicOriginalityDepth: number
    contentQualityClarity: number
    speakerExperiencePresence: number
    overall: number
  }
  scores: VoteData[]
}

/**
 * Calculate average scores for a proposal from all votes
 */
export function calculateProposalVoteStats(
  votes: VoteData[]
): ProposalVoteStats | null {
  if (!votes || votes.length === 0) {
    return null
  }

  const totalVotes = votes.length

  // Calculate averages for each criterion
  const audienceInterest =
    votes.reduce((sum, vote) => sum + vote.audience_interest, 0) / totalVotes
  const topicOriginalityDepth =
    votes.reduce((sum, vote) => sum + vote.topic_originality_depth, 0) /
    totalVotes
  const contentQualityClarity =
    votes.reduce((sum, vote) => sum + vote.content_quality_clarity, 0) /
    totalVotes
  const speakerExperiencePresence =
    votes.reduce((sum, vote) => sum + vote.speaker_experience_presence, 0) /
    totalVotes

  // Calculate overall average
  const overall =
    (audienceInterest +
      topicOriginalityDepth +
      contentQualityClarity +
      speakerExperiencePresence) /
    4

  return {
    proposalId: votes[0].proposal_id,
    totalVotes,
    averageScores: {
      audienceInterest: Math.round(audienceInterest * 100) / 100, // Round to 2 decimal places
      topicOriginalityDepth: Math.round(topicOriginalityDepth * 100) / 100,
      contentQualityClarity: Math.round(contentQualityClarity * 100) / 100,
      speakerExperiencePresence:
        Math.round(speakerExperiencePresence * 100) / 100,
      overall: Math.round(overall * 100) / 100,
    },
    scores: votes,
  }
}

/**
 * Get vote statistics for multiple proposals
 */
export function calculateMultipleProposalStats(
  proposalVotesMap: Record<string, VoteData[]>
) {
  const stats: Record<string, ProposalVoteStats | null> = {}

  for (const [proposalId, votes] of Object.entries(proposalVotesMap)) {
    stats[proposalId] = calculateProposalVoteStats(votes)
  }

  return stats
}

/**
 * Get a user's vote for a specific proposal
 */
export function getUserVoteForProposal(
  votes: VoteData[],
  userId: string,
  proposalId: string
): VoteData | null {
  return (
    votes.find(
      (vote) => vote.user_id === userId && vote.proposal_id === proposalId
    ) || null
  )
}

/**
 * Check if a user has already voted on a proposal
 */
export function hasUserVoted(
  votes: VoteData[],
  userId: string,
  proposalId: string
): boolean {
  return votes.some(
    (vote) => vote.user_id === userId && vote.proposal_id === proposalId
  )
}
