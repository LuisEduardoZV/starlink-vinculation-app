import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  const [params] = useSearchParams()

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_KEY })

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const onLoadFunction = useCallback((map) => {
    if (data && data.length > 1) {
      const bounds = new window.google.maps.LatLngBounds()
      data.forEach((op) => {
        bounds.extend({ lat: Number(op.terminalLatitude), lng: Number(op.terminalLongitude) })
      })
      map.fitBounds(bounds)
    }
  }, [data])

  useEffect(() => {
    (async () => {
      try {
        if ((params.has('ClientName') && params.get('ClientName') !== '') || (params.has('terminal') && params.get('terminal') !== '')) {
          setLoading(true)
          const body = params.get('terminal').toString().toLowerCase() !== 'all'
            ? {
                clientName: '',
                terminalLineOfService: params.get('terminal').toString()
              }
            : {
                clientName: params.get('ClientName').toString(),
                terminalLineOfService: ''
              }
          const res = await apiCallWithBody({
            url: `${BASE_URL_API}/TerminalInfoMaps`,
            body: JSON.stringify(body)
          })
          if (Array.isArray(res) && res.length > 0) {
            // eslint-disable-next-line array-callback-return
            const filter = res.filter((op) => {
              let { terminalLatitude, terminalLongitude } = op
              if (terminalLatitude && terminalLongitude) {
                terminalLatitude = parseFloat(terminalLatitude)
                terminalLongitude = parseFloat(terminalLongitude)
                if (terminalLatitude > 21.6) {
                  return !(terminalLongitude < -117.0 || terminalLongitude > -97.0 || terminalLatitude > 32.8) && op
                } else return !(terminalLongitude < -106.0 || terminalLongitude > -86.7 || terminalLatitude < 14.5) && op
              }
            })
            console.log(filter)
            setData(filter)
          } else {
            setHasError(true)
          }

          setLoading(false)
        } else setHasError(true)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setLoading(true)
      setHasError(false)
    }
  }, [params])

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
                <Box>
                  {(!loading && isLoaded) && data.map((op, index) => (
                    <CustomMarker key={index} {...op} clusterer={clusterer} />
                  ))}
                </Box>
              )}
            </MarkerClusterer>

          </GoogleMap>
          )}
    </Box>
  )
}

export default ViewAll
