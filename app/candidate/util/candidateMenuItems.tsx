import QueueIcon from '@mui/icons-material/Queue'
import ViewListIcon from '@mui/icons-material/ViewList'

import { MenuItem } from '@/components/shared/sidebar/Sidebar'

export const candidateMenuItems: MenuItem[] = [
  {
    text: 'Create Proposal',
    icon: <QueueIcon />,
    path: '/candidate/proposal',
  },
  {
    text: 'My Proposals',
    icon: <ViewListIcon />,
    path: '/candidate/my-proposals',
  },
]
