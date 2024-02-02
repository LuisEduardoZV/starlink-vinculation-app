import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  contacts: [],
  contactInfo: null,
  loading: false,
  success: false
}

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    hasError (state, action) {
      state.error = action.payload
    },
    resetError (state, action) {
      state.error = action.payload
    },
    getContactsSuccess (state, action) {
      state.contacts = action.payload
    },
    getContactInfoSuccess (state, action) {
      state.contactInfo = action.payload
    },
    setContactInfoSuccess (state, action) {
      state.contactInfo = action.payload
    },
    setContactInfo (state, action) {
      state.contactInfo = action.payload
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


export function getContacts (id) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCall({ url: `${BASE_URL_API}/getClientContactos?id=${id}` })
      res?.sort((a, b) => {
        const nameA = a.contactName.toUpperCase()
        const nameB = b.contactName.toUpperCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })
      dispatch(slice.actions.getContactsSuccess(res))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(true))
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al obtener la lista de contactos')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function addContact (data) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Contacts`, body: JSON.stringify(data) })
      if (res && (res.length === 0 || !Array.isArray(res))) {
        dispatch(slice.actions.hasError(new Error('Error al intentar agregar el contacto')))
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getContacts(data?.clientId)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al intentar agregar el contacto')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function modifyContact (data) {
  return async () => {
    try {
      dispatch(slice.actions.setLoader(true))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Contacts/${data.contactId}`, method: 'PUT', body: JSON.stringify(data) })
      if (res && (res.length === 0 || !Array.isArray(res))) {
        dispatch(slice.actions.hasError(new Error('Error al intentar agregar el contacto')))
        dispatch(slice.actions.setLoader(false))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getContacts(data.clientId)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      dispatch(slice.actions.hasError(new Error('Error al intentar editar el contacto')))
      dispatch(slice.actions.setLoader(false))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function deleteContact (key, client) {
  return async () => {
    try {
      const res = await apiCall({ url: `${BASE_URL_API}/Contacts/${key}`, method: 'DELETE' })
      if (res && !Array.isArray(res)) {
        dispatch(slice.actions.hasError(new Error('Error al eliminar el contacto')))
        dispatch(slice.actions.setSuccess(false))
      } else {
        await getContacts(client)()
      }
    } catch (error) {
      dispatch(slice.actions.hasError(new Error('Error al eliminar el contacto')))
      dispatch(slice.actions.setSuccess(false))
    }
  }
}

export function resetErrorUsed () {
  return async () => { dispatch(slice.actions.resetError(null)) }
}
