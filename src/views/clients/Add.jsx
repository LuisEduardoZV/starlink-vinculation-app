import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import { Box, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import PerfectScrollBar from 'react-perfect-scrollbar'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import AuthContainer from './components/AuthContainer'

import { emailerrorText, phonelenghtText, requiredText, ziplenghtText } from '../../utils/labelsErrorsFormik'

import 'react-perfect-scrollbar/dist/css/styles.css'

const Add = ({ handleCancel, data, setData }) => {
  const [contacts, setContacts] = useState([])
  const [contact, setContact] = useState({ contactId: 0, clientId: 0, contactName: '', contactPosition: '', contactPhone: '', isEnabled: 1, publicNote: '', client: '' })

  const [loading, setLoading] = useState(false)

  const handleAddNewContact = (e) => {
    e.preventDefault()
    if (contact.contactName !== '' && contact.contactPosition !== '' && contact.contactPhone !== '') {
      setContacts([...contacts, contact])
      setContact({ contactId: 0, clientId: 0, contactName: '', contactPosition: '', contactPhone: '', isEnabled: 1, publicNote: '', client: '' })
    }
  }

  const handleChangeContact = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleDeleteContact = async (e, index) => {
    e.preventDefault()
    setLoading(true)
    const newContacts = contacts
    await newContacts.splice(index, 1)
    await setContacts(newContacts)
    setLoading(false)
  }

  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5, maxHeight: '70vh' }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Agregar nuevo cliente</Typography>
      <PerfectScrollBar style={{ maxHeight: 'calc(100vh-200px)', height: '100%', overflowX: 'hidden' }}>
        <Formik
          initialValues={{
            clientId: 0,
            clientName: '',
            clientNumber: '',
            clientAddress: '',
            clientPhone: '',
            clientZip: '',
            clientEmail: '',
            clientTaxId: '',
            isEnabled: 1,
            publicNote: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            clientName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
            clientNumber: Yup.string().max(50, 'La longitud debe ser menor a 50 caracteres'),
            clientAddress: Yup.string().max(2000, 'La longitud debe ser menor a 2000 caracteres').required(requiredText),
            clientPhone: Yup.string()
              .min(10, phonelenghtText)
              .required(requiredText)
              .typeError(requiredText),
            clientZip: Yup.string().min(5, ziplenghtText).required(requiredText),
            clientEmail: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
            clientTaxId: Yup.string().max(20, 'La longitud debe ser menor a 20 caracteres').required(requiredText),
            isEnabled: Yup.number(),
            publicNote: Yup.string().max(4000, 'La longitud debe ser menor a 4000 caracteres')
          })}
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            setSubmitting(true)
            delete values.submit
            values.contacts = contacts
            // console.log(values)
            const promise = () => new Promise((resolve) => {
              let data = null
              try {
                data = apiCallWithBody({ url: `${BASE_URL_API}/Clients`, method: 'POST', body: JSON.stringify(values) })
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
                return `El cliente ${values.clientName} se agregó correctamente`
              },
              error: 'Error al agregar el cliente'
            })
          }}
        >
          {({ values, touched, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
            <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>

              <AuthContainer
                values={values}
                touched={touched}
                errors={errors}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                handleBlur={handleBlur}
                handleChange={handleChange}
                contact={contact}
                contacts={contacts}
                handleAddNewContact={handleAddNewContact}
                handleCancel={handleCancel}
                handleChangeContact={handleChangeContact}
                handleDeleteContact={handleDeleteContact}
                loading={loading}
                isAdding
              />

            </form>
          )}
        </Formik>
      </PerfectScrollBar>
    </Box>
  )
}

Add.propTypes = {
  handleCancel: PropTypes.func,
  setData: PropTypes.func,
  data: PropTypes.array
}

export default Add
