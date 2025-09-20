'use client'

import MuiTable from '@mui/material/Table'
import { useRouter } from 'next/navigation'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { useTheme, Typography } from '@mui/material'
import { ChangeEvent, ReactNode, useState } from 'react'
import TablePagination from '@mui/material/TablePagination'

import * as S from './Table.styles'

type TableRowData = Record<string, unknown> & { id: string }

interface TableProps<T extends TableRowData = TableRowData> {
  columns: Column[]
  rows: T[]
  maxHeight?: number
  handleClick?: () => void
  path?: string
}

export interface Column<T extends TableRowData = TableRowData> {
  id: string
  label: string
  status?: string
  align?: 'left' | 'center' | 'right'
  width?: number | string
  minWidth?: number
  maxWidth?: number | string
  render?: (value: unknown, row: T) => ReactNode
  handleClick?: () => void
}

const Table = <T extends TableRowData = TableRowData>({
  columns,
  rows,
  maxHeight,
  handleClick,
  path,
}: TableProps<T>) => {
  const theme = useTheme()
  const router = useRouter()

  const handleRowClick = (id: string) => {
    if (handleClick) {
      handleClick()
      return
    }

    router.push(`/candidate/${path}/${id}`)
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const renderValue = (value: unknown): ReactNode => {
    if (value === null || value === undefined) {
      return ''
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    return String(value)
  }

  return (
    <S.Container>
      <S.TableWrapper
        sx={{
          maxHeight: maxHeight ?? 550,
        }}
      >
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <S.HeaderCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    maxWidth: column.maxWidth,
                  }}
                >
                  <Typography variant="body1">
                    <b>{column.label}</b>
                  </Typography>
                </S.HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <S.Row
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <S.Cell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            width: column.width,
                            maxWidth: column.maxWidth,
                          }}
                        >
                          <Typography
                            variant="body1"
                            color={theme.palette.black.main}
                          >
                            {column.render
                              ? column.render(value, row)
                              : renderValue(value)}
                          </Typography>
                        </S.Cell>
                      )
                    })}
                  </S.Row>
                )
              })}
          </TableBody>
        </MuiTable>
      </S.TableWrapper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </S.Container>
  )
}

export default Table
