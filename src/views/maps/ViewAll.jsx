import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// third imports
import { GoogleMap, MarkerClusterer, useLoadScript } from '@react-google-maps/api'

// mui imports
import { Box } from '@mui/material'

// project imports
import { GOOGLE_MAP_KEY } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import LoadingInfo from '../../ui-components/LoadingInfo'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'
import { DARK_MODE_STYLE_MAP } from '../../utils/constants'
import CustomMarker from './components/CustomMarker'

const BASE_URL_API = 'https://ws-tangraph.ever-track.com/api'
const center = {
  lat: 25.2970145,
  lng: -103.053388
}

const ViewAll = () => {
  const { clientName } = useParams()
  console.log(clientName)

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_KEY })

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const onLoadFunction = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds()
    data.forEach((op) => {
      bounds.extend({ lat: Number(op.terminalLatitude), lng: Number(op.terminalLongitude) })
    })
    map.fitBounds(bounds)
  }, [data])

  useEffect(() => {
    (async () => {
      try {
        if (clientName) {
          setLoading(true)
          const res = await apiCallWithBody({
            url: `${BASE_URL_API}/TerminalInfoMaps`,
            body: JSON.stringify({
              clientName,
              terminalLineOfService: ''
            })
          })
          if (Array.isArray(res) && res.length > 0) {
            setData(res)
          } else {
            setHasError(true)
          }

          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setLoading(true)
      setHasError(false)
    }
  }, [clientName])

  if (!isLoaded || loading) {
    return (
      <Box
        flex={1} minWidth='100vw' minHeight='100vh' maxHeight='100vh'
        maxWidth='100vw' width='100%' height='100%' display='flex' justifyContent={center} alignItems='center'
      ><LoadingInfo />
      </Box>
    )
  }
  return (
    <Box
      flex={1} minWidth='100vw' minHeight='100vh' maxHeight='100vh'
      maxWidth='100vw' width='100%' height='100%' display='flex' justifyContent={center} alignItems='center'
    >
      {hasError
        ? <NoInfoOverlay />
        : (
          <GoogleMap
            mapContainerStyle={{ minWidth: '100vw', maxWidth: '100vw', minHeight: '100vh', maxHeight: '100vh', height: '100%', width: '100%' }}
            onLoad={onLoadFunction}
            center={{ lat: center.lat, lng: center.lng }}
            zoom={5}
            options={{
              streetViewControl: false,
              gestureHandling: 'greedy',
              fullscreenControl: false,
              panControl: true,
              scaleControl: false,
              mapTypeControl: true,
              styles: DARK_MODE_STYLE_MAP
            }}
          >
            <MarkerClusterer>
              {(clusterer) => (
                <div>
                  {(!loading && isLoaded) && data.map((op, index) => (
                    <CustomMarker key={index} {...op} clusterer={clusterer} />
                  ))}
                </div>
              )}
            </MarkerClusterer>

          </GoogleMap>
          )}
    </Box>
  )
}

export default ViewAll
