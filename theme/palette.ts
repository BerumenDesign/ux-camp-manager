import { PaletteOptions } from '@mui/material'

export interface PaletteColorOptions {
  extraLight?: string
  light?: string
  main?: string
  dark?: string
  contrastText?: string
}

export const palette: PaletteOptions = {
  green: {
    extraLight: '#A3F3C8',
    light: '#84E9A8',
    main: '#1ED760',
    dark: '#17A94D',
    contrastText: '#fff',
  },
  purple: {
    extraLight: '#F3ECFC',
    light: '#CDAFF0',
    main: '#7233FA',
    dark: '#8138DA',
    contrastText: '#fff',
  },
  red: {
    extraLight: '#F4B3B0',
    light: '#E57370',
    main: '#E75248',
    dark: '#A12D26',
    contrastText: '#fff',
  },
  blue: {
    extraLight: '#B3D5FF',
    light: '#73A9FF',
    main: '#4673F9',
    dark: '#2E57C7',
    contrastText: '#fff',
  },
  orange: {
    extraLight: '#FFE9B3',
    light: '#FFD073',
    main: '#F9B746',
    dark: '#C78A2E',
    contrastText: '#fff',
  },
  gray: {
    extraLight: '#EEEEEE',
    light: '#D9D9D9',
    main: '#979797',
    dark: '#333333',
    contrastText: '#000',
  },
  white: {
    extraLight: '#fff',
    light: '#fff',
    main: '#fff',
    dark: '#fff',
    contrastText: '#000',
  },
  black: {
    extraLight: '#151515',
    light: '#0E0E0E',
    main: '#000',
    dark: '#000',
    contrastText: '#fff',
  },
}

export default palette
