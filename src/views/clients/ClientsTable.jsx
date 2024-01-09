import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'

// mui imports
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'

// project imports
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import LoadingInfoTable from '../../ui-components/LoadingInfoTable'
import Row from './Row'

import { getComparator, stableSort } from '../../services/tableServices'
import { clientTableHeadders as headCells } from '../../utils/allColumnsTables'

const ClientsTable = ({ loading, setSelected, setDataSelected, setView, selected, data }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('clientName')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event, id) => {
    if (id === selected[0]) {
      setSelected([])
      setDataSelected(null)
      setView(null)
    } else {
      setSelected([id])
      const index = data.map((row) => row.clientId).indexOf(id)
      setDataSelected(data[index])
      setView(0)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const visibleRows = useMemo(
    () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  )
  return (
    <>
      <TableContainer sx={{ maxWidth: '100%' }}>
        <Table sx={{ maxWidth: '100%', '& .MuiTableCell-root': { borderColor: (theme) => theme.palette.grey[800] } }} aria-labelledby='tableTitle' size='medium'>
          {!loading && data.length === 0 && <caption>No se han encotrado datos</caption>}
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
                const isItemSelected = isSelected(row.clientId)
                const labelId = `enhanced-table-checkbox-${row.clientId}`

                return (
                  <Row
                    key={labelId}
                    element={row}
                    handleClick={(event) => handleClick(event, row.clientId)}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    page={page}
                  />
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
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
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white },
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

ClientsTable.propTypes = {
  loading: PropTypes.bool,
  setSelected: PropTypes.func,
  setDataSelected: PropTypes.func,
  setView: PropTypes.func,
  selected: PropTypes.array,
  data: PropTypes.array
}

export default ClientsTable
