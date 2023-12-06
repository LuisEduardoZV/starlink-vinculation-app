import { Fragment, useEffect, useState } from 'react'

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
import ContactEdit from './ContactEdit'
import PowerUserList from './PowerUserList'

// services
import { apiCall } from '../../contexts/api'

import { BASE_URL_API } from '../../config'

const SuperUsers = () => {
  const [render, setRender] = useState(null)

  const [mainData, setMainData] = useState([])
  const [powerUsers, setPowerUsers] = useState([])
  const [user, setUser] = useState({})

  const [loading, setLoading] = useState(true)

  const handleDelete = (id) => {
    const promise = () => new Promise((resolve) => {
      let data = null
      try {
        data = apiCall({ url: `${BASE_URL_API}/PowerUsers/${id}`, method: 'DELETE' })
      } catch (error) {
        return resolve({ status: 500, data: null })
      }
      return resolve({ status: data ? 200 : 404, data })
    })

    toast.promise(promise, {
      loading: 'Procesando...',
      success: () => {
        setRender(Math.random() * 99999)
        return 'El Super Usuario ha sido eliminado correctamente'
      },
      error: 'Error al eliminar el Super Usuario'
    })
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await apiCall({ url: `${BASE_URL_API}/PowerUsers` })
        setMainData(res)
        setPowerUsers(res)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setLoading(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render])

  useEffect(() => {
    if (!isEmpty(user)) {
      const idx = powerUsers.findIndex((item) => item.powerUser_Id === user.powerUser_Id)
      if (idx > -1) setUser(powerUsers[idx])
    }
  }, [powerUsers, user])

  const [contactDetails, setContactDetails] = useState(false)
  const [contactEdit, setContactEdit] = useState(false)
  const [contactAdd, setContactAdd] = useState(false)
  const handleOnAdd = () => {
    setUser({
      powerUser_Id: 0,
      fullName: '',
      email: '',
      password: '',
      isEnabled: 1
    })
    setContactDetails(false)
    setContactEdit(true)
    setContactAdd(true)
  }

  const [open, setOpen] = useState(false)

  const handleClose = (id) => {
    setOpen(false)
  }

  const onEditClick = (user) => {
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

  return (
    <>
      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Grid container spacing={3} pl={0}>
          <Grid item xs zeroMinWidth sx={{ display: contactDetails || contactEdit ? { xs: 'none', md: 'block' } : 'block', pl: 0 }}>
            <Grid container spacing={3} pl={0}>

              <Grid item xs={12} sx={{ '&.MuiGrid-item': { pl: 0 } }}>
                <Grid container pl={0}>
                  <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color='white' variant='h2'>Lista de Super Usuarios</Typography>
                    </Box>
                    <Box minWidth='40%'>
                      <InputSearch handleSearch={() => {}} />
                    </Box>
                    <Box>
                      <Button
                        variant='contained'
                        color='info'
                        size='small'
                        startIcon={<PersonAddAltTwoToneIcon fontSize='small' />}
                        onClick={handleOnAdd}
                      >
                        Agregar
                      </Button>
                    </Box>
                  </MainMirrorCard>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3, flexDirection: 'column' }}>
                    <PowerUserList data={powerUsers} mainData={mainData} loading={loading} onEdit={onEditClick} onDelete={onDelete} />
                  </MainMirrorCard>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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
                Eliminar Super Usuario
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.grey[500] }}>
                <b>¿Estás seguro de eliminar el Super Usuario {user?.fullName} ({user?.email})?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
              <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
              <Button onClick={() => handleDelete(user?.powerUser_Id)} variant='outlined' color='info'>
                Aceptar y Eliminar
              </Button>
            </DialogActions>
          </Dialog>
      }
    </>
  )
}

export default SuperUsers
