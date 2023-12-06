import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// third imports
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

// mui imports
import { Box } from '@mui/material'

// project imports
import { BASE_URL_API, GOOGLE_MAP_KEY } from '../../config'
import { apiCall } from '../../contexts/api'
import LoadingInfo from '../../ui-components/LoadingInfo'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'

import icon from '../../assets/image/greenMarkMap.png'

const DARK_MODE_STYLE_MAP = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]

const MapVisualization = () => {
  const { h3, terminal } = useParams()

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_KEY })

  const [center, setCenter] = useState({
    lat: 25.2970145,
    lng: -103.053388
  })
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        if (h3 && terminal) {
          setLoading(true)
          const res = await apiCall({ url: `${BASE_URL_API}/LocationH3?h3=${h3}&terminal=${terminal}` })
          if (typeof res === 'object') {
            setCenter({
              lat: res.latitudeDegrees,
              lng: res.longitudeDegrees
            })
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
  }, [h3, terminal])

  if (!isLoaded) {
    return (
      <Box
        flex={1} minWidth='100vw' minHeight='100vh' maxHeight='100vh'
        maxWidth='100vw' width='100%' height='100%' display='flex' justifyContent={center} alignItems='center'
      ><LoadingInfo />
      </Box>
    )
  }
  if (loading) {
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
            center={{ lat: center.lat, lng: center.lng }}
            zoom={10}
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
            {!loading && isLoaded && <Marker position={{ lat: center.lat, lng: center.lng }} icon={{ url: icon, scaledSize: new window.google.maps.Size(90, 45) }} />}
          </GoogleMap>
          )}
    </Box>
  )
}

export default MapVisualization
