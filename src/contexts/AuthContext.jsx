/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react'

// reducer - state managment
import accountReducer from '../store/accountReducer'
import { LOGIN, LOGOUT } from '../store/actions'

// project imports
import { BASE_URL_API } from '../config'
import useLocalStorage from '../hooks/useLocalStorage'
import { apiCall } from './api'

const AuthContext = createContext(null)

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState)

  const [config, setConfig] = useLocalStorage('tangraph-account', {
    isLoggedIn: initialState.isLoggedIn,
    isInitialized: initialState.isInitialized,
    user: initialState.user
  })

  useEffect(() => {
    const init = async () => {
      try {
        const logged = !!config.isLoggedIn
        if (logged) {
          dispatch({
            type: LOGIN,
            payload: {
              ...config,
              isLoggedIn: true
            }
          })
        } else {
          dispatch({
            type: LOGOUT,
            payload: {
              ...initialState,
              isInitialized: true
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: LOGOUT,
          payload: {
            ...initialState,
            isInitialized: true
          }
        })
      }
    }

    init()
  }, [config])

  const loginProvider = async (user, password) => {
    try {
      const res = await apiCall({ url: `${BASE_URL_API}/Login?email=${user}&password=${password}` })
      if (res && res.email && res.fullName) {
        if (!res.isAdmin && !res.isPowerUser) return -1
        if (!res.isPowerUser && res.isAdmin) {
          const hasTerminals = await apiCall({ url: `${BASE_URL_API}/getAsigmentUser?UserId=${res.userId}` })
          if (Array.isArray(hasTerminals) && hasTerminals.length === 0) return -2
          const client = await apiCall({ url: `${BASE_URL_API}/Clients/${res.clientId}` })
          if (client && client.clientName) res.clientName = client.clientName
        }
        setConfig({
          ...config,
          isLoggedIn: true,
          user: res
        })
        dispatch({
          type: LOGIN,
          payload: {
            ...config,
            isLoggedIn: true,
            user: res
          }
        })
        return res
      }
      return !res
    } catch (error) {
      Promise.reject(error)
      console.log(error.code)
      return false
    }
  }

  const logoutProvider = () => {
    setConfig({
      isLoggedIn: false,
      isInitialized: true,
      user: null
    })
    dispatch({
      type: LOGOUT,
      payload: {
        ...initialState,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{ ...state, loginProvider, logoutProvider }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
