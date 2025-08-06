import { Box, TextField, FormControl, Typography } from '@mui/material'
import { styled } from '@mui/system'
import EmergencyIcon from '@mui/icons-material/Emergency'

export const FormField = styled(Box)({
  marginBottom: 24,
})

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e91e63',
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none', // Hide the auto label
  },
  '& .MuiInputBase-input': {
    color: '#333',
    padding: '12px 16px',
    '&::placeholder': {
      color: '#999',
      opacity: 1,
    },
  },
  // For multiline textareas
  '& .MuiInputBase-inputMultiline': {
    minHeight: '80px',
  },
})

export const Label = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
  marginBottom: 8,
})

export const StyledFormControl = styled(FormControl)({
  '& .MuiFormLabel-root': {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  '& .MuiRadioGroup-root': {
    flexDirection: 'row',
    gap: 16,
  },
  '& .MuiFormControlLabel-root': {
    color: 'white',
    '& .MuiRadio-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-checked': {
        color: '#e91e63',
      },
    },
  },
})

export const ErrorMessage = styled(Typography)({
  color: '#f44336',
  fontSize: '14px',
  marginTop: 8,
})

export const CharacterCount = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '12px',
  textAlign: 'right',
  marginTop: 4,
})

export const RequiredIcon = styled(EmergencyIcon)({
  fontSize: '10px',
  marginBottom: '10px',
})

export const Radios = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})
