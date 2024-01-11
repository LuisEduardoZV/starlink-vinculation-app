import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  terminals: [],
  loading: false,
  success: false
}

const slice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {
    hasError (state, action) {
      state.error = action.payload
    },
    resetError (state, action) {
      state.error = action.payload
    },
    setTerminalsInfoSuccess (state, action) {
      state.terminals = action.payload
    },
    setLoader (state, action) {
      state.loading = action.payload
    },
    setSuccess (state, action) {
      state.success = action.payload
    }
  }
})


export default slice.reducer


export function getAllTerminals () {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/Terminals` })
      dispatch(slice.actions.setTerminalsInfoSuccess(res))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de terminales')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function getTerminalsByClient (id) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/getClientTerminales?id=${id}` })
      dispatch(slice.actions.setTerminalsInfoSuccess(res))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de terminales')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function modifyTerminal (data, haveClient, client) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Terminals/${data.terminalId}`, method: 'PUT', body: JSON.stringify(data) })
      if (res) haveClient ? await getTerminalsByClient(client)() : await getAllTerminals()()
      else {
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
        dispatch(slice.actions.hasError(new Error('Error al editar la terminal')))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al editar la terminal')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
