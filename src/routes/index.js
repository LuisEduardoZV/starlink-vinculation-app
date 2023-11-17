import { useRoutes } from 'react-router-dom'

// routes
import LoginRoutes from './LoginRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes () {
  return useRoutes([LoginRoutes])
}
