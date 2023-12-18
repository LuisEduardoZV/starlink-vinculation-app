import { useEffect, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'
import { Box, IconButton } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import TableTerminals from './components/TableTerminals'

// services
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'

const Terminals = () => {
  const { user } = useAuth()

  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const [forceRender, setForceRender] = useState(false)

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setData(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i]?.serviceLineNumber.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i]?.terminalFriendlyName?.toLowerCase()?.includes(filters[j].trim().toLowerCase()) ||
            available[i]?.terminalKitNumber.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i]?.terminalLineOfService.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i]?.terminalSerialNumber.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i]?.terminalSiteName.toLowerCase().includes(filters[j].trim().toLowerCase())
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
    } else {
      setSelected([id])
      const index = data.map((row) => row.terminalId).indexOf(id)
      setDataSelected(data[index])
    }
  }

  const handleSave = async (info) => {
    const id = toast.loading('Cargando...')
    try {
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Terminals/${info.terminalId}`, method: 'PUT', body: JSON.stringify(info) })
      if (!res) throw new Error('Hubo un error al guardar los datos, inténtelo mas tarde')
      else toast.success('Se ha actualizado la información', { id })
    } catch (error) {
      console.log(error)
      toast.error(error.message, { id })
    }
    setForceRender((prev) => !prev)
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

        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error('Error al recibir la información, intente actualizar la página')
      }
    })()

    return () => {
      setLoading(true)
    }
  }, [forceRender, user])

  return (
    <>
      <AsideMenuCrud
        inFade={false}
        dataSelected={dataSelected}
        addIcon={LeakAddTwoToneIcon}
        handleSearch={handleSearch}
        btnsAvailable={false}
        extraBtns={[<CustomTooltipBtns key='btnRefresh' type='secondary' title='Actualizar'><IconButton onClick={() => setForceRender((prev) => !prev)}><RefreshTwoToneIcon color='secondary' /></IconButton></CustomTooltipBtns>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <MainMirrorCard>
          <TableTerminals
            loading={loading}
            data={data}
            selected={selected}
            handleClick={handleClick}
            handleSave={handleSave}
          />
        </MainMirrorCard>
      </Box>
    </>
  )
}

export default Terminals
