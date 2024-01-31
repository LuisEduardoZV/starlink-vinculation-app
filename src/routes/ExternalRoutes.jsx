import MapVisualization from '../views/maps'

// ==============================|| EXTERNAL ROUTING ||============================== //

const ExternalRouteViewPoint = {
  path: '/viewPoint/:h3/:terminal',
  element: <MapVisualization />
}

const ExternalRouteAllPoints = {
  path: '/viewPoints/:clientName',
  element: <MapVisualization />
}

export { ExternalRouteAllPoints, ExternalRouteViewPoint }

