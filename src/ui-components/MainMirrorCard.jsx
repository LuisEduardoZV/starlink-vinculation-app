import PropTypes from 'prop-types'
import React from 'react'

import { Box } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

const MainMirrorCard = React.forwardRef(({ children, sx, ...props }, ref) => {
  const theme = useTheme()

  const extraTheme = theme.palette.mode === 'dark'
    ? {
        border: `1px solid ${alpha(theme.palette.background.paper, 0.55)}`,
        borderRadius: 2,
        boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)'
      }
    : { borderRadius: 3, boxShadow: '20px 20px 48px #c8c8c8, -20px -20px 48px #ffffff' }

  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        flex: 1,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
        py: 2,
        px: 3,
        color: 'white',
        maxWidth: '100%',
        mb: 3,
        backdropFilter: 'blur(10px)',
        minHeight: 300,
        transition: 'height 0.3s ease-in-out',
        ...extraTheme,
        ...sx
      }}
    >{children}
    </Box>
  )
})

MainMirrorCard.displayName = 'MainMirrorCard'

MainMirrorCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  sx: PropTypes.object
}

export default MainMirrorCard
