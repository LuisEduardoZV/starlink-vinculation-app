import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'

// mui imports
import {
  Table,
  TableBody, TableCell, TableContainer,
  TablePagination, TableRow
} from '@mui/material'

// project imports
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import LoadingInfoTable from '../../ui-components/LoadingInfoTable'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'
import Row from './Row'

// services
import { getComparator, stableSort } from '../../services/tableServices'

const headCells = [
  {
    id: 'powerUser_Id',
    label: '#'
  },
  {
    id: 'fullName',
    label: 'Nombre'
  },
  {
    id: 'email',
    label: 'E-mail'
  },
  {
    id: 'isEnabled',
    label: 'Estatus'
  },
  {
    id: 'actions',
    label: 'Acciones'
  }
]

const PowerUserList = ({ data, mainData, loading, onEdit, onDelete }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('fullName')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  /*
  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setData(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i].fullName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].email.toLowerCase().includes(filters[j].trim().toLowerCase())
          ) {
            if (!newRows.find((value) => value === available[i])) { newRows.push(available[i]) }
          }
        }
      }
      setData(newRows)
    }
  }
  */

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const visibleRows = useMemo(
    () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  )

  return (
    <>
      <TableContainer sx={{ maxWidth: '100%' }}>
        <Table sx={{ maxWidth: '100%', '& .MuiTableCell-root': { borderColor: (theme) => theme.palette.grey[800] } }} aria-labelledby='tableTitle' size='medium'>
          {!loading && data.length === 0 && <caption><NoInfoOverlay /></caption>}
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {loading
              ? <LoadingInfoTable headCells={headCells} />
              : visibleRows.map((row) => {
                const labelId = `enhanced-table-checkbox-${row.powerUser_Id}`

                return (
                  <Row
                    key={labelId}
                    element={row}
                    page={page}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * 5
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        sx={{
          color: 'white',
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: 'white' },
          '& .MuiSelect-select, & .MuiSvgIcon-root': { color: (theme) => theme.palette.primary.main }
        }}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Filas por página:'
        labelDisplayedRows={({ from, to, count }) => (`${from}-${to} de ${count}`)}
      />
    </>
  )
}

PowerUserList.propTypes = {
  data: PropTypes.array,
  mainData: PropTypes.array,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default PowerUserList
