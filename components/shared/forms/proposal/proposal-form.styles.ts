import {
  Box,
  TextField,
  FormControl,
  Button,
  Typography,
  Paper,
} from '@mui/material'
import { styled } from '@mui/system'
import EmergencyIcon from '@mui/icons-material/Emergency'

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  maxWidth: 800,
  margin: '0 auto',
  padding: '24px',
  backgroundColor: '#1a237e',
  minHeight: '100vh',
  color: 'white',
})

export const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginBottom: 32,
})

export const Logo = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'white',
})

export const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#e91e63',
  textTransform: 'uppercase',
  letterSpacing: '2px',
})

export const Section = styled(Paper)({
  padding: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
})

export const SectionTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#e91e63',
  marginBottom: 16,
  textTransform: 'uppercase',
})

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

export const FileUploadArea = styled(Box)({
  border: '2px dashed rgba(255, 255, 255, 0.5)',
  borderRadius: 8,
  padding: 32,
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#e91e63',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
})

export const AddSpeakerButton = styled(Button)({
  backgroundColor: 'white',
  color: '#333',
  border: '2px solid #333',
  borderRadius: 8,
  padding: '12px 24px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
})

export const SubmitButton = styled(Button)({
  backgroundColor: '#666',
  color: 'white',
  borderRadius: 8,
  padding: '12px 32px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#555',
  },
  '&.Mui-disabled': {
    backgroundColor: '#444',
    color: 'rgba(255, 255, 255, 0.5)',
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
