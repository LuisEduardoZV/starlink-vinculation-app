/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'

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
import { useDispatch, useSelector } from '../../store'
import { getAllTerminals, getTerminalsByClient, modifyTerminal, resetErrorUsed } from '../../store/slices/terminals'

const toastId = toast()

const Terminals = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { terminals, error, loading, success } = useSelector((state) => state.terminals)

  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const isSuperUser = useMemo(() => ((user && user.user) ? user.user.isPowerUser === 1 : false), [user])

  const getInfo = () => {
    if (user) {
      if (user.user.isPowerUser) {
        dispatch(getAllTerminals())
      } else {
        dispatch(getTerminalsByClient(user?.user?.clientId))
      }
    }
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
    dispatch(modifyTerminal(info, !(user.user.isPowerUser), user.user.clientId))
    if (success) toast.success('Se ha actualizado la información', { id })
  }

  useEffect(() => {
    setMainData(terminals)
    setData(terminals)
  }, [terminals])

  useEffect(() => {
    (async () => {
      getInfo()
    })()
  }, [user])

  useEffect(() => {
    if (error) {
      toast.error(error?.message, { id: toastId })
      dispatch(resetErrorUsed())
    }
  }, [error])

  return (
    <>
      <AsideMenuCrud
        inFade={false}
        dataSelected={dataSelected}
        addIcon={LeakAddTwoToneIcon}
        handleSearch={handleSearch}
        btnsAvailable={false}
        extraBtns={[<CustomTooltipBtns key='btnRefresh' type='secondary' title='Actualizar'><IconButton onClick={() => getInfo()}><RefreshTwoToneIcon sx={{ color: 'primary.dark' }} /></IconButton></CustomTooltipBtns>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <MainMirrorCard>
          <TableTerminals
            loading={loading}
            data={data}
            selected={selected}
            handleClick={handleClick}
            handleSave={handleSave}
            isSuperUser={isSuperUser}
          />
        </MainMirrorCard>
      </Box>
    </>
  )
}

export default Terminals
