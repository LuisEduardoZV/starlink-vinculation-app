// import GuestGuard from 'utils/route-guard/GuestGuard'

// login routing
import MinimalLayout from '../layout/MinimalLayout'
import Auth from '../views/auth'

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
    <MinimalLayout />
  ),
  children: [{
    path: '/',
    element: <Auth />
  }]
}

export default LoginRoutes
