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

function convertToTreeViewData (jsonArray) {
  // Organizar el arreglo por clientId y fullName
  jsonArray.sort((a, b) => {
    if (a.clientId !== b.clientId) {
      return a.clientId.toString().localeCompare(b.clientId.toString())
    } else {
      return a.fullName.localeCompare(b.fullName)
    }
  })

  const result = []

  let currentUser = null
  let currentClientId = null
  let clientGroup = null
  let userGroup = null
  let childrenGroup = null

  jsonArray.forEach(({ fullName, dashboardName, terminalSiteName, clientId, assignId, clientName, terminalId, terminalFriendlyName }, index) => {
    if (clientId !== currentClientId && currentClientId !== null) result.push(clientGroup)
    if (clientId !== currentClientId) {
      currentClientId = clientId

      clientGroup = {
        key: currentClientId,
        data: { fullName: '', dashboardName: '', terminalSiteName: '', clientId: '', assignId: '', clientName, terminalId: '', terminalFriendlyName: '' },
        children: []
      }
    }

    if (fullName !== currentUser) {
      currentUser = fullName
      childrenGroup = [{
        key: fullName + assignId + terminalId + clientId,
        data: { fullName: '', dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName }
      }]
      userGroup = {
        key: fullName + assignId + terminalId,
        data: { fullName, dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName }
      }
      clientGroup.children.push(userGroup)
    } else {
      userGroup.data = { fullName }
      userGroup.children = childrenGroup
      userGroup.children.push({
        key: fullName + assignId + terminalId + clientId,
        data: { fullName: '', dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName }
      })
    }
  })
  result.push(clientGroup)

  return result
}

export function parseObject (data) {
  return async () => {
    if (Array.isArray(data) && data.length > 0) {
      const info = convertToTreeViewData(data)
      dispatch(slice.actions.setTerminalsInfoSuccess(info))
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
