import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import LooksTwoTwoToneIcon from '@mui/icons-material/LooksTwoTwoTone'
import { Box, Divider, List, ListItemText, Skeleton, Slide, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../../config'
import { apiCall } from '../../../contexts/api'
import { CustomListItemButtonInfo as CustomListItemButton } from '../../../ui-components/CustomListItemButton'
import InputSearch from '../../../ui-components/InputSearch'
import MainMirrorFade from '../../../ui-components/MainMirrorFade'

import 'react-perfect-scrollbar/dist/css/styles.css'

const skeltonsLoaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const TermianlsList = ({ values, handleChange, inView }) => {
  const { terminals } = values
  const theme = useTheme()

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  const [data, setData] = useState([])
  const [allTerminal, setAllTerminals] = useState(data)
  const [loading, setLoading] = useState(true)

  const [selected, setSelected] = useState([])

  const handleClick = (event, terminalId, terminalSiteName) => {
    const selectedIndex = terminals.findIndex((op) => (op.terminalId === terminalId))
    const selectedInfoIndex = selected.findIndex((op) => (op.terminalId === terminalId))
    let newSelected = []
    let allInfoSelected = []
    const dataAvailable = [...data]

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(terminals, { terminalId, terminalSiteName })
      const info = dataAvailable.splice(dataAvailable.findIndex((op) => (op.terminalId === terminalId)), 1)
      allInfoSelected = allInfoSelected.concat(selected, info)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(terminals.slice(1))
      dataAvailable.push(selected[selectedInfoIndex])
      allInfoSelected = allInfoSelected.concat(selected.slice(1))
    } else if (selectedIndex === terminals.length - 1) {
      newSelected = newSelected.concat(terminals.slice(0, -1))
      dataAvailable.push(selected[selectedInfoIndex])
      allInfoSelected = allInfoSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        terminals.slice(0, selectedIndex),
        terminals.slice(selectedIndex + 1)
      )
      dataAvailable.push(selected[selectedInfoIndex])
      allInfoSelected = allInfoSelected.concat(
        selected.slice(0, selectedInfoIndex),
        selected.slice(selectedInfoIndex + 1)
      )
    }
    handleChange('terminals', newSelected)
    setSelected(allInfoSelected)
    setData(dataAvailable)
  }

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setAllTerminals(data)
    } else {
      const newRows = []
      const available = data

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
      setAllTerminals(newRows)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall({ url: `${BASE_URL_API}/Terminals` })
        setData(res)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
  }, [])

  useEffect(() => {
    setAllTerminals(data.sort((a, b) => {
      const nameA = a.terminalSiteName.toUpperCase()
      const nameB = b.terminalSiteName.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    }))
  }, [data])

  return (
    <MainMirrorFade
      componentTransition={Slide} direction='left' in={inView === 1} sx={{
        maxHeight: matchDown2Xl ? '75vh' : '85vh',
        height: '100%',
        position: 'relative',
        maxWidth: '70%',
        minWidth: '65%',
        width: '100%'
      }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='flex-start'>
          <LooksTwoTwoToneIcon color='info' /> Selección de 1 o más terminales a vincular *
        </Typography>
        <Box>
          <InputSearch handleSearch={handleSearch} />
        </Box>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: matchDown2Xl ? '55vh' : '60vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box} display='flex' flexWrap='wrap' columnGap={1} rowGap={2}>
            {selected.length !== 0 && <Typography variant='h4' color='grey.400' width='100%'>Cliente Seleccionado:</Typography>}
            {selected.length !== 0 && selected.map(({ terminalId, terminalFriendlyName, serviceLineNumber, terminalSiteName }) => (
              <CustomListItemButton
                key={terminalId}
                onClick={(e) => handleClick(e, terminalId, terminalSiteName)}
                selected
                sx={{ maxWidth: '45%', width: '100%' }}
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
            )}
            {selected.length !== 0 && <Divider sx={{ borderColor: 'grey.800', my: 0.5, width: '100%' }} />}
            <Typography variant='h4' color='grey.400' width='100%'>Terminales Disponibles:</Typography>
            {loading
              ? skeltonsLoaders.map((op) => (<Skeleton key={op} height={70} />))
              : (allTerminal.map(({ terminalId, terminalFriendlyName, serviceLineNumber, terminalSiteName }) => (
                <CustomListItemButton
                  key={terminalId}
                  onClick={(e) => handleClick(e, terminalId, terminalSiteName)}
                  sx={{ maxWidth: '45%', width: '100%' }}
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
                ))}
          </List>
        </PerfectScrollbar>
      </Box>
    </MainMirrorFade>
  )
}

TermianlsList.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  inView: PropTypes.number
}

export default TermianlsList
