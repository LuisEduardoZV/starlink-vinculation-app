import PropTypes from 'prop-types'

import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'

const MainMirrorCard = ({ children, sx }) => (
  <Box
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
  >{children}
  </Box>
)

MainMirrorCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  sx: PropTypes.object
}

export default MainMirrorCard
