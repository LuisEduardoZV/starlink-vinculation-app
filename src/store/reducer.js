// third-party
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  user: accountReducer
})

export default reducer
