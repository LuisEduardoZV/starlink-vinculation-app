import { Tab } from '@mui/material'
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'

const LinkTab = (props) => {
  return (
    <Tab
      component='a'
      disableRipple
      onClick={(event) => {
        if (samePageLinkNavigation(event)) {
          event.preventDefault()
        }
      }}
      {...props}
    />
  )
}

export default LinkTab

