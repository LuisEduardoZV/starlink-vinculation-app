import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import { Box, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import PerfectScrollBar from 'react-perfect-scrollbar'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import LoadingInfo from '../../ui-components/LoadingInfo'
import AuthContainer from './components/AuthContainer'

import { emailerrorText, phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleCancel, selected }) => {
  const [initVal, setInitVal] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingContact, setLoadingContact] = useState(true)

  const [preContacts, setPreContacts] = useState([])
  const [contacts, setContacts] = useState([])
  const [contact, setContact] = useState({ contactId: 0, clientId: 0, contactName: '', contactPosition: '', contactPhone: '', isEnabled: 1, publicNote: '', client: '' })
  const [contactsDeleted, setContactsDeleted] = useState([])

  const handleAddNewContact = (e, clientId) => {
    e.preventDefault()
    if (contact.contactName !== '' && contact.contactPosition !== '' && contact.contactPhone !== '') {
      setContacts([...contacts, contact])
      setContact({ contactId: 0, clientId, contactName: '', contactPosition: '', contactPhone: '', isEnabled: 1, publicNote: '', client: '' })
    }
  }

  const handleChangeContact = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleDeleteContact = async (e, index) => {
    e.preventDefault()
    setLoadingContact(true)
    const newContacts = contacts
    await newContacts.splice(index, 1)
    await setContacts(newContacts)
    setLoadingContact(false)
  }

  const handleDeletePreContact = async (e, index) => {
    e.preventDefault()
    setLoadingContact(true)
    const newPreContacts = preContacts
    const deleted = await newPreContacts.splice(index, 1)
    setContactsDeleted([...contactsDeleted, ...deleted])
    await setPreContacts(newPreContacts)
    setLoadingContact(false)
  }

  useEffect(() => {
    (async () => {
      try {
        if (selected) {
          const res = await apiCall({ url: `${BASE_URL_API}/Clients/${selected}` })
          setInitVal({ ...res, isEnabled: res.isEnabled === 1, submit: null })
          setPreContacts(res.contacts)
          setContact({ ...contact, clientId: res.clientId })
          setLoading(false)
          setLoadingContact(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setInitVal({})
      setLoading(true)
      setLoadingContact(true)
      setPreContacts([])
      setContacts([])
      setContactsDeleted([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  if (loading) return <LoadingInfo />
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5, maxHeight: '70vh' }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Editar un cliente</Typography>
      <PerfectScrollBar style={{ maxHeight: 'calc(100vh-200px)', height: '100%', overflowX: 'hidden' }}>
        <Formik
          initialValues={initVal}
          validationSchema={Yup.object().shape({
            clientName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres'),
            clientNumber: Yup.string().max(50, 'La longitud debe ser menor a 50 caracteres'),
            clientAddress: Yup.string().max(2000, 'La longitud debe ser menor a 2000 caracteres').required(requiredText),
            clientPhone: Yup.string()
              .min(10, phonelenghtText)
              .required(requiredText)
              .typeError(requiredText),
            clientZip: Yup.string().required(requiredText),
            clientEmail: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
            clientTaxId: Yup.string().max(20, 'La longitud debe ser menor a 20 caracteres'),
            isEnabled: Yup.boolean(),
            publicNote: Yup.string().max(4000, 'La longitud debe ser menor a 4000 caracteres')
          })}
          validateOnMount
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            setSubmitting(true)
            delete values.submit
            values.contacts = []
            values.users = []
            values.isEnabled = values.isEnabled ? 1 : 0
            const promise = () => new Promise((resolve) => {
              let data = null
              try {
                data = apiCallWithBody({ url: `${BASE_URL_API}/Clients/${selected}`, method: 'PUT', body: JSON.stringify(values) })

                if (contactsDeleted.length > 0) {
                  contactsDeleted.forEach(({ contactId }) => {
                    apiCall({ url: `${BASE_URL_API}/Contacts/${contactId}`, method: 'DELETE' })
                  })
                }
                if (contacts.length > 0) {
                  contacts.forEach((op) => {
                    apiCallWithBody({ url: `${BASE_URL_API}/Contacts`, method: 'POST', body: JSON.stringify(op) })
                  })
                }
              } catch (error) {
                return resolve({ status: 500, data: null })
              }
              if (data) {
                setStatus({ success: true })
                setSubmitting(false)
                handleCancel('', true)
              }
              return resolve({ status: data ? 200 : 404, data })
            })

            toast.promise(promise, {
              loading: 'Cargando...',
              success: () => {
                return `El cliente ${values.clientName} se editó correctamente`
              },
              error: 'Error al editar el cliente'
            })

            setInitVal({})
            setLoading(true)
            setLoadingContact(true)
            setPreContacts([])
            setContacts([])
            setContactsDeleted([])
          }}
        >
          {({ values, touched, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
            <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>

              <AuthContainer
                values={values}
                touched={touched}
                errors={errors}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
                handleChange={handleChange}
                contact={contact}
                contacts={contacts}
                handleAddNewContact={handleAddNewContact}
                handleCancel={handleCancel}
                handleChangeContact={handleChangeContact}
                handleDeleteContact={handleDeleteContact}
                loading={loadingContact}
                preContacts={preContacts}
                handleDeletePreContact={handleDeletePreContact}
              />

            </form>
          )}
        </Formik>
      </PerfectScrollBar>
    </Box>
  )
}

Edit.propTypes = {
  handleCancel: PropTypes.func,
  selected: PropTypes.number
}

export default Edit
