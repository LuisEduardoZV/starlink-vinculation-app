import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { alpha, useTheme } from '@mui/material/styles'

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const theme = useTheme()

  return (
    <>
      <Toaster
        closeButton
        theme='dark'
        toastOptions={{
          style: { backgroundColor: alpha(theme.palette.background.paper, 0.7), flex: 1, color: 'white', borderColor: theme.palette.grey[800], boxShadow: theme.shadows[10], backdropFilter: 'blur(10px)' }
        }}
      />
      <Outlet />
    </>
  )
}

export default MinimalLayout
