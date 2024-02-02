/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'
import { Box, IconButton, Typography } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import ModalDelete from '../../ui-components/ModalDelete'
import TableTerminals from './components/TableTerminals'
// import ViewByClient from './components/ViewByClient'

// services
import { useDispatch, useSelector } from '../../store'
import { getAllTerminals, getTerminalsByClient, modifyTerminal, resetErrorUsed, unlickTerminalWithClient } from '../../store/slices/terminals'

const toastId = toast()

const Terminals = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { state } = useLocation()

  const { terminals, error, loading, success, successMsg } = useSelector((state) => state.terminals)

  const [mainData, setMainData] = useState([])
  const [data, setData] = useState(mainData)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const [open, setOpen] = useState(false)

  const isSuperUser = useMemo(() => ((user && user.user) ? user.user.isPowerUser === 1 : false), [user])

  // const viewType = useMemo(() => ((state && state.viewByClient) ? 1 : 0), [state])

  const clientName = useMemo(() => ((state && state.client) ? state.client : null), [state])

  const getInfo = () => {
    if (user) {
      if (user.user.isPowerUser) {
        if (state && state.viewByClient) dispatch(getTerminalsByClient(state.viewByClient))
        else dispatch(getAllTerminals())
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

  const handleClickOpenModal = (terminal, terminalId) => {
    handleClick(terminalId)
    setDataSelected(terminal)
    setOpen(true)
  }

  const handleClickCloseModal = () => {
    setOpen(false)
  }

  const handleSave = async (info) => {
    toast.loading('Cargando...', { id: toastId })
    dispatch(modifyTerminal(info, !(user.user.isPowerUser), user.user.clientId))
  }

  const handleUnlick = async () => {
    toast.loading('Cargando...', { id: toastId })
    if (dataSelected && dataSelected.clientTerminal_Id && state && state.viewByClient) {
      dispatch(unlickTerminalWithClient(dataSelected.clientTerminal_Id, state.viewByClient))
      handleClickCloseModal()
    } else toast.error('Error interno', { id: toastId })
  }

  useEffect(() => {
    setMainData(terminals)
    setData(terminals)
  }, [terminals])

  useEffect(() => {
    (async () => {
      getInfo()
    })()
  }, [user, state])

  useEffect(() => {
    if (error) {
      toast.error(error?.message, { id: toastId })
      dispatch(resetErrorUsed())
    }
  }, [error])

  useEffect(() => {
    if (success && successMsg) {
      toast.success(successMsg, { id: toastId })
      dispatch(resetErrorUsed())
    }
  }, [success, successMsg])

  return (
    <>
      <AsideMenuCrud
        inFade={false}
        dataSelected={dataSelected}
        addIcon={LeakAddTwoToneIcon}
        handleSearch={handleSearch}
        btnsAvailable={false}
        extraBtns={[<CustomTooltipBtns key='btnRefresh' type='primary' title='Actualizar'><IconButton onClick={() => getInfo()}><RefreshTwoToneIcon sx={{ color: 'primary.dark' }} /></IconButton></CustomTooltipBtns>]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <MainMirrorCard>
          {clientName && <Typography variant='h3' py={1} textAlign='right'>Terminales vinculadas del cliente: {clientName}</Typography>}
          <TableTerminals
            loading={loading}
            data={data}
            selected={selected}
            handleClick={handleClick}
            handleSave={handleSave}
            isSuperUser={isSuperUser}
            viewType={state?.viewByClient}
            handleOpen={handleClickOpenModal}
          />
        </MainMirrorCard>
      </Box>

      {
        dataSelected &&
          <ModalDelete
            title='Desvinculación de terminal'
            subtitle={<><b>¿Estás seguro de desvincular la terminal {dataSelected?.terminalKitNumber}?</b></>}
            handleClose={handleClickCloseModal}
            handleDelete={handleUnlick}
            open={open}
            id={dataSelected?.clientId}
          />
      }
    </>
  )
}

export default Terminals
