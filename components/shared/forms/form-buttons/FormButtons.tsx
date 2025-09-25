import { Button, useTheme } from '@mui/material'

import * as S from './FormButtons.styles'

interface FormButtonsProps {
  isEdit: boolean
  isValid: boolean
  handleCancel: () => void
  handleEdit: () => void
}

const FormButtons = ({
  isEdit,
  isValid,
  handleCancel,
  handleEdit,
}: FormButtonsProps) => {
  const theme = useTheme()

  return (
    <S.ButtonBox>
      {isEdit ? (
        <>
          <Button
            sx={{
              backgroundColor: theme.palette.white.main,
            }}
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.green.main,
            }}
            type="submit"
            disabled={!isValid}
          >
            Save
          </Button>
        </>
      ) : (
        <Button
          sx={{
            backgroundColor: theme.palette.orange.main,
          }}
          type="button"
          onClick={handleEdit}
        >
          Edit
        </Button>
      )}
    </S.ButtonBox>
  )
}

export default FormButtons
