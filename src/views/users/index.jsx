import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import { Box, Fade } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideBackButton from '../../ui-components/AsideBackButton'
import HeaderSearchBox from '../../ui-components/HeaderSearchBox'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import ModalDelete from '../../ui-components/ModalDelete'
import Add from './Add'
import Edit from './Edit'
import UserTable from './components/UserTable'

// services
import { apiCall } from '../../contexts/api'

import { BASE_URL_API } from '../../config'

const UserList = () => {
  const { user } = useAuth()

  const navigate = useNavigate()
  const { clientId } = useParams()

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!clientId) { navigate(-1) } }, [clientId])

  useEffect(() => {
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
  }, [forceRender])

  return (
    <>
      {user?.user?.isPowerUser && <AsideBackButton inFade={collapsed} handleBack={collapsed ? handleCancel : null} />}

      <Box sx={{ display: 'flex', flex: 1, px: '10%', position: 'relative', flexDirection: 'column' }}>
        <Fade in={!collapsed} unmountOnExit mountOnEnter>
          <HeaderSearchBox title='Lista de usuarios' handleOnAdd={handleAdd} handleSearch={handleSearch} />
        </Fade>
        <Fade in={!collapsed} mountOnEnter unmountOnExit>
          <UserTable
            loading={loading}
            data={data}
            handleClickOpen={handleClickOpen}
            handleEdit={handleEdit}
          />
        </Fade>
        <Fade in={collapsed} sx={{ position: 'absolute', width: '80%' }}>
          <MainMirrorCard sx={{ position: 'relative' }}>
            {view ? <Add handleReset={handleCancel} client={clientId} backBtn={user?.user?.isPowerUser === 0} /> : <Edit handleReset={handleCancel} data={dataSelected} backBtn={user?.user?.isPowerUser === 0} />}
          </MainMirrorCard>
        </Fade>
      </Box>

      {
        dataSelected &&
          <ModalDelete
            title={data.length === 1 ? 'Precaución!' : 'Eliminar usuario'}
            subtitle={<><b>¿Estás seguro de eliminar al usuario {dataSelected?.fullName} <i>({dataSelected?.email})</i>?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
            handleClose={handleClose}
            handleDelete={handleDelete}
            open={open}
            id={dataSelected?.userId}
          />
      }
    </>
  )
}

export default UserList
