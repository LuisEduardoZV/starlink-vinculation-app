import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// material-ui
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'
import { createTheme } from '@mui/material/styles'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'


// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const ContactEdit = ({ user, isAdd, onFinish, onCloseEdit, onCloseAdd, ...others }) => {
  const [initVal, setInitVal] = useState({ ...user, isEnabled: user.isEnabled === 1 })
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    setInitVal({ ...user, isEnabled: user.isEnabled === 1 })
  }, [user, isAdd])

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        '2xl': 1900
      }
    }
  })

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  return (
    <MainMirrorCard sx={{
      width: '100%',
      maxWidth: 342,
      p: 0,
      position: 'fixed',
      top: matchDown2Xl ? '16%' : '12.5%'
    }}
    >
      <Formik
        enableReinitialize
        initialValues={initVal}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
          email: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          password: Yup.string().required(requiredText),
          isAdmin: Yup.boolean(),
          isEnabled: Yup.boolean()
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.isEnabled = values.isEnabled ? 1 : 0
          // console.log(contacts)
          // console.log(values.clientId)
          // console.log(values)
          const promise = () => new Promise((resolve) => {
            let data = null
            try {
              if (isAdd) {
                data = apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers`, method: 'POST', body: JSON.stringify(values) })
              } else {
                data = apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers/${values.powerUser_Id}`, method: 'PUT', body: JSON.stringify(values) })
              }
            } catch (error) {
              return resolve({ status: 500, data: null })
            }
            if (data) {
              setStatus({ success: true })
              setSubmitting(false)
            }
            return resolve({ status: data ? 200 : 404, data })
          })

          toast.promise(promise, {
            loading: 'Cargando...',
            success: () => {
              onFinish(values)
              if (isAdd) return `El Super Usuario ${values.fullName} se agregó correctamente`
              return `El Super Usuario ${values.fullName} se editó correctamente`
            },
            error: isAdd ? 'Error al agregar el Super Usuario' : 'Error al editar el Super Usuario'
          })
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <PerfectScrollbar style={{ height: 'auto', overflowX: 'hidden' }}>
              <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={12}>
                  <Typography variant='h2' color='whitesmoke'>
                    {isAdd ? 'Nuevo Super Usuario' : 'Editando un Super Usuario'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.fullName && { title: errors.fullName }}>
                    <InputBase
                      label='Nombre'
                      name='fullName'
                      value={values.fullName}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.fullName && errors.fullName)}
                      required
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.email && { title: errors.email }}>
                    <InputBase
                      label='Correo Electrónico'
                      type='email'
                      name='email'
                      value={values.email}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      required
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
                    <InputBase
                      label='Contraseña'
                      type={showPass ? 'text' : 'password'}
                      name='password'
                      value={values.password}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton size='small' onClick={() => setShowPass(current => !current)}>
                              {showPass ? <VisibilityTwoToneIcon sx={{ color: 'grey.500' }} fontSize='small' /> : <VisibilityOffTwoToneIcon sx={{ color: 'grey.500' }} fontSize='small' />}
                            </IconButton>
                          </InputAdornment>)
                      }}
                    />
                  </Tooltip>
                </Grid>
                {!isAdd && (
                  <Grid item xs={12} position='relative' justifyContent='start'>
                    <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '40%', left: '12%', fontSize: '10px' }}>Estatus</Typography>
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
                )}

                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='error' fullWidth onClick={isAdd ? onCloseAdd : onCloseEdit}>
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='info' fullWidth type='submit'>
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PerfectScrollbar>
          </form>
        )}
      </Formik>
    </MainMirrorCard>
  )
}

ContactEdit.propTypes = {
  user: PropTypes.object,
  isAdd: PropTypes.bool,
  onFinish: PropTypes.func,
  onCloseEdit: PropTypes.func,
  onCloseAdd: PropTypes.func
}

export default ContactEdit
