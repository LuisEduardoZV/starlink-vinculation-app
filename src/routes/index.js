import { useRoutes } from 'react-router-dom'

// routes
import { ExternalRouteViewPoint } from './ExternalRoutes'
import LoginRoutes from './LoginRoutes'
import MainRoutes from './MainRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes () {
  return useRoutes([LoginRoutes, MainRoutes, ExternalRouteViewPoint])
}
