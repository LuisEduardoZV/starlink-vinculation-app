import { Outlet } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// third imports
import { Toaster } from 'sonner'

// project imports
import HeaderSection from '../layout/HeaderSection'

const Home = () => {
  const theme = useTheme()

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}
    >
      <HeaderSection />
      <Box mt={15} sx={{ bgcolor: 'transparent', width: '100%', zIndex: 2, height: '100%', position: 'relative' }}>
        <ul className='background'>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <Outlet />
      </Box>
      <Toaster
        closeButton
        theme='dark'
        toastOptions={{
          style: { backgroundColor: alpha(theme.palette.background.paper, 0.7), flex: 1, color: 'white', borderColor: theme.palette.grey[800], boxShadow: theme.shadows[10], backdropFilter: 'blur(10px)' }
        }}
      />
    </Box>
  )
}

export default Home
