// import GuestGuard from 'utils/route-guard/GuestGuard'

// login routing
import MinimalLayout from '../layout/MinimalLayout'
import GuestGuard from '../utils/GuestGuard'
import Auth from '../views/auth'

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [{
    path: '/',
    element: <Auth />
  },
  {
    path: '/login',
    element: <Auth />
  }]
}

export default LoginRoutes
