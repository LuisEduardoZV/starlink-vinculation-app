import PropTypes from 'prop-types'
import React from 'react'

// mui imports
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'

// project imports
import EnhancedTableHead from '../../../ui-components/EnhancedTableHead'
import LoadingInfoTable from '../../../ui-components/LoadingInfoTable'
import NoInfoOverlay from '../../../ui-components/NoInfoOverlay'
import Row from '../Row'
import RowExpanded from '../RowExpanded'

// services
import { getComparator, stableSort } from '../../../services/tableServices'
import { terminalsTableHeadders as headCells } from '../../../utils/allColumnsTables'

const TableTerminals = ({ loading, data, selected, handleClick }) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('terminalSiteName')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const visibleRows = React.useMemo(
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
            hasExtendedRowOption
          />
          <TableBody>
            {loading
              ? <LoadingInfoTable headCells={headCells} />
              : visibleRows.map((row) => {
                const isItemSelected = isSelected(row.terminalId)
                const labelId = `enhanced-table-checkbox-${row.terminalId}`

                return (
                  <Row
                    key={labelId}
                    element={row}
                    handleClick={(event) => handleClick(event, row.terminalId)}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    page={page}
                    hasExtendedRow
                    RowTemplate={RowExpanded}
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

TableTerminals.displayName = 'TableTerminals'

TableTerminals.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  selected: PropTypes.array,
  handleClick: PropTypes.func
}

export default TableTerminals
