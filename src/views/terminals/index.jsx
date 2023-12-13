import { useEffect, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import { Box } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import MainMirrorFade from '../../ui-components/MainMirrorFade'
import ModalDelete from '../../ui-components/ModalDelete'
import Add from './Add'
import Edit from './Edit'
import TableTerminals from './components/TableTerminals'

// services
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'

const Terminals = () => {
  const { user } = useAuth()

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
        <MainMirrorFade open={!collapsed}>
          <TableTerminals
            loading={loading}
            data={data}
            selected={selected}
            handleClick={handleClick}
          />
        </MainMirrorFade>
        <MainMirrorFade open={collapsed} sx={{ position: 'absolute', width: '80%' }}>
          {view ? <Add handleCancel={handleCancel} /> : <Edit handleCancel={handleCancel} selected={dataSelected} />}
        </MainMirrorFade>
      </Box>

      {
        dataSelected &&
          <ModalDelete
            title='Eliminar terminal'
            subtitle={<><b>¿Estás seguro de eliminar la terminal {dataSelected.terminalFriendlyName ?? dataSelected.terminalSiteName} ({dataSelected.terminalSerialNumber})?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
            handleClose={handleClose}
            handleDelete={handleDelete}
            open={open}
            id={dataSelected?.terminalId}
          />
      }
    </>
  )
}

export default Terminals
