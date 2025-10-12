import { Box } from '@mui/material'

import palette from '../../../theme/palette'

const ErrorText = (props: any) => (
  <Box
    sx={{ color: palette.red.main, fontSize: '12px', marginTop: '4px' }}
    {...props}
  />
)

export default ErrorText
