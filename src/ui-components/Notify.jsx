import { alpha, useTheme } from '@mui/material/styles'

import { Toaster } from 'sonner'

import useConfig from '../hooks/useConfig'

const Notify = () => {
  const theme = useTheme()
  const { navType } = useConfig()

  return (
    <Toaster
      closeButton
      theme={navType}
      toastOptions={{
        style: { backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.paper : alpha(theme.palette.background.paper, 0.7), flex: 1, color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white, borderColor: theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.grey[800], boxShadow: theme.shadows[10], backdropFilter: 'blur(10px)' }
      }}
    />
  )
}

export default Notify
