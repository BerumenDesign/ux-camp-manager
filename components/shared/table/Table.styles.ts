import { styled } from '@mui/system'
import { Paper, TableCell, TableContainer, TableRow } from '@mui/material'

export const Container = styled(Paper)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.white.main,
  color: theme.palette.black.main,
}))

export const TableWrapper = styled(TableContainer)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.white.main,
}))

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  // backgroundColor: theme.palette.gray.light,
  borderBottom: `2px solid ${theme.palette.gray.main}`,
}))

export const Row = styled(TableRow)(() => ({
  transition: 'background-color 0.5s ease-in-out',
  '&:hover': {
    backgroundColor: '#0000000D',
    cursor: 'pointer',
  },
}))

export const Cell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.black.main,
  padding: '12px',
}))
