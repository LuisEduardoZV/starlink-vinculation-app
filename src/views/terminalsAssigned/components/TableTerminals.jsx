import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports

import { alpha, useTheme } from '@mui/material/styles'
import { Column } from 'primereact/column'
import { TreeTable } from 'primereact/treetable'

// project imports
import NoInfoOverlay from '../../../ui-components/NoInfoOverlay'
import Pagination from './Pagination'

// services
import { gridExample } from '../../../utils/allColumnsTables'

const TableTerminals = ({ loading, data, selected, handleClick, handleSave }) => {
  const theme = useTheme()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [rows, setRows] = useState(
    [{
      key: '0',
      data: {
        name: 'Applications',
        size: '100kb',
        type: 'Folder'
      },
      children: [
        {
          key: '0-1',
          data: {
            name: 'editor.app',
            size: '25kb',
            type: 'Application'
          }
        },
        {
          key: '0-2',
          data: {
            name: 'settings.app',
            size: '50kb',
            type: 'Application'
          }
        }
      ]
    }
    ]
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      let lastUser = null
      let index = 1
      const newRows = []
      let info = {}
      for (let i = 0; i < data.length; i++) {
        const { assignId, dashboardName, fullName, terminalSiteName } = data[i]
        if (lastUser === fullName) {
          info.children.push({
            key: assignId,
            data: {
              fullName: index++,
              terminalSiteName,
              dashboardName
            }
          })
        } else {
          if (lastUser) newRows.push(info)
          info = {}
          index = 1
          lastUser = fullName
          info.children = []
          info.key = assignId
          info.data = {
            fullName,
            terminalSiteName: '',
            dashboardName: ''
          }
          info.children.push({
            key: assignId,
            data: {
              fullName: index++,
              terminalSiteName,
              dashboardName
            }
          })
        }
      }
      newRows.push(info)
      setRows(newRows)
    }
  }, [data])

  if (!rows) return
  return (
    <>
      {rows && (
        <TreeTable
          value={rows} rowHover loading={loading} pageLinkSize={page} paginator id='tabla' rows={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} tableStyle={{
            minWidth: '50rem',
            '.p-paginator-bottom .p-paginator .p-component': {
              backgroundColor: 'blue',
              color: 'blue'
            }
          }}
          style={{
            '.p-paginator-bottom .p-paginator .p-component': {
              backgroundColor: 'blue',
              color: 'blue'
            }
          }}// .p-paginator-bottom .p-paginator .p-component. Did you mean .pPaginatorBottom .pPaginator .pComponent?
          paginatorTemplate='RowsPerPageDropdown PrevPageLink CurrentPageReport NextPageLink'
          currentPageReportTemplate='{first} - {last} de {totalRecords}'
          paginatorLeft
        >
          <Column
            field='fullName' header='Nombre' expander
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}`, display: 'flex', gap: 10 }}
          />
          <Column
            field='terminalSiteName' header='Nombre del sitio'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column
            field='dashboardName' header='Nombre del dashboard'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
          />
        </TreeTable>
      )}
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

/*
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
        />
*/
