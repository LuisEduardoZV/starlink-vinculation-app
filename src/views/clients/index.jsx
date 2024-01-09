/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
import { Box, IconButton } from '@mui/material'

// project imports
import { useDispatch, useSelector } from '../../store'
import { deleteClient, getAllClients, resetErrorUsed, setClientInfo } from '../../store/slices/clients'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import MainMirrorFade from '../../ui-components/MainMirrorFade'
import ModalDelete from '../../ui-components/ModalDelete'
import Add from './Add'
import ClientsTable from './ClientsTable'
import Edit from './Edit'

const toastId = toast()

const Clients = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { list, error, success } = useSelector((state) => state.clients)

  const [mainData, setMainData] = useState(list)
  const [data, setData] = useState(mainData)

  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const [view, setView] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  const [open, setOpen] = useState(false)

  const handleCancel = async (e) => {
    dispatch(setClientInfo())
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

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async (id) => {
    toast.loading('Cargando...', { id: toastId })
    dispatch(deleteClient(id))
    if (success) toast.success('El cliente ha sido eliminado correctamente', { id: toastId })
    handleCancel()
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
            available[i].clientName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].clientTaxId.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].clientEmail.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].clientNumber.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].clientAddress.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].clientPhone.toLowerCase().includes(filters[j].trim().toLowerCase())
          ) {
            if (!newRows.find((value) => value === available[i])) { newRows.push(available[i]) }
          }
        }
      }
      setData(newRows)
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      dispatch(getAllClients())
      setLoading(false)
    })()

    return () => {
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    setData(list)
    setMainData(list)
    dispatch(setClientInfo())
  }, [list])

  useEffect(() => {
    if (error) {
      toast.error(error?.message, { id: toastId })
      dispatch(resetErrorUsed())
    }
  }, [error])

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
          <CustomTooltipBtns key='usersbtn' type='rose' title='Usuarios'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/users`, { state: { client: dataSelected?.clientName } }) }}>
              <AccountCircleTwoToneIcon color='rose' />
            </IconButton>
          </CustomTooltipBtns>,
          <CustomTooltipBtns key='contactbtn' type='secondary' title='Contactos'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/contacts`) }}>
              <ContactPhoneTwoToneIcon color='secondary' />
            </IconButton>
          </CustomTooltipBtns>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%', position: 'relative' }}>
        <MainMirrorFade open={!collapsed}>
          <ClientsTable
            loading={loading}
            data={data}
            selected={selected}
            setDataSelected={setDataSelected}
            setSelected={setSelected}
            setView={setView}
          />
        </MainMirrorFade>
        <MainMirrorFade open={collapsed} sx={{ position: 'absolute', width: '80%' }}>
          {view ? <Add handleCancel={handleCancel} toastId={toastId} /> : <Edit handleCancel={handleCancel} selected={selected[0]} toastId={toastId} />}
        </MainMirrorFade>
      </Box>

      {
        dataSelected &&
          <ModalDelete
            title='Eliminar cliente'
            subtitle={<><b>¿Estás seguro de eliminar al cliente {dataSelected?.clientName}?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
            handleClose={handleClose}
            handleDelete={handleDelete}
            open={open}
            id={dataSelected?.clientId}
          />
      }
    </>
  )
}

export default Clients
