import PropTypes from 'prop-types'
import React from 'react'

import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'

const MainMirrorCard = React.forwardRef(({ children, sx }, ref) => (
  <Box
    ref={ref}
    sx={{
      flex: 1,
      bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7),
      py: 2,
      px: 3,
      borderRadius: 2,
      boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)',
      color: 'white',
      maxWidth: '100%',
      mb: 3,
      backdropFilter: 'blur(10px)',
      border: (theme) => `1px solid ${alpha(theme.palette.grey[600], 0.55)}`,
      minHeight: 300,
      transition: 'height 0.3s ease-in-out',
      ...sx
    }}
  >{children}
  </Box>
))

MainMirrorCard.displayName = 'MainMirrorCard'

MainMirrorCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  sx: PropTypes.object
}

export default MainMirrorCard
