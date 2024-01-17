import { Tab } from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'

const LinkTab = (props) => {
  const navigate = useNavigate()

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
      {...props}
    />
  )
}

LinkTab.propTypes = {
  href: PropTypes.string.isRequired
}

export default LinkTab

