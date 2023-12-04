import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// third
import { isEmpty } from 'lodash'
import { toast } from 'sonner'

// mui imports
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'

// project imports
import InputSearch from '../../ui-components/InputSearch'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import ContactDetails from './ContactDetails'
import ContactEdit from './ContactEdit'
import ContactList from './ContactList'

// services
import { apiCall } from '../../contexts/api'

import { BASE_URL_API } from '../../config'

const getContactAvatar = (name) => {
  if (!name) return
  let avatar = ''
  name.trim().split(' ').forEach((op) => { avatar += op.charAt(0).toUpperCase() })
  return avatar
}

const Contacts = () => {
  const { clientId } = useParams()
  const navigate = useNavigate()

  const [render, setRender] = useState(null)

  const [contacts, setContacts] = useState([])
  const [user, setUser] = useState({})
  const [data, setData] = useState({})

  const convertData = (userData) =>
    userData.reduce((a, curr) => {
      const firstLatter = curr.contactName[0].toUpperCase()
      if (Object.prototype.hasOwnProperty.call(a, firstLatter)) {
        a[firstLatter].push(curr)
      } else {
        a[firstLatter] = [curr]
      }
      return a
    }, {})

  const handleDelete = (id) => {
    const promise = () => new Promise((resolve) => {
      let data = null
      try {
        data = apiCall({ url: `${BASE_URL_API}/Contacts/${id}`, method: 'DELETE' })
      } catch (error) {
        return resolve({ status: 500, data: null })
      }
      return resolve({ status: data ? 200 : 404, data })
    })

    toast.promise(promise, {
      loading: 'Procesando...',
      success: () => {
        setRender(Math.random() * 99999)
        return 'El contacto ha sido eliminado correctamente'
      },
      error: 'Error al eliminar el contacto'
    })
  }

  useEffect(() => {
    if (!clientId) { navigate(-1) }
    (async () => {
      try {
        const res = await apiCall({ url: `${BASE_URL_API}/getClientContactos?id=${clientId}` })
        // console.log(res)
        setContacts(res)
        setData(convertData(res))
      } catch (error) {
        console.log(error)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, clientId])

  useEffect(() => {
    setData(convertData(contacts))
    if (!isEmpty(user)) {
      const idx = contacts.findIndex((item) => item.contactId === user.contactId)
      if (idx > -1) setUser(contacts[idx])
    }
  }, [contacts, user])

  const [contactDetails, setContactDetails] = useState(false)
  const [contactEdit, setContactEdit] = useState(false)
  const [contactAdd, setContactAdd] = useState(false)
  const handleOnAdd = () => {
    setUser({
      contactId: 0,
      clientId,
      contactName: '',
      contactPosition: '',
      contactPhone: '',
      isEnabled: 1,
      publicNote: ''
    })
    setContactDetails(false)
    setContactEdit(true)
    setContactAdd(true)
  }

  const [open, setOpen] = useState(false)

  const handleClose = (id) => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>

        <Grid container spacing={3} pl={0}>
          <Grid item xs zeroMinWidth sx={{ display: contactDetails || contactEdit ? { xs: 'none', md: 'block' } : 'block', pl: 0 }}>
            <Grid container spacing={3} pl={0}>

              <Grid item xs={12} sx={{ '&.MuiGrid-item': { pl: 0 } }}>
                <Grid container pl={0}>
                  <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3 }}>
                    <Grid item xs zeroMinWidth>
                      <InputSearch handleSearch={() => {}} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='info'
                        startIcon={<PersonAddAltTwoToneIcon fontSize='small' />}
                        onClick={handleOnAdd}
                      >
                        Agregar
                      </Button>
                    </Grid>
                  </MainMirrorCard>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3, flexDirection: 'column' }}>
                    {Object.keys(data).map((key, index) => (
                      <Fragment key={index}>
                        <Grid item xs={12}>
                          <Typography variant='h4' color='primary' sx={{ fontSize: '1.5rem' }}>
                            {key.toUpperCase()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container direction='row' spacing={0}>
                            {data[key].map((userRow, i) => (
                              <Grid item xs={12} key={i}>
                                <ContactList
                                  avatar={getContactAvatar(userRow.contactName)}
                                  name={userRow.contactName}
                                  role={userRow.contactPosition}
                                  phone={userRow.contactPhone}
                                  onActive={() => {
                                    setUser(userRow)
                                    setContactDetails(true)
                                    setContactEdit(false)
                                    setContactAdd(false)
                                  }}
                                  onEditClick={() => {
                                    setUser(userRow)
                                    setContactDetails(false)
                                    setContactEdit(true)
                                    setContactAdd(false)
                                  }}
                                  onDeleteClick={() => {
                                    setUser(userRow)
                                    setContactDetails(false)
                                    setContactEdit(false)
                                    setContactAdd(false)
                                    setOpen(true)
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Fragment>
                    ))}
                  </MainMirrorCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {contactDetails && (
            <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' }, mt: 0 }}>
              <ContactDetails
                user={user}
                onEditClick={() => {
                  setContactDetails(false)
                  setContactEdit(true)
                  setContactAdd(false)
                }}
                onClose={() => {
                  setContactDetails(false)
                  setContactEdit(false)
                }}
                onDelete={() => {
                  setContactDetails(false)
                  setContactEdit(false)
                  setContactAdd(false)
                  setOpen(true)
                }}
              />
            </Grid>
          )}

          {contactEdit && (
            <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
              <ContactEdit
                user={user}
                isAdd={contactAdd}
                onFinish={(u) => {
                  if (u) setUser(u)
                  setContactDetails(true)
                  setContactEdit(false)
                  setRender(Math.random() * 99999)
                }}
                onCloseEdit={() => {
                  setContactDetails(true)
                  setContactEdit(false)
                  setContactAdd(false)
                }}
                onCloseAdd={() => {
                  setContactDetails(false)
                  setContactEdit(false)
                  setContactAdd(false)
                }}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      {
        user &&
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle component='div' id='alert-dialog-title' sx={{ color: 'white' }}>
              <Typography variant='h2' color='inherit'>
                Eliminar contacto
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.grey[500] }}>
                <b>¿Estás seguro de eliminar el contacto {user?.contactName}?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(user?.contactId)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default Contacts
