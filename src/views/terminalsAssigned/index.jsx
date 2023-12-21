import { useEffect, useState } from 'react'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import { Box } from '@mui/material'

// project imports
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import TableTerminals from './components/TableTerminals'

// services
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'

const TerminalsAssigned = () => {
  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setData(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i]?.fullName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i]?.dashboardName?.toLowerCase()?.includes(filters[j].trim().toLowerCase()) ||
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

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall({ url: `${BASE_URL_API}/getAsigment` })
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
  }, [])

  return (
    <>
      <AsideMenuCrud
        inFade={false}
        dataSelected={dataSelected}
        addIcon={LeakAddTwoToneIcon}
        handleSearch={handleSearch}
        btnsAvailable={false}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <MainMirrorCard>
          <TableTerminals
            loading={loading}
            data={data}
            selected={selected}
            handleClick={handleClick}
          />
        </MainMirrorCard>
      </Box>
    </>
  )
}

export default TerminalsAssigned
