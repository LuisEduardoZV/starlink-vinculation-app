/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// third
import { isEmpty } from 'lodash'
import { toast } from 'sonner'

// mui imports
import { Box, Grid } from '@mui/material'

// project imports
import useAuth from '../../hooks/useAuth'
import HeaderSearchBox from '../../ui-components/HeaderSearchBox'
import ModalDelete from '../../ui-components/ModalDelete'
import PowerUserList from './PowerUserList'
import UserEdit from './UserEdit'

// services
import { useDispatch, useSelector } from '../../store'
import { deleteUser, getUsers, resetErrorUsed } from '../../store/slices/superUsers'

const toastId = toast()

const SuperUsers = () => {
  const { user: login } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { users, error, success, loading } = useSelector((state) => state.superUsers)

  const [mainData, setMainData] = useState([])
  const [powerUsers, setPowerUsers] = useState([])
  const [user, setUser] = useState({})

  const handleDelete = (id) => {
    const toastId = toast.loading('Cargando...')
    dispatch(deleteUser(id))

    if (success) {
      setOpen(false)
      toast.success('El usuario ha sido eliminado correctamente', { id: toastId })
    } else {
      setOpen(false)
    }
  }

  const handleSearch = (e, filters) => {
    if (filters.length === 0) {
      setPowerUsers(mainData)
    } else {
      const newRows = []
      const available = mainData

      for (let j = 0; j < filters.length; j += 1) {
        for (let i = 0; i < available.length; i += 1) {
          if (
            available[i].fullName.toLowerCase().includes(filters[j].trim().toLowerCase()) ||
            available[i].email.toLowerCase().includes(filters[j].trim().toLowerCase())
          ) {
            if (!newRows.find((value) => value === available[i])) { newRows.push(available[i]) }
          }
        }
      }
      setPowerUsers(newRows)
    }
  }

  useEffect(() => {
    if (!login || !login.user.isPowerUser) navigate('/terminals')
  }, [login])

  useEffect(() => {
    setMainData(users)
    setPowerUsers(users)
  }, [users])
  useEffect(() => {
    if (error) {
      toast.error(error?.message, { id: toastId })
      dispatch(resetErrorUsed())
    }
  }, [error])

  useEffect(() => {
    (async () => {
      dispatch(getUsers())
    })()
  }, [])

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
                    handleSearch={handleSearch}
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
              <UserEdit
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
