import { Box, TextField, FormControl, Typography } from '@mui/material'
import { styled } from '@mui/system'
import EmergencyIcon from '@mui/icons-material/Emergency'

export const FormField = styled(Box)({
  marginBottom: 24,
})

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.white.main,
    '& fieldset': {
      border: `0.5px solid ${theme.palette.gray.main}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.gray.main}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.gray.dark}`,
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
}))

export const Label = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: 8,
})

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  '& .MuiRadioGroup-root': {
    flexDirection: 'row',
    gap: 16,
  },
  '& .MuiFormControlLabel-root': {
    color: theme.palette.black.main,
    '& .MuiRadio-root': {
      color: theme.palette.black.main,
      '&.Mui-checked': {
        color: theme.palette.black.main,
      },
    },
  },
}))

export const ErrorMessage = styled(Typography)({
  color: '#f44336',
  fontSize: '14px',
  marginTop: 8,
})

export const CharacterCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontSize: '12px',
  textAlign: 'right',
  marginTop: 4,
}))

export const RequiredIcon = styled(EmergencyIcon)({
  fontSize: '10px',
  marginBottom: '10px',
})

export const Radios = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})
