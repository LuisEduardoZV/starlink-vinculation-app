import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const MESSAGE_SUUCESS_DELETE_GRAFANA = 'User deleted'

const initialState = {
  error: null,
  terminals: [],
  loading: false,
  success: false
}

const slice = createSlice({
  name: 'terminalsAssigned',
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

export function parseObject (data) {
  return async () => {
    if (Array.isArray(data) && data.length > 0) {
      let lastUser = null
      const newRows = []
      let info = {}
      for (let i = 0; i < data.length; i++) {
        const { assignId, dashboardName, fullName, terminalSiteName, terminalFriendlyName } = data[i]
        if (lastUser === fullName) {
          info.children.push({
            key: assignId,
            data: {
              fullName: assignId,
              terminalSiteName,
              dashboardName,
              terminalFriendlyName
            }
          })
        } else {
          if (lastUser) newRows.push(info)
          info = {}
          lastUser = fullName
          info.children = []
          info.key = assignId
          info.data = {
            fullName,
            terminalSiteName: '',
            dashboardName: '',
            terminalFriendlyName: ''
          }
          info.children.push({
            key: assignId,
            data: {
              fullName: assignId,
              terminalSiteName,
              dashboardName,
              terminalFriendlyName
            }
          })
        }
      }
      newRows.push(info)
      dispatch(slice.actions.setTerminalsInfoSuccess(newRows))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    }
  }
}

export function getAllTerminalsAssigned () {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/getAsigment` })
      await parseObject(res)()
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de terminales')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function getTerminalsByUser (id) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/getAsigmentUser?UserId=${id}` })
      await parseObject(res)()
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de terminales del usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function deleteTerminal (email, id) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await await apiCall({ url: `${BASE_URL_API}/Assigns/${id}`, method: 'DELETE' })
      if (res) {
        const resGrafana = await apiCallWithBody({ url: `${BASE_URL_API}/DeleteUserGraf`, body: JSON.stringify({ email, name: '', login: '', password: '', lastEmail: email }) })
        const result = JSON.parse(resGrafana)
        if (result.message === MESSAGE_SUUCESS_DELETE_GRAFANA) return true
        else {
          dispatch(slice.actions.setLoader(false))
          dispatch(slice.actions.setSuccess(false))
          dispatch(slice.actions.hasError(new Error('Se ha eliminado la vinculación per hubo un error al intentar eliminar el usuario en Starlink Tangerine Metrics')))
          return false
        }
      } else {
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
        dispatch(slice.actions.hasError(new Error('Error al eliminar la terminal')))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al eliminar la terminal')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
