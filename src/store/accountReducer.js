// action - state management
import { LOGIN, LOGOUT } from './actions'

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = action.payload
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      }
    }
    case LOGOUT: {
      const data = action.payload
      return {
        ...data
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default accountReducer
