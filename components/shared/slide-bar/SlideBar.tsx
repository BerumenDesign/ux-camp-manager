import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

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
}

function valuetext(value: number) {
  return `${value}`
}

const defaultMarks: Mark[] = [
  { value: 0, label: 'Poor' },
  { value: 5, label: '5' },
  { value: 10, label: 'Excellent' },
]

const SlideBar = ({
  marks = defaultMarks,
  min = 0,
  max = 10,
  step = 1,
  ariaLabel = 'Score',
  defaultValue = 5,
}: SlideBarProps) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        min={min}
        max={max}
      />
    </Box>
  )
}

export default SlideBar
