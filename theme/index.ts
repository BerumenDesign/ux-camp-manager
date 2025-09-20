import { createTheme, ThemeOptions } from '@mui/material/styles'

import palette from './palette'

export const theme = createTheme({
  palette: {
    ...palette,
  },
} as ThemeOptions)

export type Theme = typeof theme
