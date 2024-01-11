import { createSlice } from '@reduxjs/toolkit'

import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  list: [],
  clientInfo: null,
  success: false,
  loading: false
}

const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    hasError (state, action) {
      state.error = action.payload
    },
    resetError (state, action) {
      state.error = action.payload
    },
    setSuccess (state, action) {
      state.success = action.payload
    },
    getClients (state, action) {
      state.list = action.payload
    },
    addClient (state, action) {
      state.list = action.payload
    },
    editClient (state, action) {
      state.list = action.payload
    },
    deleteClient (state, action) {
      state.list = action.payload
    },
    getClientInfo (state, action) {
      state.clientInfo = action.payload
    },
    setClientInfo (state, action) {
      state.clientInfo = action.payload
    },
    setLoader (state, action) {
      state.loading = action.payload
    }
  }
})

// Reducer
export default slice.reducer

export function getAllClients () {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const data = await apiCall({ url: `${BASE_URL_API}/Clients` })
      dispatch(slice.actions.getClients(data))
      dispatch(slice.actions.setSuccess(true))
      dispatch(slice.actions.setLoader(false))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de clientes')))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

export function addNewClient (info) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const data = await apiCallWithBody({ url: `${BASE_URL_API}/Clients`, body: JSON.stringify(info) })
      if (data && data.length === 0) {
        dispatch(slice.actions.hasError(new Error(`Error al agregar el cliente ${info?.clientName}`)))
        dispatch(slice.actions.setSuccess(false))
      } else {
        dispatch(slice.actions.addClient(data))
        dispatch(slice.actions.setSuccess(true))
      }
      dispatch(slice.actions.setLoader(false))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error(`Error al agregar el cliente ${info?.clientName}`)))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

export function editClient (info, key, dC, nC) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const data = await apiCallWithBody({ url: `${BASE_URL_API}/Clients/${key}`, method: 'PUT', body: JSON.stringify(info) })
      if (data && data.length === 0) {
        dispatch(slice.actions.hasError(new Error(`Error al editar la información del cliente ${info?.clientName}`)))
        dispatch(slice.actions.setSuccess(false))
      } else {
        if (dC.length > 0) {
          dC.forEach(async ({ contactId }) => {
            await apiCall({ url: `${BASE_URL_API}/Contacts/${contactId}`, method: 'DELETE' })
          })
        }
        if (nC.length > 0) {
          nC.forEach(async (op) => {
            await apiCallWithBody({ url: `${BASE_URL_API}/Contacts`, method: 'POST', body: JSON.stringify(op) })
          })
        }
        dispatch(slice.actions.editClient(data))
        dispatch(slice.actions.setSuccess(true))
      }
      dispatch(slice.actions.setLoader(false))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error(`Error al editar la información del cliente ${info?.clientName}`)))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

export function deleteClient (key) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const data = await apiCall({ url: `${BASE_URL_API}/Clients/${key}`, method: 'DELETE' })
      if (data && (data.length === 0 || !Array.isArray(data))) {
        dispatch(slice.actions.hasError(new Error('Error al eliminar el cliente')))
        dispatch(slice.actions.setSuccess(false))
      } else {
        dispatch(slice.actions.deleteClient(data))
        dispatch(slice.actions.setSuccess(true))
      }
      dispatch(slice.actions.setLoader(false))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al eliminar el cliente')))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

export function getClientInfo (key) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const data = await apiCall({ url: `${BASE_URL_API}/Clients/${key}` })
      dispatch(slice.actions.getClientInfo(data))
      dispatch(slice.actions.setSuccess(true))
      dispatch(slice.actions.setLoader(false))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al eliminar el cliente')))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

export function setClientInfo () {
  return async () => { dispatch(slice.actions.setClientInfo(null)) }
}

export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
