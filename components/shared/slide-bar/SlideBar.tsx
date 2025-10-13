import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Typography } from '@mui/material'

interface Mark {
  value: number
  label: string
}

interface SlideBarProps {
  marks?: Mark[] | boolean
  min?: number
  max?: number
  step?: number
  ariaLabel?: string
  defaultValue?: number
  value?: number
  onChange?: (event: Event, newValue: number | number[]) => void
  name?: string
}

function valuetext(value: number) {
  return `${value}`
}

const defaultMarks: Mark[] = [
  { value: 0, label: 'Poor' },
  { value: 10, label: 'Excellent' },
]

const SlideBar = ({
  marks = defaultMarks,
  min = 0,
  max = 10,
  step = 1,
  ariaLabel = 'Score',
  defaultValue = 5,
  value,
  onChange,
  name,
}: SlideBarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '24px 0px',
      }}
    >
      <Box display="flex" justifyContent="flex-start" width="80%">
        <Typography variant="body1" mb={1} textAlign="left">
          {ariaLabel}
        </Typography>
      </Box>
      <Slider
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
        name={name}
        sx={{ width: '80%' }}
      />
    </Box>
  )
}

export default SlideBar
