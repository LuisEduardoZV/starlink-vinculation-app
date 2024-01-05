// third-party
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import clientsReducer from './slices/clients'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  user: accountReducer,
  clients: clientsReducer
})

export default reducer
