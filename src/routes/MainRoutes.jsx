// import GuestGuard from 'utils/route-guard/GuestGuard'

// login routing
import MainLayout from '../layout/MainLayout'
import Clients from '../views/clients'
import Contacts from '../views/contacts'
import Home from '../views/home'
import Linking from '../views/linking'
import Terminals from '../views/terminals'
import Users from '../views/users'

import AuthGuard from '../utils/AuthGuard'

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
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
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '/contacts',
      element: <Contacts />
    }
  ]
}

export default MainRoutes
