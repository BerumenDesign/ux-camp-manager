import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteColorOptions
  }
  interface ThemeOptions {
    palette: PaletteColorOptions
  }

  interface Palette {
    green: PaletteColorOptions
    purple: PaletteColorOptions
    red: PaletteColorOptions
    orange: PaletteColorOptions
    gray: PaletteColorOptions
    white: PaletteColorOptions
    black: PaletteColorOptions
    blue: PaletteColorOptions
  }

  interface PaletteOptions {
    green?: PaletteColorOptions
    purple?: PaletteColorOptions
    red?: PaletteColorOptions
    orange?: PaletteColorOptions
    gray?: PaletteColorOptions
    white?: PaletteColorOptions
    black?: PaletteColorOptions
    blue?: PaletteColorOptions
  }
}
