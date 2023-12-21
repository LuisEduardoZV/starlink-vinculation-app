import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import LooksOneTwoToneIcon from '@mui/icons-material/LooksOneTwoTone'
import { Box, Divider, List, ListItemText, Skeleton, Slide, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../../config'
import { apiCall } from '../../../contexts/api'
import { CustomListItemButtonPrimary as CustomListItemButton } from '../../../ui-components/CustomListItemButton'
import InputSearch from '../../../ui-components/InputSearch'
import MainMirrorFade from '../../../ui-components/MainMirrorFade'

import 'react-perfect-scrollbar/dist/css/styles.css'

const skeltonsLoaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ClientList = ({ handleChange, inView }) => {
  const theme = useTheme()

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  const [data, setData] = useState([])
  const [clients, setClients] = useState(data)
  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState(null)

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setClients(data)
    } else {
      const newRows = []
      const available = data

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
      setClients(newRows)
    }
  }

  const handleChangeSelected = (clientId) => {
    const available = [...data]
    const indexClient = available.findIndex((op) => (op.clientId === clientId))
    const clientInfo = available.splice(indexClient, 1)

    handleChange('client', clientInfo[0].clientId)
    setSelected(clientInfo[0])
    setClients(available)
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall({ url: `${BASE_URL_API}/Clients` })
        res.sort((a, b) => {
          const nameA = a.clientName.toUpperCase()
          const nameB = b.clientName.toUpperCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })
        setData(res)
        setClients(res)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [])

  return (
    <MainMirrorFade
      componentTransition={Slide} direction='right' in={inView === 1} sx={{
        maxHeight: matchDown2Xl ? '75vh' : '85vh',
        height: '100%',
        position: 'relative',
        maxWidth: '35%',
        minWidth: '30%',
        width: 'max-content'
      }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='center'>
          <LooksOneTwoToneIcon color='primary' /> Selección de cliente *
        </Typography>
        <Box>
          <InputSearch handleSearch={handleSearch} />
        </Box>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: matchDown2Xl ? '55vh' : '67vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box}>
            {selected && (
              <Box width='100%' display='flex' flexDirection='column' gap={1}>
                <Typography variant='h4' color='grey.400'>Cliente Seleccionado:</Typography>
                <CustomListItemButton
                  key='client-selected'
                  selected
                >
                  <ListItemText
                    primary={selected?.clientName} secondary={selected?.clientEmail} sx={{
                      '& .MuiListItemText-primary': {
                        color: (theme) => theme.palette.grey[400]
                      }
                    }}
                  />
                </CustomListItemButton>
                <Divider sx={{ borderColor: 'grey.800', my: 2 }} />
              </Box>
            )}
            <Typography variant='h4' color='grey.400'>Clientes Disponibles:</Typography>
            {loading
              ? skeltonsLoaders.map((op) => (<Skeleton key={op} height={70} />))
              : clients.map(({ clientId, clientName, clientEmail }, index) => (
                <CustomListItemButton
                  key={clientId}
                  onClick={() => handleChangeSelected(clientId)}
                >
                  <ListItemText
                    primary={clientName} secondary={clientEmail} sx={{
                      '& .MuiListItemText-primary': {
                        color: (theme) => theme.palette.grey[400]
                      }
                    }}
                  />
                </CustomListItemButton>
              ))}
          </List>
        </PerfectScrollbar>
      </Box>
    </MainMirrorFade>
  )
}

ClientList.propTypes = {
  handleChange: PropTypes.func,
  inView: PropTypes.number
}

export default ClientList
