// import GuestGuard from 'utils/route-guard/GuestGuard'

// login routing
import MainLayout from '../layout/MainLayout'
import Clients from '../views/clients'
import Home from '../views/home'
import Linking from '../views/linking'
import Terminals from '../views/terminals'

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <MainLayout />
  ),
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/linking',
      element: <Linking />
    },
    {
      path: '/clients',
      element: <Clients />
    },
    {
      path: '/terminals',
      element: <Terminals />
    }
  ]
}

export default MainRoutes
