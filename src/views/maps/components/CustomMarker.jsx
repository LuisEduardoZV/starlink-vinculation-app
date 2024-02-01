import PropTypes from 'prop-types'
import { useState } from 'react'

// third imports
import { Marker, OverlayView } from '@react-google-maps/api'

// mui imports
import { Box, Typography } from '@mui/material'

import greenIcon from '../../../assets/image/greenMarkMap.png'
import redIcon from '../../../assets/image/redMarkMap.png'

const ACTIVE_STATUS = 'Active'

const CustomMarker = ({ terminalLatitude, terminalLongitude, terminalLineOfService, terminalKitNumber, status = ACTIVE_STATUS, clusterer, disableOverlay = false }) => {
  const [isHover, setIsHover] = useState(false)

  const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => ({
    x: offsetWidth + labelAnchor.x,
    y: offsetHeight + labelAnchor.y
  })

  return (
    <Marker
      position={{ lat: Number(terminalLatitude), lng: Number(terminalLongitude) }}
      icon={{ url: status === ACTIVE_STATUS ? greenIcon : redIcon, scaledSize: status === ACTIVE_STATUS ? new window.google.maps.Size(90, 45) : new window.google.maps.Size(22, 35) }}
      animation={window.google.maps.Animation.DROP}
      label={{
        text: terminalKitNumber,
        color: 'white',
        className: 'label-map'
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      clusterer={clusterer}
    >
      {!disableOverlay && (
        <OverlayView
          key='mwl'
          position={{ lat: Number(terminalLatitude), lng: Number(terminalLongitude) }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(x, y) => getPixelPositionOffset(x, y, { x: 25, y: -40 })}
        >
          <Box
            sx={{
              transition: 'all 0.3s liner',
              bgcolor: (theme) => theme.palette.common.black,
              display: 'flex',
              p: '7px 12px',
              borderRadius: '4px',
              alignItems: 'center',
              width: 'max-content',
              position: 'relative',
              color: 'white',
              zIndex: 1,
              cursor: 'pointer',
              visibility: isHover ? 'visible' : 'hidden',
              opacity: isHover ? 100 : 0,
              '&:after': {
                content: '""',
                position: 'absolute',
                width: 0,
                top: '50%',
                transform: 'translate(0, -50%)',
                left: -13,
                borderBottom: '12px solid transparent',
                borderTop: '12px solid transparent',
                borderRight: (theme) => `12px solid ${theme.palette.common.black}`
              }
            }}
          >
            <Typography variant='subtitle2' color='inherit' ml={1} sx={{ lineClamp: 2, overflow: 'hidden' }}>
              {terminalLineOfService}
            </Typography>
          </Box>
        </OverlayView>)}
    </Marker>
  )
}

CustomMarker.propTypes = {
  terminalLatitude: PropTypes.string,
  terminalLongitude: PropTypes.string,
  terminalLineOfService: PropTypes.string,
  terminalKitNumber: PropTypes.string,
  status: PropTypes.string,
  disableOverlay: PropTypes.bool,
  clusterer: PropTypes.object
}

export default CustomMarker
