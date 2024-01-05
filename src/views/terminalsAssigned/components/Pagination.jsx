import PropTypes from 'prop-types'

// mui imports
import { TablePagination } from '@mui/material'
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid'

const Pagination = ({ rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      sx={{
        color: 'white',
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: 'white' },
        '& .MuiSelect-select, & .MuiSvgIcon-root': { color: (theme) => theme.palette.primary.main }
      }}
      count={pageCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage='Filas por página:'
      labelDisplayedRows={({ from, to, count }) => (`${from}-${to} de ${count}`)}
    />
  )
}

Pagination.propTypes = {
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func
}

export default Pagination
