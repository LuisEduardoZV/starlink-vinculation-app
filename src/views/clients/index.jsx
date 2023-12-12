import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
import { Box, Fade, IconButton } from '@mui/material'

// project imports
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import ModalDelete from '../../ui-components/ModalDelete'
import Add from './Add'
import ClientsTable from './ClientsTable'
import Edit from './Edit'

// services
import { apiCall } from '../../contexts/api'

import { BASE_URL_API } from '../../config'

const Clients = () => {
  const navigate = useNavigate()

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

  const handleClose = () => {
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

  useEffect(() => {
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
  }, [forceRender])

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
          <CustomTooltipBtns key='usersbtn' type='warning' title='Usuarios'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/users`) }}>
              <AccountCircleTwoToneIcon color='warning' />
            </IconButton>
          </CustomTooltipBtns>,
          <CustomTooltipBtns key='contactbtn' type='secondary' title='Contactos'>
            <IconButton onClick={() => { navigate(`/clients/${selected[0]}/contacts`) }}>
              <ContactPhoneTwoToneIcon color='secondary' />
            </IconButton>
          </CustomTooltipBtns>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%', position: 'relative' }}>
        <Fade in={!collapsed} mountOnEnter unmountOnExit>
          <Box flex={1}>
            <ClientsTable
              loading={loading}
              data={data}
              selected={selected}
              setDataSelected={setDataSelected}
              setSelected={setSelected}
              setView={setView}
            />
          </Box>
        </Fade>
        <Fade in={collapsed} sx={{ position: 'absolute', width: '80%' }}>
          <Box>
            <MainMirrorCard sx={{ position: 'relative' }}>
              {view ? <Add handleCancel={handleCancel} data={data} setData={setData} /> : <Edit handleCancel={handleCancel} selected={selected[0]} data={data} setData={setData} />}
            </MainMirrorCard>
          </Box>
        </Fade>
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
