import { Tab } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'

const LinkTab = (props) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Tab
      component='a'
      disableRipple
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault()
          navigate(props.href)
        }
      }}
      sx={{
        color: theme.palette.mode === 'light' && alpha(theme.palette.grey[700], 0.85)
      }}
      {...props}
    />
  )
}

LinkTab.propTypes = {
  href: PropTypes.string.isRequired
}

export default LinkTab

