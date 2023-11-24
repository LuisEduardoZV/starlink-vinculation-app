import { useMemo, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
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
import Row from './Row'

// services
import { getComparator, stableSort } from '../../services/tableServices'

const mainData = [
  {
    UserId: '1',
    ClientId: '7',
    FullName: 'John Doe',
    Email: 'johndoe@example.com',
    Password: 'password123',
    IsEnabled: '1'
  },
  {
    UserId: '2',
    ClientId: '4',
    FullName: 'Jane Smith',
    Email: 'janesmith@example.com',
    Password: 'pass456',
    IsEnabled: '1'
  },
  {
    UserId: '3',
    ClientId: '9',
    FullName: 'Mike Johnson',
    Email: 'mikejohnson@example.com',
    Password: 'abc123',
    IsEnabled: '0'
  },
  {
    UserId: '4',
    ClientId: '2',
    FullName: 'Sarah Williams',
    Email: 'sarahwilliams@example.com',
    Password: 'qwerty',
    IsEnabled: '1'
  },
  {
    UserId: '5',
    ClientId: '12',
    FullName: 'Chris Brown',
    Email: 'chrisbrown@example.com',
    Password: 'ilovecats',
    IsEnabled: '1'
  },
  {
    UserId: '6',
    ClientId: '3',
    FullName: 'Emily Davis',
    Email: 'emilydavis@example.com',
    Password: 'password123',
    IsEnabled: '0'
  },
  {
    UserId: '7',
    ClientId: '6',
    FullName: 'David Wilson',
    Email: 'davidwilson@example.com',
    Password: 'pass789',
    IsEnabled: '1'
  }
]

const headCells = [
  {
    id: 'ClientId',
    label: 'Cliente'
  },
  {
    id: 'Email',
    label: 'Correo eletrónico'
  },
  {
    id: 'FullName',
    label: 'Nombre completo'
  },
  {
    id: 'isEnabled',
    label: 'Estatus'
  }
]

const Users = () => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('ClientNumber')
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
        const index = data.indexOf(data.find(({ ClientId }) => (ClientId === id)))
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
            available[i].ClientName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].ClientNumber.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].ClientAddress.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].ClientPhone.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].ClientEmail.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].ClientTaxId.toLowerCase().includes(filters[j].trim().toLowerCase())
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
      const index = data.map((row) => row.ClientId).indexOf(id)
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
        addIcon={PersonAddAltTwoToneIcon}
        handleSearch={handleSearch}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Fade in={!collapsed} mountOnEnter unmountOnExit sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out' }}>
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
                    const isItemSelected = isSelected(row.ClientId)
                    const labelId = `enhanced-table-checkbox-${row.ClientId}`

                    return (
                      <Row
                        key={labelId}
                        element={row}
                        handleClick={(event) => handleClick(event, row.ClientId)}
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
            {/* view ? <Add handleCancel={handleCancel} data={data} setData={setData} /> : <Edit handleCancel={handleCancel} selected={dataSelected} data={data} setData={setData} /> */}
            <Add handleCancel={handleCancel} data={data} setData={setData} />
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
                Eliminar cliente
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.grey[500] }}>
                <Typography component='div' color='inherit'>
                  <b>¿Estás seguro de eliminar al cliente {dataSelected?.name}?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(dataSelected?.ClientId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default Users
