/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// third
import { toast } from 'sonner'

// mui imports
import LeakAddTwoToneIcon from '@mui/icons-material/LeakAddTwoTone'
import ReplyAllTwoToneIcon from '@mui/icons-material/ReplyAllTwoTone'
import { Box, IconButton } from '@mui/material'

// project imports
import AsideMenuCrud from '../../ui-components/AsideMenuCrud'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import ModalDelete from '../../ui-components/ModalDelete'
import TableTerminals from './components/TableTerminals'

// services
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import { useDispatch, useSelector } from '../../store'
import { getAllTerminalsAssigned, getTerminalsByUser, resetErrorUsed } from '../../store/slices/terminalsAssigned'

const toastId = toast()

const TerminalsAssigned = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { terminals, error, loading } = useSelector((state) => state.terminalsAssigned)

  const [data, setData] = useState(terminals)

  const [open, setOpen] = useState(false)

  const [selected, setSelected] = useState([])
  const [dataSelected, setDataSelected] = useState(null)

  const handleClose = () => { setOpen(false) }

  const handleDelete = (id, data) => {
    setSelected([id])
    setDataSelected(data)
    setOpen(true)
  }

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setData(terminals)
    } else {
      const newRows = []
      const available = terminals

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i].data?.fullName?.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].data?.dashboardName?.toLowerCase()?.includes(filters[j].trim().toLowerCase()) ||
            available[i].data?.terminalSiteName.toLowerCase().includes(filters[j].trim().toLowerCase())
          ) {
            if (!newRows.find((value) => value === available[i])) { newRows.push(available[i]) }
          }
        }
      }
      console.log(newRows)
      setData(newRows)
    }
  }

  const handleDeleteTerminalAssigned = async () => {
    const toastId = toast.loading('Cargando...')
    try {
      const data = await apiCall({ url: `${BASE_URL_API}/Assigns/${selected[0]}`, method: 'DELETE' })
      if (data) toast.success('Exito al eliminar la vinculación', { id: toastId })
    } catch (error) {
      console.log(error)
      toast.error(error.message, { id: toastId })
    }
    setOpen(false)
  }

  useEffect(() => {
    setData(terminals)
  }, [terminals])

  useEffect(() => {
    (async () => {
      if (state && state.userId) {
        dispatch(getTerminalsByUser(state.userId))
      } else {
        dispatch(getAllTerminalsAssigned())
      }
    })()
  }, [state])

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
        extraBtns={[
          <CustomTooltipBtns key='backbtn' type='error' title='Regresar'>
            <IconButton onClick={() => { navigate(-1) }}>
              <ReplyAllTwoToneIcon color='error' />
            </IconButton>
          </CustomTooltipBtns>
        ]}
      />

      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <MainMirrorCard>
          <TableTerminals
            loading={loading}
            data={data}
            handleDelete={handleDelete}
          />
        </MainMirrorCard>
      </Box>

      <ModalDelete
        handleClose={handleClose}
        open={open}
        id={selected[0]}
        handleDelete={handleDeleteTerminalAssigned}
        title='Eliminar vinculo de terminal'
        subtitle={<><b>¿Estás seguro de eliminar al usuario {dataSelected?.fullName} <i>({dataSelected?.email})</i>?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
      />
    </>
  )
}

export default TerminalsAssigned
