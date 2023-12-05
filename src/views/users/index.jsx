import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
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
  TablePagination, TableRow,
  Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideBackButton from '../../ui-components/AsideBackButton'
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import InputSearch from '../../ui-components/InputSearch'
import LoadingInfoTable from '../../ui-components/LoadingInfoTable'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'
import Add from './Add'
import Edit from './Edit'
import Row from './Row'

// services
import { apiCall } from '../../contexts/api'
import { getComparator, stableSort } from '../../services/tableServices'

import { BASE_URL_API } from '../../config'

const headCells = [
  {
    id: 'fullName',
    label: 'Nombre'
  },
  {
    id: 'email',
    label: 'E-mail'
  },
  {
    id: 'isAdmin',
    label: 'Tipo de usuario'
  },
  {
    id: 'isEnabled',
    label: 'Estatus'
  },
  {
    id: 'actions',
    label: 'Acciones'
  }
]

const UserList = () => {
  const { user } = useAuth()

  const navigate = useNavigate()
  const { clientId } = useParams()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('fullName')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [loading, setLoading] = useState(true)

  const [dataSelected, setDataSelected] = useState(null)

  const [view, setView] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  const [open, setOpen] = useState(false)

  const [forceRender, setForceRender] = useState(null)

  const handleCancel = async (e, needRender) => {
    setView(null)
    setCollapsed(false)
    setDataSelected(null)
    setOpen(false)
    if (needRender) {
      await setForceRender(Math.random() * 9999)
    }
  }

  const handleAdd = (row) => {
    setDataSelected(row)
    setCollapsed(current => !current)
    setView(1)
  }

  const handleEdit = (row) => {
    setDataSelected(row)
    setCollapsed(current => !current)
    setView(0)
  }

  const handleClickOpen = (row) => {
    setDataSelected(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (id) => {
    const promise = () => new Promise((resolve) => {
      let data = null
      try {
        data = apiCall({ url: `${BASE_URL_API}/Users/${id}`, method: 'DELETE' })
      } catch (error) {
        return resolve({ status: 500, data: null })
      }
      return resolve({ status: data ? 200 : 404, data })
    })

    toast.promise(promise, {
      loading: 'Procesando...',
      success: () => {
        handleCancel('', true)
        return 'El usuario ha sido eliminado correctamente'
      },
      error: 'Error al eliminar el usuario'
    })
  }

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setData(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i].fullName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].email.toLowerCase().includes(filters[j].trim().toLowerCase())
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  const visibleRows = useMemo(
    () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  )

  useEffect(() => {
    if (!clientId) { navigate(-1) }
    (async () => {
      try {
        setLoading(true)
        const res = await apiCall({ url: `${BASE_URL_API}/getClientUser?id=${clientId}` })
        setMainData(res)
        setData(res)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setLoading(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRender, clientId])

  return (
    <>
      {user?.user?.isPowerUser && <AsideBackButton inFade={collapsed} handleBack={collapsed ? handleCancel : null} />}

      <Box sx={{ display: 'flex', flex: 1, px: '10%', position: 'relative', flexDirection: 'column' }}>
        <Fade in={!collapsed} unmountOnExit mountOnEnter>
          <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography color='white' variant='h2'>Lista de usuarios</Typography>
            </Box>
            <Box minWidth='40%'>
              <InputSearch handleSearch={handleSearch} />
            </Box>
            <Box>
              <Button variant='contained' color='info' size='small' startIcon={<PersonAddTwoToneIcon />} onClick={handleAdd}>Agregar</Button>
            </Box>
          </MainMirrorCard>
        </Fade>
        <Fade in={!collapsed} mountOnEnter unmountOnExit>
          <Box flex={1}>
            <MainMirrorCard>
              <TableContainer sx={{ maxWidth: '100%' }}>
                <Table sx={{ maxWidth: '100%', '& .MuiTableCell-root': { borderColor: (theme) => theme.palette.grey[800] } }} aria-labelledby='tableTitle' size='medium'>
                  {!loading && data.length === 0 && <caption><NoInfoOverlay /></caption>}
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
                        const labelId = `enhanced-table-checkbox-${row.userId}`

                        return (
                          <Row
                            key={labelId}
                            element={row}
                            page={page}
                            onEdit={handleEdit}
                            onDelete={handleClickOpen}
                          />
                        )
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * 5
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
            </MainMirrorCard>
          </Box>
        </Fade>
        <Fade in={collapsed} sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out', position: 'absolute', width: '80%' }}>
          <Box position='relative'>
            {view ? <Add handleReset={handleCancel} client={clientId} backBtn={user?.user?.isPowerUser === 0} /> : <Edit handleReset={handleCancel} data={dataSelected} backBtn={user?.user?.isPowerUser === 0} />}
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
                {data.length === 1 ? 'Precaución!' : 'Eliminar usuario'}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.grey[500] }}>
                <b>¿Estás seguro de eliminar al usuario {dataSelected?.fullName} <i>({dataSelected?.email})</i>?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(dataSelected?.userId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default UserList
