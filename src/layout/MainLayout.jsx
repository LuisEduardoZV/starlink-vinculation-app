import { Outlet } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'

// project imports
import HeaderSection from '../layout/HeaderSection'

const Home = () => {
  return (
    <Box sx={{
      minWidth: '100vw',
      maxWidth: '100vw',
      width: '100%',
      minHeight: '100vh',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    }}
    >
      <HeaderSection />
      <Box flex={1} mt={12}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Home
