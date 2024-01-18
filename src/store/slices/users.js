import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  users: [],
  loading: false,
  success: false
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    hasError (state, action) {
      state.error = action.payload
    },
    resetError (state, action) {
      state.error = action.payload
    },
    setUserInfoSuccess (state, action) {
      state.users = action.payload
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


export function getUsers (id) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/getClientUser?id=${id}` })
      dispatch(slice.actions.setUserInfoSuccess(res))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de usuarios')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function deleteUser (key, client) {
  return async () => {
    try {
      const res = await apiCall({ url: `${BASE_URL_API}/Users/${key}`, method: 'DELETE' })
      if (res && (res.length === 0 || !Array.isArray(res))) {
        dispatch(slice.actions.hasError(new Error('Error al eliminar el usuario')))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getUsers(client)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al eliminar el usuario ya que está vinculado a una terminal')))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function addUser (data) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Users`, body: JSON.stringify(data) })
      if (res && (res.length === 0 || !Array.isArray(res))) {
        dispatch(slice.actions.hasError(new Error('Error al intenar agregar el usuario')))
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getUsers(data?.clientId)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al intenar agregar el usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function modifyUser (data) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Users/${data.userId}`, method: 'PUT', body: JSON.stringify(data) })
      if (res && (res.length === 0 || !Array.isArray(res))) {
        dispatch(slice.actions.hasError(new Error('Error al intenar agregar el usuario')))
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getUsers(data.clientId)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al intenar editar el usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}


export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
