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
  const color = theme.palette.black.main

  return (
    <S.ButtonBox>
      {isEdit ? (
        <>
          <Button
            variant="outlined"
            type="button"
            onClick={() => handleCancel()}
            sx={{
              color,
              borderColor: theme.palette.black.main,
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color,
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
            color,
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
