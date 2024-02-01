import MapVisualization from '../views/maps'
import ViewAll from '../views/maps/ViewAll'

// ==============================|| EXTERNAL ROUTING ||============================== //

const ExternalRouteViewPoint = {
  path: '/viewPoint/:h3/:terminal',
  element: <MapVisualization />
}

const ExternalRoutePointsByClient = {
  path: '/locations/:clientName',
  element: <ViewAll />
}

export { ExternalRoutePointsByClient, ExternalRouteViewPoint }

