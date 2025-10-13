import { Box, TextField, FormControl, Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'
import EmergencyIcon from '@mui/icons-material/Emergency'

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  margin: '0 auto',
  padding: '24px',
  minHeight: '100vh',
  color: theme.palette.black.main,
}))

export const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const Logo = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
})

export const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
})

export const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontWeight: 'bold',
  marginBottom: 8,
}))

export const Section = styled(Paper)(({ theme }) => ({
  padding: 24,
  border: `2px solid ${theme.palette.gray.light}`,
  borderRadius: 8,
  marginBottom: 24,
}))

export const SectionTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: 16,
  textTransform: 'uppercase',
})

export const FormField = styled(Box)({
  marginBottom: 24,
})

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.white.main,
    '& fieldset': {
      border: `0.5px solid ${theme.palette.gray.main}`,
      borderRadius: 8,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.gray.main}`,
    },
    '&.Mui-focused fieldset': {
      border: `1.5px solid ${theme.palette.gray.dark}`,
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none', // Hide the auto label
  },
  '& .MuiInputBase-input': {
    color: theme.palette.black.main,
    padding: '12px 16px',
    '&::placeholder': {
      color: theme.palette.gray.main,
      opacity: 1,
    },
  },
  // For multiline textareas
  '& .MuiInputBase-inputMultiline': {
    minHeight: '80px',
    padding: '0px',
  },
}))

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
    '& .MuiRadio-root': {
      color: theme.palette.gray.main,
      '&.Mui-checked': {
        color: theme.palette.gray.dark,
      },
    },
  },
}))

export const FileUploadArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  border: `1px dashed ${theme.palette.gray.main}`,
  borderRadius: 8,
  padding: 32,
  textAlign: 'center',
  cursor: 'pointer',

  transition: 'all 0.2s ease',
  '&:hover': {
    border: `1.5px dashed ${theme.palette.gray.dark}`,
  },
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  maxHeight: '100%',
}))

export const FileUploadAreaContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const ImageBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover',
}))

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.red.main,
  fontSize: '14px',
  marginTop: 8,
}))

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
