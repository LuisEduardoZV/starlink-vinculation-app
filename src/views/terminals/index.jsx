import { useEffect, useMemo, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Table,
  TableBody, TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import LoadingInfoTable from '../../ui-components/LoadingInfoTable'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'
import Add from './Add'
import Edit from './Edit'
import Row from './Row'
import RowExpanded from './RowExpanded'

// services
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import { getComparator, stableSort } from '../../services/tableServices'

const headCells = [
  {
    id: 'terminalSiteName',
    label: 'Nombre del sitio'
  },
  {
    id: 'terminalLineOfService',
    label: 'Línea de servicio'
  },
  {
    id: 'terminalKitNumber',
    label: 'Número de kit'
  },
  {
    id: 'terminalSerialNumber',
    label: 'Número de serie'
  }
]

const Terminals = () => {
  const { user } = useAuth()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('terminalSiteName')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const [view, setView] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  const [open, setOpen] = useState(false)

  const [forceRender, setForceRender] = useState(null)

  const handleCancel = async (e, needRender) => {
    setView(null)
    setCollapsed(false)
    setDataSelected(null)
    setSelected([])
    setOpen(false)
    if (needRender) {
      await setForceRender(Math.random() * 9999)
    }
  }

  const handleAdd = () => {
    setCollapsed(current => !current)
    setView(1)
  }

  const handleEdit = () => {
    setCollapsed(current => !current)
    setView(0)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (id) => {
    setOpen(false)
  }

  const handleDelete = (id) => {
    const promise = () => new Promise((resolve) => {
      let data = null
      try {
        data = apiCall({ url: `${BASE_URL_API}/Terminals/${id}`, method: 'DELETE' })
      } catch (error) {
        return resolve({ status: 500, data: null })
      }
      return resolve({ status: data ? 200 : 404, data })
    })

    toast.promise(promise, {
      loading: 'Procesando...',
      success: () => {
        handleCancel('', true)
        return 'La terminal ha sido eliminada correctamente'
      },
      error: 'Error al eliminar la terminal'
    })
  }

  const handleSearch = (e, filters) => {
    setSelected([])
    if (filters.length === 0) {
      setData(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i].serviceLineNumber.toLowerCase().includes(filters[j]) ||
            available[i].terminalFriendlyName.toLowerCase().includes(filters[j]) ||
            available[i].terminalKitNumber.toLowerCase().includes(filters[j]) ||
            available[i].terminalLineOfService.toLowerCase().includes(filters[j]) ||
            available[i].terminalSerialNumber.toLowerCase().includes(filters[j]) ||
            available[i].terminalSiteName.toLowerCase().includes(filters[j])
          ) {
            if (!newRows.find((value) => value === available[i])) { newRows.push(available[i]) }
          }
        }
      }
      setData(newRows)
    }
  }

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
      const index = data.map((row) => row.terminalId).indexOf(id)
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

  useEffect(() => {
    (async () => {
      try {
        let res = []
        if (user?.user?.isPowerUser) {
          res = await apiCall({ url: `${BASE_URL_API}/Terminals` })
        } else {
          res = await apiCall({ url: `${BASE_URL_API}/getClientTerminales?id=${user?.user?.clientId}` })
        }
        setMainData(res)
        setData(res)

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setLoading(true)
    }
  }, [forceRender, user])

  return (
    <>
      <AsideMenuCrud
        inFade={collapsed}
        dataSelected={dataSelected}
        view={view} handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleOpenDelete={handleClickOpen}
        addIcon={LeakAddTwoToneIcon}
        handleSearch={handleSearch}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Fade
          in={!collapsed}
          sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out' }}
        >
          <Box>
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
          </Box>
        </Fade>
        <Fade in={collapsed} sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out', position: 'absolute', width: '80%' }}>
          <Box>
            {view ? <Add handleCancel={handleCancel} /> : <Edit handleCancel={handleCancel} selected={dataSelected} />}
          </Box>
        </Fade>
      </Box>

      {
        dataSelected &&
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle component='div' id='alert-dialog-title' sx={{ color: 'white' }}>
              <Typography variant='h2' color='inherit'>
                Eliminar terminal
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.grey[500] }}>
                <b>¿Estás seguro de eliminar la terminal {dataSelected.terminalFriendlyName ?? dataSelected.terminalSiteName} ({dataSelected.terminalSerialNumber})?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(dataSelected?.terminalId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default Terminals
