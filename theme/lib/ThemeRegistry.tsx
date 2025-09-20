'use client'

import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { theme } from '@/theme'

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const cache = createCache({ key: 'css', prepend: true })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
