// action - account reducer
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export const loginAction = (user) => {
  return {
    isLoggedIn: true,
    isInitialized: true,
    user
  }
}

export const logoutAction = () => {
  return {
    isLoggedIn: false,
    isInitialized: false,
    user: null
  }
}
