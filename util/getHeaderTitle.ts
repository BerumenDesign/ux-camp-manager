interface GetHeaderTitle {
  type: 'candidate' | 'admin'
  lastSegment: string
}

const CandidateHeaderTitleMap: Record<string, string> = {
  proposal: 'Create Proposal',
  'my-proposals': 'My Proposals',
}

const AdminHeaderTitleMap: Record<string, string> = {
  proposals: 'Proposals',
}

const getHeaderTitle = ({ type, lastSegment }: GetHeaderTitle) => {
  if (type === 'candidate') {
    return CandidateHeaderTitleMap[lastSegment]
  }

  return AdminHeaderTitleMap[lastSegment]
}

export default getHeaderTitle
