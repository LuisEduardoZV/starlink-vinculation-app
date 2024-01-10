import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const MESSAGE_SUUCESS_DELETE_GRAFANA = 'User deleted'

const initialState = {
  error: null,
  users: [],
  loading: false,
  success: false
}

const slice = createSlice({
  name: 'superUsers',
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


export function getUsers () {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/PowerUsers` })
      dispatch(slice.actions.setUserInfoSuccess(res))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de Super Usuarios')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

async function deleteUserInGrafana (email) {
  try {
    const resGrafana = await apiCallWithBody({ url: `${BASE_URL_API}/DeleteUserGraf`, body: JSON.stringify({ email, name: '', login: '', password: '', lastEmail: email }) })
    const res = JSON.parse(resGrafana)
    if (res.message === MESSAGE_SUUCESS_DELETE_GRAFANA) return true
    else return false
  } catch (error) {
    dispatch(slice.actions.hasError(error))
    dispatch(slice.actions.setSuccess(false))
    dispatch(slice.actions.setLoader(false))
    return false
  }
}

export function deleteUser (key, email) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const resGrafana = await deleteUserInGrafana(email)

      if (resGrafana) {
        const res = await apiCall({ url: `${BASE_URL_API}/PowerUsers/${key}`, method: 'DELETE' })
        if (res) await getUsers()()
        else {
          dispatch(slice.actions.setLoader(false))
          dispatch(slice.actions.setSuccess(false))
          dispatch(slice.actions.hasError(new Error('Error al eliminar el Super Usuario Tam Graph pero ha sido eliminado de Starlink Tangerine Metrics')))
        }
      } else {
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
        dispatch(slice.actions.hasError(new Error('Error al eliminar el Super Usuario en Starlink Tangerine Metrics')))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al eliminar el Super Usuario')))
      dispatch(slice.actions.setSuccess(false))
      dispatch(slice.actions.setLoader(false))
    }
  }
}

async function addUserInGrafana (data, powerUserId) {
  let res = null
  try {
    dispatch(slice.actions.setLoader(true))
    const resGrafana = await apiCallWithBody({
      url: `${BASE_URL_API}/AltaUserGraf?type=2`,
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        login: data.email,
        password: data.password,
        OrgId: 1
      })
    })
    res = JSON.parse(resGrafana)
    if (res && res.id) {
      await getUsers()()
      return true
    } else {
      return res
    }
  } catch (error) {
    dispatch(slice.actions.setLoader(false))
    dispatch(slice.actions.setSuccess(false))
    dispatch(slice.actions.hasError(error))
    await deleteUser(powerUserId)()
    return res
  }
}

export function addUser (data) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers`, body: JSON.stringify(data) })
      if (res && typeof res === 'object' && res.powerUser_Id) {
        await addUserInGrafana(data, res.powerUser_Id)
      } else {
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
        dispatch(slice.actions.hasError(new Error('Error al agregar el Super Usuario')))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al agregar el Super Usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

async function modifyUserInGrafana (data) {
  try {
    const resGrafana = await apiCallWithBody({
      url: `${BASE_URL_API}/EditUserGraf`,
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        login: data.email,
        passwordChanged: data.hasNewPassword,
        password: data.password,
        lastEmail: data.lastEmail
      })
    })
    const res = JSON.parse(resGrafana)
    console.log(res)
    return true
    /* if (res.message === MESSAGE_SUUCESS_DELETE_GRAFANA) return true
    else return false */
  } catch (error) {
    dispatch(slice.actions.hasError(error))
    dispatch(slice.actions.setSuccess(false))
    dispatch(slice.actions.setLoader(false))
    return false
  }
}

export function modifyUser (data) {
  return async () => {
    console.log(data)
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers/${data.powerUser_Id}`, method: 'PUT', body: JSON.stringify(data) })
      console.log(res)
      if (res) {
        await modifyUserInGrafana(data)
        await getUsers()()
      } else {
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
        dispatch(slice.actions.hasError(new Error('Error al editar el Super Usuario')))
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al editar el Super Usuario')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}


export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
