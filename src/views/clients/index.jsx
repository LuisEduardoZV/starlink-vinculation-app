import { useMemo, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
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
    ClientId: '1',
    ClientNumber: 'ABC123',
    ClientAddress: '123 Main St',
    ClientPhone: '555-1234',
    ClientZip: '12345',
    ClientEmail: 'example@example.com',
    ClientTaxId: 'A1B2C3D4E5F6G7',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ClientName: 'John Doe'
  },
  {
    ClientId: '2',
    ClientNumber: 'DEF456',
    ClientAddress: '456 Elm St',
    ClientPhone: '555-5678',
    ClientZip: '67890',
    ClientEmail: 'example2@example.com',
    ClientTaxId: 'H8I9J0K1L2M3N4',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus.',
    ClientName: 'Jane Smith'
  },
  {
    ClientId: '3',
    ClientNumber: 'GHI789',
    ClientAddress: '789 Oak St',
    ClientPhone: '555-9012',
    ClientZip: '90123',
    ClientEmail: 'example3@example.com',
    ClientTaxId: 'O5P6Q7R8S9T0U1',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
    ClientName: 'Robert Johnson'
  },
  {
    ClientId: '4',
    ClientNumber: 'JKL012',
    ClientAddress: '012 Pine St',
    ClientPhone: '555-3456',
    ClientZip: '23456',
    ClientEmail: 'example4@example.com',
    ClientTaxId: 'V2W3X4Y5Z6A7B8',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh.',
    ClientName: 'Sarah Davis'
  },
  {
    ClientId: '5',
    ClientNumber: 'MNO345',
    ClientAddress: '345 Maple St',
    ClientPhone: '555-7890',
    ClientZip: '56789',
    ClientEmail: 'example5@example.com',
    ClientTaxId: 'C9D8E7F6G5H4I3',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae.',
    ClientName: 'Michael Johnson'
  },
  {
    ClientId: '6',
    ClientNumber: 'PQR678',
    ClientAddress: '678 Cedar St',
    ClientPhone: '555-0123',
    ClientZip: '89012',
    ClientEmail: 'example6@example.com',
    ClientTaxId: 'J2K3L4M5N6O7P8',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc.',
    ClientName: 'Emily Wilson'
  },
  {
    ClientId: '7',
    ClientNumber: 'STU901',
    ClientAddress: '901 Walnut St',
    ClientPhone: '555-2345',
    ClientZip: '34567',
    ClientEmail: 'example7@example.com',
    ClientTaxId: 'Q8R9S0T1U2V3W4',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut.',
    ClientName: 'David Anderson'
  },
  {
    ClientId: '8',
    ClientNumber: 'VWX234',
    ClientAddress: '234 Oak St',
    ClientPhone: '555-5678',
    ClientZip: '45678',
    ClientEmail: 'example8@example.com',
    ClientTaxId: 'X5Y6Z7A8B9C0D1',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse.',
    ClientName: 'Catherine Thompson'
  },
  {
    ClientId: '9',
    ClientNumber: 'YZA567',
    ClientAddress: '567 Pine St',
    ClientPhone: '555-8901',
    ClientZip: '56789',
    ClientEmail: 'example9@example.com',
    ClientTaxId: 'E2F3G4H5I6J7K8',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce.',
    ClientName: 'Christopher Wilson'
  },
  {
    ClientId: '10',
    ClientNumber: 'BCD890',
    ClientAddress: '890 Elm St',
    ClientPhone: '555-2345',
    ClientZip: '34567',
    ClientEmail: 'example10@example.com',
    ClientTaxId: 'K6L7M8N9O0P1Q2',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas.',
    ClientName: 'Michelle Davis'
  },
  {
    ClientId: '11',
    ClientNumber: 'CDE901',
    ClientAddress: '901 Cedar St',
    ClientPhone: '555-6789',
    ClientZip: '90123',
    ClientEmail: 'example11@example.com',
    ClientTaxId: 'R2S3T4U5V6W7X8',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas. Integer.',
    ClientName: 'Daniel Johnson'
  },
  {
    ClientId: '12',
    ClientNumber: 'EFG234',
    ClientAddress: '234 Walnut St',
    ClientPhone: '555-9012',
    ClientZip: '23456',
    ClientEmail: 'example12@example.com',
    ClientTaxId: 'Y5Z6A7B8C9D0E1',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas. Integer. Proin.',
    ClientName: 'Sophia Wilson'
  },
  {
    ClientId: '13',
    ClientNumber: 'FGH567',
    ClientAddress: '567 Oak St',
    ClientPhone: '555-2345',
    ClientZip: '67890',
    ClientEmail: 'example13@example.com',
    ClientTaxId: 'F2G3H4I5J6K7L8',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas. Integer. Proin. Aliquam.',
    ClientName: 'Olivia Davis'
  }
]

const headCells = [
  {
    id: 'ClientNumber',
    label: '# Cliente'
  },
  {
    id: 'ClientTaxId',
    label: 'CURP / ID'
  },
  {
    id: 'ClientName',
    label: 'Nombre del cliente'
  },
  {
    id: 'ClientEmail',
    label: 'E-mail'
  },
  {
    id: 'ClientPhone',
    label: 'Teléfono'
  },
  {
    id: 'isEnabled',
    label: 'Estatus'
  }
]

const Clients = () => {
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
        addIcon={GroupAddTwoToneIcon}
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

export default Clients
