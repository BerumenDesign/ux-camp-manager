import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewListIcon from '@mui/icons-material/ViewList'

import { MenuItem } from '@/components/shared/sidebar/Sidebar'

export const adminMenuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  {
    text: 'Proposals',
    icon: <ViewListIcon />,
    path: '/admin/proposals',
  },
]
