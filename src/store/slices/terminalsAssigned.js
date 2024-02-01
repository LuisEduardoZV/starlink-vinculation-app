import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const MESSAGE_SUUCESS_DELETE_GRAFANA = 'User deleted'

const initialState = {
  error: null,
  terminals: [],
  pureData: [],
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
    setTerminalsMainInfoSuccess (state, action) {
      state.pureData = action.payload
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

export async function convertToTreeViewData (info) {
  const jsonArray = [...info]
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

  jsonArray.forEach(({ fullName, dashboardName, terminalSiteName, clientId, assignId, clientName, terminalId, terminalFriendlyName, email, terminalLineOfService }, index) => {
    if (clientId !== currentClientId && currentClientId !== null) result.push(clientGroup)
    if (clientId !== currentClientId) {
      currentClientId = clientId

      clientGroup = {
        key: currentClientId,
        data: { fullName: '', dashboardName: '', terminalSiteName: '', clientId: '', assignId: '', clientName, terminalId: '', terminalFriendlyName: '', terminalLineOfService: '' },
        children: []
      }
    }

    if (fullName !== currentUser) {
      currentUser = fullName
      childrenGroup = [{
        key: fullName + assignId + terminalId + clientId,
        data: { fullName: '', dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName, terminalLineOfService }
      }]
      userGroup = {
        key: fullName + assignId + terminalId,
        data: { fullName: `${fullName} (${email})`, dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName, terminalLineOfService }
      }
      clientGroup.children.push(userGroup)
    } else {
      userGroup.data = { fullName: `${fullName} (${email})` }
      userGroup.children = childrenGroup
      userGroup.children.push({
        key: fullName + assignId + terminalId + clientId,
        data: { fullName: '', dashboardName, terminalSiteName, clientId, assignId, clientName: '', terminalId, terminalFriendlyName, terminalLineOfService }
      })
    }
  })
  result.push(clientGroup)

  return result
}

export function parseObject (data) {
  return async () => {
    dispatch(slice.actions.setTerminalsMainInfoSuccess(data))
    if (Array.isArray(data)) {
      const info = await convertToTreeViewData(data)
      dispatch(slice.actions.setTerminalsInfoSuccess(info))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    }
  }
}

export function getAllTerminalsAssigned (clientId) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      let res = await apiCall({ url: `${BASE_URL_API}/getAsigment` })
      if (clientId) res = res.filter((op) => (op.clientId === clientId))
      await parseObject(res)()
    } catch (error) {
      console.log(error)
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
      dispatch(slice.actions.setTerminalsMainInfoSuccess(res))
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
      const res = await apiCall({ url: `${BASE_URL_API}/Assigns/${id}`, method: 'DELETE' })
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
