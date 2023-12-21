import PropTypes from 'prop-types'
import React from 'react'

import { Box, Fade } from '@mui/material'
import { alpha } from '@mui/material/styles'

const MainMirrorFade = React.forwardRef(({ children, sx, open, componentTransition, ...props }, ref) => {
  const TransitionComponent = componentTransition ?? Fade
  return (
    <TransitionComponent
      ref={ref}
      in={open}
      mountOnEnter
      unmountOnExit
      {...props}
      sx={{
        flex: 1,
        bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7),
        py: 2,
        px: 3,
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[10],
        color: 'white',
        maxWidth: '100%',
        mb: 3,
        backdropFilter: 'blur(10px)',
        border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`,
        minHeight: 300,
        transition: 'height 0.3s ease-in-out',
        ...sx
      }}
    >
      <Box>{children}</Box>
    </TransitionComponent>
  )
})

MainMirrorFade.displayName = 'MainMirrorFade'

MainMirrorFade.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  componentTransition: PropTypes.any,
  sx: PropTypes.object,
  open: PropTypes.bool
}

export default MainMirrorFade
