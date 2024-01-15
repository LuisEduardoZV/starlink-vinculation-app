import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// mui imports
import { Box, Tabs, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// project imports
import useAuth from '../hooks/useAuth'
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'
import LinkTab from '../ui-components/LinkTab'
import ProfileSection from './ProfileSection'

// icons
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone'
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import SatelliteAltTwoToneIcon from '@mui/icons-material/SatelliteAltTwoTone'
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'

const HeaderSection = () => {
  const { user } = useAuth()

  const theme = useTheme()

  const { state, pathname } = useLocation()
  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
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

  const extraTheme = theme.palette.mode === 'dark'
    ? {
        borderRadius: 2,
        boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)'
      }
    : { borderRadius: 3, boxShadow: '20px 20px 48px #c8c8c8, -20px -20px 48px #ffffff' }

  return (
    <Box sx={{
      color: 'white',
      height: 'auto',
      position: 'fixed',
      display: 'flex',
      top: 0,
      left: '4%',
      right: '4%',
      px: 3,
      py: 1,
      alignItems: 'center',
      backdropFilter: 'blur(8px)',
      backgroundColor: (theme) => theme.palette.background.paper,
      zIndex: 5,
      ...extraTheme
    }}
    >
      <Typography flex={1} variant='h2' sx={{ textShadow: theme.palette.mode === 'light' ? `2px 2px 1px ${theme.palette.grey[400]}` : `1px 2px 1px ${theme.palette.primary[800]}`, color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }}>Tan-Graph</Typography>
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
          {user?.user?.isPowerUser
            ? (
              <LinkTab
                label='Clientes' href='/clients'
                icon={<SupervisedUserCircleTwoToneIcon
                  fontSize='small' sx={{ color: tab === 0 ? theme.palette.primary[800] : theme.palette.primary.main }}
                      />}
              />)
            : (
              <LinkTab
                label='Usuarios' href={`/clients/${user?.user?.clientId}/users`} icon={<AccountCircleTwoToneIcon fontSize='small' sx={{ color: tab === 0 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
              />
              )}
          {user?.user?.isPowerUser
            ? (
              <LinkTab
                label='Super usuarios' href='/admins' icon={<AdminPanelSettingsTwoToneIcon fontSize='small' sx={{ color: tab === 1 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
              />)
            : (
              <LinkTab
                label='Contactos' href={`/clients/${user?.user?.clientId}/contacts`} icon={<ContactPhoneTwoToneIcon fontSize='small' sx={{ color: tab === 1 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
              />
              )}
          <LinkTab label='Terminales' href='/terminals' icon={<SatelliteAltTwoToneIcon fontSize='small' sx={{ color: tab === 2 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />} />
          <LinkTab
            label='Vincular' href='/linking' icon={<InsertLinkIcon fontSize='small' sx={{ color: tab === (3) ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
          />
          <LinkTab
            label='Reportes' href='/reports' icon={<SummarizeTwoToneIcon fontSize='small' sx={{ color: tab === (4) ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />} sx={{ borderLeft: `solid 1px ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[400]}` }}
          />
          {user?.user?.isPowerUser && <LinkTab
            label={<Typography whiteSpace='break-spaces' display='flex'>Terminales Asignadas</Typography>} href='/terminalsAssigned' icon={<CloudDoneTwoToneIcon fontSize='small' sx={{ color: tab === 5 ? (theme) => theme.palette.primary[800] : (theme) => theme.palette.primary.main }} />}
                                      />}
        </Tabs>
      </Box>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileSection />
      </Box>
    </Box>
  )
}

export default HeaderSection
