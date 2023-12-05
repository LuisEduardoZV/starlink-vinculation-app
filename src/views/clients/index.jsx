import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Table,
  TableBody, TableCell, TableContainer,
  TablePagination, TableRow,
  Tooltip,
  Typography, tooltipClasses
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import EnhancedTableHead from '../../ui-components/EnhancedTableHead'
import LoadingInfoTable from '../../ui-components/LoadingInfoTable'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import Add from './Add'
import Edit from './Edit'
import Row from './Row'

// services
import { apiCall } from '../../contexts/api'
import { getComparator, stableSort } from '../../services/tableServices'

import { BASE_URL_API } from '../../config'

const headCells = [
  {
    id: 'clientNumber',
    label: '# Cliente'
  },
  {
    id: 'clientTaxId',
    label: 'CURP / ID'
  },
  {
    id: 'clientName',
    label: 'Nombre del cliente'
  },
  {
    id: 'clientEmail',
    label: 'E-mail'
  },
  {
    id: 'clientPhone',
    label: 'Teléfono'
  },
  {
    id: 'isEnabled',
    label: 'Estatus'
  }
]

const CustomTooltipUsers = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow title='Usuarios' placement='right' classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.warning.main
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.warning.main
  }
}))

const CustomTooltipContacts = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow title='Contáctos' placement='right' classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.secondary.main
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.main
  }
}))

const Clients = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('clientNumber')
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
        data = apiCall({ url: `${BASE_URL_API}/Clients/${id}`, method: 'DELETE' })
      } catch (error) {
        return resolve({ status: 500, data: null })
      }
      return resolve({ status: data ? 200 : 404, data })
    })

    toast.promise(promise, {
      loading: 'Procesando...',
      success: () => {
        handleCancel('', true)
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

  useEffect(() => {
    if (user && user.user && !user.user.isPowerUser) {
      navigate(`/clients/${user.user.clientId}/users`, { replace: true })
    }
    (async () => {
      try {
        setLoading(true)
        const res = await apiCall({ url: `${BASE_URL_API}/Clients` })
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
  }, [forceRender, user])

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
        extraBtns={[
          <CustomTooltipUsers key='usersbtn'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/users`) }}>
              <AccountCircleTwoToneIcon color='warning' />
            </IconButton>
          </CustomTooltipUsers>,
          <CustomTooltipContacts key='contactbtn'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/contacts`) }}>
              <ContactPhoneTwoToneIcon color='secondary' />
            </IconButton>
          </CustomTooltipContacts>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%', position: 'relative' }}>
        <Fade in={!collapsed} mountOnEnter unmountOnExit>
          <Box flex={1}>
            <MainMirrorCard>
              <TableContainer sx={{ maxWidth: '100%' }}>
                <Table sx={{ maxWidth: '100%', '& .MuiTableCell-root': { borderColor: (theme) => theme.palette.grey[800] } }} aria-labelledby='tableTitle' size='medium'>
                  {!loading && data.length === 0 && <caption>No se han encotrado datos</caption>}
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
            </MainMirrorCard>
          </Box>
        </Fade>
        <Fade in={collapsed} sx={{ flex: 1, bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), py: 2, px: 3, borderRadius: 2, boxShadow: (theme) => theme.shadows[10], color: 'white', maxWidth: '100%', mb: 3, backdropFilter: 'blur(10px)', border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`, minHeight: 300, transition: 'height 0.3s ease-in-out', position: 'absolute', width: '80%' }}>
          <Box position='relative'>
            {view ? <Add handleCancel={handleCancel} data={data} setData={setData} /> : <Edit handleCancel={handleCancel} selected={selected[0]} data={data} setData={setData} />}
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
                <b>¿Estás seguro de eliminar al cliente {dataSelected?.clientName}?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
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
