import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// third
import { isEmpty } from 'lodash'
import { toast } from 'sonner'

// mui imports
import { Box, Grid } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import AsideBackButton from '../../ui-components/AsideBackButton'
import HeaderSearchBox from '../../ui-components/HeaderSearchBox'
import ModalDelete from '../../ui-components/ModalDelete'
import ContactDetails from './ContactDetails'
import ContactEdit from './ContactEdit'
import ContactListContainer from './components/ContactListContainer'

// services
import { apiCall } from '../../contexts/api'

import { BASE_URL_API } from '../../config'

const Contacts = () => {
  const { user: userProfile } = useAuth()

  const { clientId } = useParams()
  const navigate = useNavigate()

  const [render, setRender] = useState(null)

  const [contacts, setContacts] = useState([])
  const [user, setUser] = useState({})
  const [data, setData] = useState({})

  const [loading, setLoading] = useState(true)

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
        setOpen(false)
        return 'El contacto ha sido eliminado correctamente'
      },
      error: 'Error al eliminar el contacto'
    })
  }

  useEffect(() => {
    if (!clientId) { navigate(-1) }
    (async () => {
      try {
        setLoading(true)
        const res = await apiCall({ url: `${BASE_URL_API}/getClientContactos?id=${clientId}` })

        setContacts(res)
        setData(convertData(res))
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => setLoading(true)
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

  const handleClose = () => {
    setOpen(false)
  }

  const onActive = (user) => {
    setUser(user)
    setContactDetails(true)
    setContactEdit(false)
    setContactAdd(false)
  }

  const onEdit = (user) => {
    setUser(user)
    setContactDetails(false)
    setContactEdit(true)
    setContactAdd(false)
  }

  const onDelete = (user) => {
    setUser(user)
    setContactDetails(false)
    setContactEdit(false)
    setContactAdd(false)
    setOpen(true)
  }

  const onEditDetails = () => {
    setContactDetails(false)
    setContactEdit(true)
    setContactAdd(false)
  }
  const onCloseDetails = () => {
    setContactDetails(false)
    setContactEdit(false)
  }
  const onDeleteDetails = () => {
    setContactDetails(false)
    setContactEdit(false)
    setContactAdd(false)
    setOpen(true)
  }

  const onFinish = (u) => {
    if (u) setUser(u)
    setContactDetails(true)
    setContactEdit(false)
    setRender(Math.random() * 99999)
  }
  const onCloseEdit = () => {
    setContactDetails(true)
    setContactEdit(false)
    setContactAdd(false)
  }
  const onCloseAdd = () => {
    setContactDetails(false)
    setContactEdit(false)
    setContactAdd(false)
  }

  return (
    <>
      {userProfile?.user?.isPowerUser && <AsideBackButton inFade />}
      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>

        <Grid container spacing={3} pl={0}>
          <Grid item xs zeroMinWidth sx={{ display: contactDetails || contactEdit ? { xs: 'none', md: 'block' } : 'block', pl: 0 }}>
            <Grid container spacing={3} pl={0}>

              <Grid item xs={12} sx={{ '&.MuiGrid-item': { pl: 0 } }}>
                <Grid container pl={0}>
                  <HeaderSearchBox title='Lista de contactos' handleOnAdd={handleOnAdd} />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <ContactListContainer
                    data={data}
                    loading={loading}
                    onActive={onActive}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    tamContacts={contacts.length}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {contactDetails && (
            <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' }, mt: 0 }}>
              <ContactDetails
                user={user}
                onEditClick={onEditDetails}
                onClose={onCloseDetails}
                onDelete={onDeleteDetails}
              />
            </Grid>
          )}

          {contactEdit && (
            <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
              <ContactEdit
                user={user}
                isAdd={contactAdd}
                onFinish={(u) => onFinish(u)}
                onCloseEdit={onCloseEdit}
                onCloseAdd={onCloseAdd}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      {
        user &&
          <ModalDelete
            title='Eliminar contacto'
            subtitle={<><b>¿Estás seguro de eliminar el contacto {user?.contactName}?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
            handleClose={handleClose}
            handleDelete={handleDelete}
            open={open}
            id={user?.contactId}
          />
      }
    </>
  )
}

export default Contacts
