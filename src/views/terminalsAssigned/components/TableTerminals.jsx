import PropTypes from 'prop-types'
import React from 'react'

// mui imports
import { DataGrid } from '@mui/x-data-grid'

// project imports
import NoInfoOverlay from '../../../ui-components/NoInfoOverlay'
import Pagination from './Pagination'

// services
import { gridExample } from '../../../utils/allColumnsTables'

const TableTerminals = ({ loading, data, selected, handleClick, handleSave }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      {data && (
        <DataGrid
          loading={loading}
          columns={gridExample}
          rows={data}
          getRowId={(row) => (row.fullName + row.terminalSiteName + row.dashboardName)}
          autoHeight
          pagination
          pageSizeOptions={rowsPerPage}
          page={page}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            borderColor: 'primary.light',
            height: '100%',
            outline: 'none',
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
              outline: 'none'
            },
            '& .MuiDataGrid-cell': {
              color: (theme) => theme.palette.grey[500]
            },
            '& .MuiDataGrid-cell:hover': {
              color: (theme) => theme.palette.grey[300]
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'whitesmoke'
            },
            '& .MuiIconButton-root': {
              color: (theme) => theme.palette.grey[500],
              outline: 'none'
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'transparent'
            },
            '& .MuiDataGrid-withBorderColor': {
              borderColor: (theme) => (theme.palette.grey[800]),
              borderWidth: '1px'
            }
          }}
          disableColumnMenu
          rowHeight={55}
          slots={{
            pagination: Pagination,
            noRowsOverlay: NoInfoOverlay
          }}
          slotProps={{
            pagination: { rowsPerPage, handleChangePage, handleChangeRowsPerPage }
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: rowsPerPage } }
          }}
        />)}
    </>
  )
}

TableTerminals.displayName = 'TableTerminals'

TableTerminals.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  selected: PropTypes.array,
  handleClick: PropTypes.func,
  handleSave: PropTypes.func
}

export default TableTerminals
