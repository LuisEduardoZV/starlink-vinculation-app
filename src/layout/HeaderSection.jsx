import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// mui imports
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import useAuth from '../hooks/useAuth'
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'
import ProfileSection from './ProfileSection'
import AdminUserMenu from './components/AdminUserMenu'
import PowerUserMenu from './components/PowerUserMenu'

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
      <Typography flex={2} variant='h3' sx={{ textShadow: theme.palette.mode === 'light' ? `2px 2px 1px ${theme.palette.grey[400]}` : `1px 2px 1px ${theme.palette.primary[800]}`, color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white, width: '100%' }}>Backend Tangerine Metrics</Typography>
      <Box flex={5} display='flex' justifyContent='center'>
        {user?.user?.isPowerUser
          ? (<PowerUserMenu tab={tab} handleChange={handleChange} />)
          : (<AdminUserMenu tab={tab} user={user} handleChange={handleChange} />)}
      </Box>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileSection />
      </Box>
    </Box>
  )
}

export default HeaderSection
