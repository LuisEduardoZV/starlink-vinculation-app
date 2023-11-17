// import GuestGuard from 'utils/route-guard/GuestGuard'

// login routing
import MainLayout from '../layout/MainLayout'
import Home from '../views/home'

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <MainLayout />
  ),
  children: [{
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  }]
}

export default MainRoutes
