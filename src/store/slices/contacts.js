import { createSlice } from '@reduxjs/toolkit'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import { dispatch } from '../index'

const initialState = {
  error: null,
  contacts: [],
  contactInfo: null
}

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    hasError (state, action) {
      state.error = action.payload
    },
    getContactsSuccess (state, action) {
      state.contacts = action.payload
    },
    modifyContactSuccess (state, action) {
      state.contacts = action.payload
    },
    addContactSuccess (state, action) {
      state.contacts = action.payload
    },
    deleteContactSuccess (state, action) {
      state.contacts = action.payload
    },
    getContactInfoSuccess (state, action) {
      state.contactInfo = action.payload
    },
    setContactInfoSuccess (state, action) {
      state.contactInfo = action.payload
    }
  }
})


export default slice.reducer


export function getContacts (id) {
  return async () => {
    try {
      const res = await apiCall({ url: `${BASE_URL_API}/getClientContactos?id=${id}` })
      dispatch(slice.actions.getContactsSuccess(res))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function modifyContacts (data) {
  return async () => {
    try {
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Contacts/${data.contactId}`, method: 'PUT', body: JSON.stringify(data) })
      dispatch(slice.actions.modifyContactSuccess(res))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}
