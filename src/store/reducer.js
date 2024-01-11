// third-party
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import clientsReducer from './slices/clients'
import contactsReducer from './slices/contacts'
import superUsersReducer from './slices/superUsers'
import terminalsReducer from './slices/terminals'
import terminalsAssignedReducer from './slices/terminalsAssigned'
import usersReducer from './slices/users'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  user: accountReducer,
  clients: clientsReducer,
  contacts: contactsReducer,
  users: usersReducer,
  superUsers: superUsersReducer,
  terminals: terminalsReducer,
  terminalsAssigned: terminalsAssignedReducer
})

export default reducer
