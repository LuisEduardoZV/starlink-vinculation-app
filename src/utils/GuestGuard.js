import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// project imports
import { DASHBOARD_PATH, DASHBOARD_PATH_NOADMIN } from '../config'
import useAuth from '../hooks/useAuth'

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      const path = user.user.isPowerUser ? DASHBOARD_PATH : DASHBOARD_PATH_NOADMIN
      navigate(path, { replace: true, state: { ...!user.user.isPowerUser && { view: 2 } } })
    }
  }, [isLoggedIn, navigate, user])

  return children
}

GuestGuard.propTypes = {
  children: PropTypes.node
}

export default GuestGuard
