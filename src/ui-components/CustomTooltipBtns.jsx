import PropTypes from 'prop-types'

// mui imports
import { Tooltip, tooltipClasses } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function getColor (type, theme) {
  switch (type) {
    case 'warning': return theme.palette.warning.main
    case 'error': return theme.palette.error.main
    case 'primary': return theme.palette.primary.main
    case 'secondary': return theme.palette.secondary.main
    case 'success': return theme.palette.success.main
    case 'rose': return theme.palette.rose.main
    case 'orange': return theme.palette.orange.main
    case 'white': return theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.grey[400]
    case 'info': default: return theme.palette.info.main
  }
}

const CustomTooltipBtns = ({ className, children, type, ...props }) => {
  const theme = useTheme()

  const color = getColor(type, theme)

  return (
    <Tooltip
      arrow
      title='Custom'
      placement='right'
      {...props}
      classes={{ popper: className }}
      componentsProps={{
        tooltip: {
          sx: {
            [`& .${tooltipClasses.arrow}`]: {
              color
            },
            backgroundColor: color,
            color: type === 'white' ? theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black : theme.palette[type].contrastText
          }
        }
      }}
    >
      {children}
    </Tooltip>
  )
}

CustomTooltipBtns.propTypes = {
  className: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf([PropTypes.node])]),
  type: PropTypes.string
}

export default CustomTooltipBtns
