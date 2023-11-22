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
    name: 'ABC Company',
    operator: 'John Doe',
    position: 'CEO',
    user: 'johndoe',
    password: 'password123',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    clientId: '1'
  },
  {
    name: 'XYZ Corporation',
    operator: 'Jane Smith',
    position: 'CFO',
    user: 'janesmith',
    password: 'pass456',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    clientId: '2'
  },
  {
    name: '123 Industries',
    operator: 'Mike Johnson',
    position: 'CTO',
    user: 'mikejohnson',
    password: 'wordpass789',
    email: 'mikejohnson@example.com',
    phone: '555-123-4567',
    clientId: '3'
  },
  {
    name: 'Acme Co.',
    operator: 'Sarah Williams',
    position: 'COO',
    user: 'sarahwilliams',
    password: 'acmepass',
    email: 'sarahwilliams@example.com',
    phone: '888-999-0000',
    clientId: '4'
  },
  {
    name: 'Global Corp.',
    operator: 'Robert Brown',
    position: 'CIO',
    user: 'robertbrown',
    password: 'global123',
    email: 'robertbrown@example.com',
    phone: '111-222-3333',
    clientId: '5'
  },
  {
    name: 'Tech Solutions',
    operator: 'Lisa Davis',
    position: 'Manager',
    user: 'lisadavis',
    password: 'techpass',
    email: 'lisadavis@example.com',
    phone: '444-555-6666',
    clientId: '6'
  },
  {
    name: 'Innovative Inc.',
    operator: 'Mark Wilson',
    position: 'Director',
    user: 'markwilson',
    password: 'innovate789',
    email: 'markwilson@example.com',
    phone: '777-888-9999',
    clientId: '7'
  },
  {
    name: 'Alpha Enterprises',
    operator: 'Emily Taylor',
    position: 'Supervisor',
    user: 'emilytaylor',
    password: 'alpha456',
    email: 'emilytaylor@example.com',
    phone: '222-333-4444',
    clientId: '8'
  },
  {
    name: 'Beta Corp.',
    operator: 'David Anderson',
    position: 'Analyst',
    user: 'davidanderson',
    password: 'betapass',
    email: 'davidanderson@example.com',
    phone: '555-666-7777',
    clientId: '9'
  },
  {
    name: 'Gamma Ltd.',
    operator: 'Olivia Martinez',
    position: 'Engineer',
    user: 'oliviamartinez',
    password: 'gamma123',
    email: 'oliviamartinez@example.com',
    phone: '888-999-0000',
    clientId: '10'
  },
  {
    name: 'Delta Systems',
    operator: 'Daniel Brown',
    position: 'Developer',
    user: 'danielbrown',
    password: 'deltapass',
    email: 'danielbrown@example.com',
    phone: '111-222-3333',
    clientId: '11'
  },
  {
    name: 'Sigma Solutions',
    operator: 'Sophia Clark',
    position: 'Manager',
    user: 'sophiaclark',
    password: 'sigma789',
    email: 'sophiaclark@example.com',
    phone: '444-555-6666',
    clientId: '12'
  },
  {
    name: 'Omega Tech',
    operator: 'Matthew Davis',
    position: 'Director',
    user: 'matthewdavis',
    password: 'omega456',
    email: 'matthewdavis@example.com',
    phone: '777-888-9999',
    clientId: '13'
  },
  {
    name: 'Nu Enterprises',
    operator: 'Ava Johnson',
    position: 'Supervisor',
    user: 'avajohnson',
    password: 'nu123',
    email: 'avajohnson@example.com',
    phone: '222-333-4444',
    clientId: '14'
  },
  {
    name: 'Zeta Corp.',
    operator: 'James Wilson',
    position: 'Analyst',
    user: 'jameswilson',
    password: 'zeta456',
    email: 'jameswilson@example.com',
    phone: '555-666-7777',
    clientId: '15'
  },
  {
    name: 'Epsilon Ltd.',
    operator: 'Chloe Taylor',
    position: 'Engineer',
    user: 'chloetaylor',
    password: 'epsilon789',
    email: 'chloetaylor@example.com',
    phone: '888-999-0000',
    clientId: '16'
  },
  {
    name: 'Iota Systems',
    operator: 'Liam Smith',
    position: 'Developer',
    user: 'liamsmith',
    password: 'iota123',
    email: 'liamsmith@example.com',
    phone: '111-222-3333',
    clientId: '17'
  },
  {
    name: 'Kappa Solutions',
    operator: 'Emma Brown',
    position: 'Manager',
    user: 'emmabrown',
    password: 'kappa456',
    email: 'emmabrown@example.com',
    phone: '444-555-6666',
    clientId: '18'
  },
  {
    name: 'Theta Tech',
    operator: 'Noah Clark',
    position: 'Director',
    user: 'noahclark',
    password: 'theta789',
    email: 'noahclark@example.com',
    phone: '777-888-9999',
    clientId: '19'
  },
  {
    name: 'Lambda Enterprises',
    operator: 'Mia Johnson',
    position: 'Supervisor',
    user: 'miajohnson',
    password: 'lambda123',
    email: 'miajohnson@example.com',
    phone: '222-333-4444',
    clientId: '20'
  },
  {
    name: 'Rho Corp.',
    operator: 'Logan Wilson',
    position: 'Analyst',
    user: 'loganwilson',
    password: 'rho456',
    email: 'loganwilson@example.com',
    phone: '555-666-7777',
    clientId: '21'
  },
  {
    name: 'Tau Ltd.',
    operator: 'Amelia Taylor',
    position: 'Engineer',
    user: 'ameliataylor',
    password: 'tau789',
    email: 'ameliataylor@example.com',
    phone: '888-999-0000',
    clientId: '22'
  },
  {
    name: 'Upsilon Systems',
    operator: 'Ethan Brown',
    position: 'Developer',
    user: 'ethanbrown',
    password: 'upsilon123',
    email: 'ethanbrown@example.com',
    phone: '111-222-3333',
    clientId: '23'
  },
  {
    name: 'Phi Solutions',
    operator: 'Oliver Clark',
    position: 'Manager',
    user: 'oliverclark',
    password: 'phi456',
    email: 'oliverclark@example.com',
    phone: '444-555-6666',
    clientId: '24'
  },
  {
    name: 'Chi Tech',
    operator: 'Aria Johnson',
    position: 'Director',
    user: 'ariajohnson',
    password: 'chi789',
    email: 'ariajohnson@example.com',
    phone: '777-888-9999',
    clientId: '25'
  },
  {
    name: 'Psi Enterprises',
    operator: 'Elijah Wilson',
    position: 'Supervisor',
    user: 'elijahwilson',
    password: 'psi123',
    email: 'elijahwilson@example.com',
    phone: '222-333-4444',
    clientId: '26'
  },
  {
    name: 'Omega Corp.',
    operator: 'Avery Taylor',
    position: 'Analyst',
    user: 'averytaylor',
    password: 'omega456',
    email: 'averytaylor@example.com',
    phone: '555-666-7777',
    clientId: '27'
  },
  {
    name: 'Zeta Ltd.',
    operator: 'Scarlett Martinez',
    position: 'Engineer',
    user: 'scarlettmartinez',
    password: 'zeta789',
    email: 'scarlettmartinez@example.com',
    phone: '888-999-0000',
    clientId: '28'
  },
  {
    name: 'Epsilon Systems',
    operator: 'Benjamin Brown',
    position: 'Developer',
    user: 'benjaminbrown',
    password: 'epsilon123',
    email: 'benjaminbrown@example.com',
    phone: '111-222-3333',
    clientId: '29'
  },
  {
    name: 'Iota Solutions',
    operator: 'Grace Clark',
    position: 'Manager',
    user: 'graceclark',
    password: 'iota456',
    email: 'graceclark@example.com',
    phone: '444-555-6666',
    clientId: '30'
  }
]

const headCells = [
  {
    id: 'name',
    label: 'Nombre de la empresa',
    width: '40%'
  },
  {
    id: 'operator',
    label: 'Operador',
    width: '30%'
  },
  {
    id: 'position',
    label: 'Cargo',
    width: '10%'
  },
  {
    id: 'user',
    label: 'Usuario',
    width: '20%'
  }
]

const Clients = () => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
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
        const index = data.indexOf(data.find(({ clientId }) => (clientId === id)))
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
      <AsideMenuCrud
        inFade={collapsed}
        dataSelected={dataSelected}
        view={view} handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleOpenDelete={handleClickOpen}
        addIcon={GroupAddTwoToneIcon}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Fade in={!collapsed} sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out' }}>
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
              <Button onClick={() => handleDelete(dataSelected?.clientId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default Clients
