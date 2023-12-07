import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import LooksOneTwoToneIcon from '@mui/icons-material/LooksOneTwoTone'
import { Box, List, ListItemText, Skeleton, Typography } from '@mui/material'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import { CustomListItemButtonPrimary as CustomListItemButton } from '../../ui-components/CustomListItemButton'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const skeltonsLoaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Step1 = ({ values, errors, handleChange }) => {
  const { client } = values

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall({ url: `${BASE_URL_API}/Clients` })
        setClients(res)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [])

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='center'>
          <LooksOneTwoToneIcon color='primary' /> Selección de cliente *
        </Typography>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: '65vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box}>
            {loading
              ? skeltonsLoaders.map((op) => (<Skeleton key={op} height={70} />))
              : clients.map(({ clientId, clientName, clientEmail }) => (
                <CustomListItemButton
                  key={clientId}
                  selected={client === clientId}
                  onClick={() => handleChange('client', clientId)}
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
    </MainMirrorCard>
  )
}

Step1.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
}

export default Step1
