import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// mui imports
import { Box, Tabs, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'
import LinkTab from '../ui-components/LinkTab'
import ProfileSection from './ProfileSection'

import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone'
import RoofingTwoToneIcon from '@mui/icons-material/RoofingTwoTone'
import SatelliteAltTwoToneIcon from '@mui/icons-material/SatelliteAltTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'

const HeaderSection = () => {
  const { state, pathname } = useLocation()
  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setTab(newValue)
    }
  }

  useEffect(() => {
    if (state && state.view) setTab(Number(state.view))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Box sx={{
      color: 'white',
      height: 'auto',
      position: 'fixed',
      display: 'flex',
      top: 0,
      left: '4%',
      right: '4%',
      borderRadius: 2,
      px: 3,
      py: 1,
      alignItems: 'center',
      backdropFilter: 'blur(8px)',
      boxShadow: (theme) => theme.shadows[10],
      zIndex: 5
    }}
    >
      <Typography flex={1} variant='h2' color='white' sx={{ textShadow: (theme) => `1px 2px 1px ${theme.palette.primary[800]}` }}>Tan-Graph</Typography>
      <Box flex={5} display='flex' justifyContent='center'>
        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{
            minHeight: '40px',
            display: 'flex',
            width: 'fit-content',
            '& .MuiTab-root.Mui-selected': { color: 'black', bgcolor: (theme) => alpha(theme.palette.common.white, 0.55), transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' },
            '& .MuiTab-root': { py: 0, minHeight: '40px', pt: 0.5 },
            '& .MuiTabs-flexContainer': { borderColor: (theme) => theme.palette.grey[400] }
          }}
          TabIndicatorProps={{ style: { maxHeight: '2px' } }}
        >
          <LinkTab
            label='Tablero' href='/home' icon={<RoofingTwoToneIcon fontSize='small' sx={{ color: tab === 0 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
            sx={{ borderRight: '1px solid', borderColor: (theme) => theme.palette.grey[800] }}
          />
          <LinkTab
            label='Clientes' href='/clients' icon={<SupervisedUserCircleTwoToneIcon
              fontSize='small'
              sx={{ color: tab === 1 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }}
                                                   />}
          />
          <LinkTab label='Terminales' href='/terminals' icon={<SatelliteAltTwoToneIcon fontSize='small' sx={{ color: tab === 2 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />} />
          <LinkTab
            label='Vincular' href='/linking' icon={<InsertLinkIcon fontSize='small' sx={{ color: tab === 3 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
            sx={{ borderRight: '1px solid', borderColor: (theme) => theme.palette.grey[800] }}
          />
          <LinkTab label='Usuarios' href='/users' icon={<PeopleTwoToneIcon fontSize='small' sx={{ color: tab === 4 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />} />
          <LinkTab label='Contactos' href='/contacts' icon={<ContactPhoneTwoToneIcon fontSize='small' sx={{ color: tab === 5 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />} />
        </Tabs>
      </Box>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileSection />
      </Box>
    </Box>
  )
}

export default HeaderSection
