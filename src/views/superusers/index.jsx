import { useEffect, useState } from 'react'

// third
import { isEmpty } from 'lodash'
import { toast } from 'sonner'

// mui imports
import { Box, Grid } from '@mui/material'

// project imports
import HeaderSearchBox from '../../ui-components/HeaderSearchBox'
import ModalDelete from '../../ui-components/ModalDelete'
import ContactEdit from './ContactEdit'
import PowerUserList from './PowerUserList'

// services
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'

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

  const handleClose = () => {
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
      <Box sx={{ display: 'flex', flex: 1, px: '10%' }}>
        <Grid container spacing={3} pl={0}>
          <Grid item xs zeroMinWidth sx={{ display: contactDetails || contactEdit ? { xs: 'none', md: 'block' } : 'block', pl: 0 }}>
            <Grid container spacing={3} pl={0}>

              <Grid item xs={12} sx={{ '&.MuiGrid-item': { pl: 0 } }}>
                <Grid container pl={0}>
                  <HeaderSearchBox
                    handleOnAdd={handleOnAdd}
                    title='Lista de Super Usuarios'
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <PowerUserList data={powerUsers} mainData={mainData} loading={loading} onEdit={onEditClick} onDelete={onDelete} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {contactEdit && (
            <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
              <ContactEdit
                user={user}
                isAdd={contactAdd}
                onFinish={(u) => { onFinish(u) }}
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
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            id={user?.powerUser_Id}
            title='Eliminar Super Usuario'
            subtitle={<><b>¿Estás seguro de eliminar el Super Usuario {user?.fullName} ({user?.email})?</b> Al dar click en aceptar, esta de acuerdo que no podrá recuperar la información.</>}
          />
      }
    </>
  )
}

export default SuperUsers
