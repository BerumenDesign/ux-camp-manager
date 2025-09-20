'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useRouter } from 'next/navigation'
import ListItem from '@mui/material/ListItem'

// import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import * as S from './Sidebar.styles'

export interface MenuItem {
  text: string
  icon: React.ReactNode
  path: string
}

interface SidebarProps {
  children: React.ReactNode
  menuItems: MenuItem[]
}

export default function Sidebar({ children, menuItems }: SidebarProps) {
  //   const theme = useTheme()
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const handleDrawer = () => {
    setOpen((prev) => !prev)
  }

  const handleRedirect = (path: string) => {
    router.push(path)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <S.Drawer variant="permanent" open={open}>
        <S.DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </S.DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => handleRedirect(item.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    mr: open ? 2 : 'auto',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </S.Drawer>
      <S.Main>{children}</S.Main>
    </Box>
  )
}
