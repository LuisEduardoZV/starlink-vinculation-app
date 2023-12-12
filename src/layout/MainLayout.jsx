import { Outlet } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'

// project imports
import HeaderSection from '../layout/HeaderSection'
import MainBackground from '../ui-components/extended/MainBackground'

const Home = () => {
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
        <MainBackground />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Home
