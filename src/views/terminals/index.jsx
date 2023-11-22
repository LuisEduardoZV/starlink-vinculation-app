import { useMemo, useState } from 'react'

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
  Fade, Table,
  TableBody, TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import Add from './Add'
import Edit from './Edit'
import Row from './Row'

// services
import { getComparator, stableSort } from '../../services/tableServices'

const mainData = [
  {
    numKit: 'ABCD12345678',
    numAnt: 'EFGH12345678901234',
    serviceLine: 'IJKL12345-MNOPQ67890',
    domain: 'example.com',
    terId: 1,
    friendlyName: 'Antenna 1'
  },
  {
    numKit: 'WXYZ98765432',
    numAnt: 'UVWXYZ123456789012',
    serviceLine: 'RSTUV56789-WXYZA12345',
    domain: 'example.net',
    terId: 2,
    friendlyName: 'Antenna 2'
  },
  {
    numKit: '1234ABCD5678',
    numAnt: 'EFGH56789012345678',
    serviceLine: 'IJKL90123-MNOPQ45678',
    domain: 'example.org',
    terId: 3,
    friendlyName: 'Antenna 3'
  },
  {
    numKit: 'CDEF56781234',
    numAnt: 'GHIJ90123456789012',
    serviceLine: 'KLMN34567-OPQ12R56789',
    domain: 'example.co',
    terId: 4,
    friendlyName: 'Antenna 4'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL34567890123456',
    serviceLine: 'MNOP67890-Q123R45678',
    domain: 'example.io',
    terId: 5,
    friendlyName: 'Antenna 5'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.info',
    terId: 6,
    friendlyName: 'Antenna 6'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.biz',
    terId: 7,
    friendlyName: 'Antenna 7'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.us',
    terId: 8,
    friendlyName: 'Antenna 8'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.co.uk',
    terId: 9,
    friendlyName: 'Antenna 9'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.ca',
    terId: 10,
    friendlyName: 'Antenna 10'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.de',
    terId: 11,
    friendlyName: 'Antenna 11'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.fr',
    terId: 12,
    friendlyName: 'Antenna 12'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.it',
    terId: 13,
    friendlyName: 'Antenna 13'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.es',
    terId: 14,
    friendlyName: 'Antenna 14'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.pt',
    terId: 15,
    friendlyName: 'Antenna 15'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.au',
    terId: 16,
    friendlyName: 'Antenna 16'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.jp',
    terId: 17,
    friendlyName: 'Antenna 17'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.kr',
    terId: 18,
    friendlyName: 'Antenna 18'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.ru',
    terId: 19,
    friendlyName: 'Antenna 19'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.cn',
    terId: 20,
    friendlyName: 'Antenna 20'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.br',
    terId: 21,
    friendlyName: 'Antenna 21'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.mx',
    terId: 22,
    friendlyName: 'Antenna 22'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.ar',
    terId: 23,
    friendlyName: 'Antenna 23'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.in',
    terId: 24,
    friendlyName: 'Antenna 24'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.za',
    terId: 25,
    friendlyName: 'Antenna 25'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.sa',
    terId: 26,
    friendlyName: 'Antenna 26'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.id',
    terId: 27,
    friendlyName: 'Antenna 27'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.ng',
    terId: 28,
    friendlyName: 'Antenna 28'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.pl',
    terId: 29,
    friendlyName: 'Antenna 29'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.tr',
    terId: 30,
    friendlyName: 'Antenna 30'
  }
]

const headCells = [
  {
    id: 'friendlyName',
    label: 'Nombre'
  },
  {
    id: 'domain',
    label: 'Nombre del sitio'
  },
  {
    id: 'serviceLine',
    label: 'Línea de servicio'
  },
  {
    id: 'numKit',
    label: 'Número de kit'
  },
  {
    id: 'numAnt',
    label: 'Número de la terminal'
  }
]

const Terminals = () => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('friendlyName')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [data, setData] = useState(mainData)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const [view, setView] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  const [open, setOpen] = useState(false)

  const handleCancel = () => {
    setView(null)
    setCollapsed(false)
    setDataSelected(null)
    setSelected([])
    setOpen(false)
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
      setTimeout(() => {
        const index = data.indexOf(data.find(({ terId }) => (terId === id)))
        // console.log(index)
        if (index === -1) return resolve({ status: 500 })
        const newData = [...data]
        newData.splice(index, 1)
        setData(newData)
        return resolve({ status: 200 })
      }, 500)
    })

    toast.promise(promise, {
      loading: 'Cargando...',
      success: () => {
        handleCancel()
        return 'El cliente ha sido eliminado correctamente'
      },
      error: 'Error al agregar el cliente'
    })
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
      const index = data.map((row) => row.terId).indexOf(id)
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
      <AsideMenuCrud
        inFade={collapsed}
        dataSelected={dataSelected}
        view={view} handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleOpenDelete={handleClickOpen}
        addIcon={LeakAddTwoToneIcon}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Fade
          in={!collapsed}
          sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out' }}
        >
          <Box>
            <TableContainer sx={{ maxWidth: '100%' }}>
              <Table sx={{ maxWidth: '100%', '& .MuiTableCell-root': { borderColor: (theme) => theme.palette.grey[800] } }} aria-labelledby='tableTitle' size='medium'>
                {data.length === 0 && <caption>No se han encotrado datos</caption>}
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={headCells}
                />
                <TableBody>
                  {visibleRows.map((row) => {
                    const isItemSelected = isSelected(row.terId)
                    const labelId = `enhanced-table-checkbox-${row.terId}`

                    return (
                      <Row
                        key={labelId}
                        element={row}
                        handleClick={(event) => handleClick(event, row.terId)}
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
            {view ? <Add handleCancel={handleCancel} data={data} setData={setData} /> : <Edit handleCancel={handleCancel} selected={dataSelected} data={data} setData={setData} />}
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
                <Typography component='div' color='inherit'>
                  <b>¿Estás seguro de eliminar la terminal {dataSelected?.friendlyName} ({dataSelected?.numAnt})?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(dataSelected?.terId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default Terminals
