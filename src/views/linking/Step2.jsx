import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import LooksTwoTwoToneIcon from '@mui/icons-material/LooksTwoTwoTone'
import { Box, List, ListItemText, Skeleton, Typography } from '@mui/material'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import { CustomListItemButtonInfo as CustomListItemButton } from '../../ui-components/CustomListItemButton'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const skeltonsLoaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Step2 = ({ values, errors, active, handleChange }) => {
  const { terminals, client } = values

  const [allTerminal, setAllTerminals] = useState([])
  const [loading, setLoading] = useState(true)

  const handleClick = (event, id) => {
    const selectedIndex = terminals.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(terminals, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(terminals.slice(1))
    } else if (selectedIndex === terminals.length - 1) {
      newSelected = newSelected.concat(terminals.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        terminals.slice(0, selectedIndex),
        terminals.slice(selectedIndex + 1)
      )
    }
    handleChange('terminals', newSelected)
  }

  const isSelected = (id) => terminals.indexOf(id) !== -1

  useEffect(() => {
    (async () => {
      try {
        if (client) {
          setLoading(true)
          const res = await apiCall({ url: `${BASE_URL_API}/getClientTerminales?id=${client}` })
          setAllTerminals(res)

          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [client])

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='flex-start'>
          <LooksTwoTwoToneIcon color='info' /> Selección de 1 o más terminales a vincular *
        </Typography>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: '60vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box}>
            {loading
              ? skeltonsLoaders.map((op) => (<Skeleton key={op} height={70} />))
              : (allTerminal.map(({ terminalId, terminalFriendlyName, serviceLineNumber, terminalSiteName }) => {
                  const isItemSelected = isSelected(terminalId)

                  return (
                    <CustomListItemButton
                      key={terminalId}
                      selected={isItemSelected}
                      onClick={(e) => handleClick(e, terminalId)}
                    >
                      <ListItemText
                        primary={`${terminalSiteName} (${terminalFriendlyName})`} secondary={serviceLineNumber} color='info' sx={{
                          '& .MuiTypography-root': {
                            color: (theme) => theme.palette.grey[400]
                          },
                          '& .MuiListItemText-secondary': {
                            color: (theme) => theme.palette.grey[700]
                          }
                        }}
                      />
                    </CustomListItemButton>
                  )
                }))}
          </List>
        </PerfectScrollbar>
      </Box>
      <Box sx={{
        transition: 'opacity 0.15s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: (theme) => theme.palette.background.paper,
        opacity: active ? 0 : 0.8,
        zIndex: active ? -1 : 1
      }}
      />
    </MainMirrorCard>
  )
}

Step2.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  active: PropTypes.bool,
  handleChange: PropTypes.func
}

export default Step2
