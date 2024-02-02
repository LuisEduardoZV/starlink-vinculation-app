import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  terminals: [],
  loading: false,
  success: false,
  successMsg: null
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
    },
    setSuccessMsg (state, action) {
      state.successMsg = action.payload
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
      const res = await apiCall({ url: `${BASE_URL_API}/getClientTerminalesAllCli?id=${id}` })
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
      dispatch(slice.actions.setSuccessMsg(null))
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Terminals/${data.terminalId}`, method: 'PUT', body: JSON.stringify(data) })
      if (res) {
        dispatch(slice.actions.setSuccess(true))
        dispatch(slice.actions.setSuccessMsg('Se ha actualizado la información'))
        haveClient ? await getTerminalsByClient(client)() : await getAllTerminals()()
      } else {
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

export function unlickTerminalWithClient (id, client) {
  return async () => {
    try {
      dispatch(slice.actions.setSuccessMsg(null))
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/ClientTerminals/${id}`, method: 'DELETE' })
      if (res && typeof res !== 'string') {
        dispatch(slice.actions.setSuccess(true))
        dispatch(slice.actions.setSuccessMsg('Se ha desvinculado la terminal correctamente'))
        await getTerminalsByClient(client)()
      } else {
        dispatch(slice.actions.hasError(new Error('Error al desvincular la terminal ya que está asignada a un usuario')))
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al desvincular la terminal ya que está asignada a un usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function resetErrorUsed () {
  return async () => {
    dispatch(slice.actions.resetError(null))
    dispatch(slice.actions.setSuccessMsg(null))
  }
}
