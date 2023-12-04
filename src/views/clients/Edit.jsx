import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import { Box, Button, Grid, Switch, TextField, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { PatternFormat } from 'react-number-format'
import PerfectScrollBar from 'react-perfect-scrollbar'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'
import LoadingInfo from '../../ui-components/LoadingInfo'
import NewContactRow from './NewContactRow'

import { emailerrorText, phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleCancel, selected, data, setData }) => {
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
            console.log('entro')
            setSubmitting(true)
            delete values.submit
            values.contacts = []
            values.users = []
            values.isEnabled = values.isEnabled ? 1 : 0
            // console.log(contacts)
            // console.log(values.clientId)
            // console.log(values)
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

              <Grid container spacing={5} width='100%'>
                <Grid item xs={12} md={5}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientName && { title: errors.clientName }}>
                    <TextField
                      value={values.clientName}
                      name='clientName'
                      label='Nombre del cliente'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      required
                      color='primary'
                      error={Boolean(touched.clientName && errors.clientName)}
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientName && errors.clientName) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientTaxId && { title: errors.clientTaxId }}>
                    <TextField
                      value={values.clientTaxId}
                      name='clientTaxId'
                      label='CURP / ID'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.clientTaxId && errors.clientTaxId)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientTaxId && errors.clientTaxId) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientNumber && { title: errors.clientNumber }}>
                    <TextField
                      value={values.clientNumber}
                      name='clientNumber'
                      label='Número de cliente'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.clientNumber && errors.clientNumber)}
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientNumber && errors.clientNumber) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{
                        autoComplete: 'off'
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientAddress && { title: errors.clientAddress }}>
                    <TextField
                      value={values.clientAddress}
                      name='clientAddress'
                      label='Dirección'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.clientAddress && errors.clientAddress)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientAddress && errors.clientAddress) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientZip && { title: errors.clientZip }}>
                    <TextField
                      value={values.clientZip}
                      name='clientZip'
                      label='Código postal'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.clientZip && errors.clientZip)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientZip && errors.clientZip) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientPhone && { title: errors.clientPhone }}>
                    <Box>
                      <PatternFormat
                        format='+1 (###) ###-####'
                        mask='_'
                        type='tel'
                        customInput={InputBase}
                        value={values.clientPhone}
                        name='clientPhone'
                        label='Teléfono movil'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant='filled'
                        size='small'
                        fullWidth
                        color='primary'
                        required
                        error={Boolean(touched.clientAddress && errors.clientAddress)}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Tooltip arrow followCursor disableInteractive {...errors.clientEmail && { title: errors.clientEmail }}>
                    <TextField
                      value={values.clientEmail}
                      name='clientEmail'
                      type='email'
                      label='Correl eletrónico'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.clientEmail && errors.clientEmail)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.clientEmail && errors.clientEmail) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={3} position='relative'>
                  <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '40%', left: '19%', fontSize: '10px' }}>Estatus</Typography>
                  <Box display='flex' alignItems='center' width='100%' justifyContent='center' mt={2} gap={2}>
                    <Typography
                      variant='caption'
                      sx={{
                        color: (theme) => values.isEnabled ? theme.palette.grey[500] : theme.palette.grey[300],
                        fontWeight: !values.isEnabled && '800',
                        fontSize: !values.isEnabled && '13px',
                        transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                      }}
                    >Inactivo
                    </Typography>
                    <Switch
                      color='primary'
                      size='small'
                      checked={values.isEnabled}
                      name='isEnabled'
                      onChange={handleChange}
                    />
                    <Typography
                      variant='caption'
                      sx={{
                        color: (theme) => !values.isEnabled ? theme.palette.grey[500] : theme.palette.grey[300],
                        fontWeight: values.isEnabled && '800',
                        fontSize: values.isEnabled && '13px',
                        transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                      }}
                    >Activo
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.publicNote && { title: errors.publicNote }}>
                    <TextField
                      value={values.publicNote}
                      name='publicNote'
                      label='Notas'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      multiline
                      rows={3}
                      color='primary'
                      error={Boolean(touched.publicNote && errors.publicNote)}
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.publicNote && errors.publicNote) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{
                        autoComplete: 'off'
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant='h4' sx={{
                      color: (theme) => theme.palette.grey[500]
                    }}
                  >Contáctos
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} gap={3} display='flex' flexDirection='column'>
                      {!loadingContact && preContacts.map((op, index) => (
                        <NewContactRow key={index} handleDeleteContact={handleDeletePreContact} index={index} {...op} />
                      ))}
                      {!loadingContact && contacts.map((op, index) => (
                        <NewContactRow key={index} handleDeleteContact={handleDeleteContact} index={index} {...op} />
                      ))}
                      <Grid container spacing={3} alignItems='center'>
                        <Grid item xs={12} md={3}>
                          <InputBase
                            value={contact.contactName}
                            name='contactName'
                            label='Nombre'
                            onChange={handleChangeContact}
                            variant='filled'
                            size='small'
                            fullWidth
                            color='primary'
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <InputBase
                            value={contact.contactPosition}
                            name='contactPosition'
                            label='Posición de trabajo'
                            onChange={handleChangeContact}
                            variant='filled'
                            size='small'
                            fullWidth
                            color='primary'
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <PatternFormat
                            format='+1 (###) ###-####'
                            mask='_'
                            type='tel'
                            customInput={InputBase}
                            value={contact.contactPhone}
                            name='contactPhone'
                            label='Teléfono movil'
                            onChange={handleChangeContact}
                            variant='filled'
                            size='small'
                            fullWidth
                            color='primary'
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <InputBase
                            value={contact.publicNote}
                            name='publicNote'
                            label='Nota'
                            onChange={handleChangeContact}
                            variant='filled'
                            size='small'
                            fullWidth
                            color='primary'
                          />
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button
                            color='info'
                            size='small'
                            startIcon={<AddCircleTwoToneIcon />}
                            onClick={(e) => handleAddNewContact(e, values.clientId)}
                          >Agregar...
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box width='100%' display='flex' justifyContent='space-evenly' height='100%'>
                        <Button color='info' variant='outlined' type='submit' disabled={isSubmitting} sx={{ alignSelf: 'flex-start' }}>Editar</Button>
                        <Button color='error' variant='outlined' onClick={handleCancel} sx={{ alignSelf: 'flex-start' }}>Cancelar</Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </form>
          )}
        </Formik>
      </PerfectScrollBar>
    </Box>
  )
}

Edit.propTypes = {
  handleCancel: PropTypes.func,
  selected: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.array
}

export default Edit
