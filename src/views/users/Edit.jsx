import PropTypes from 'prop-types'

// mui imports
import { Box, Button, Grid, Switch, Tooltip, Typography } from '@mui/material'

// third imports
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project improts
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'

import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleReset, data }) => {
  if (!data) return
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5, maxHeight: '70vh' }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Editar usuario</Typography>
      <Formik
        initialValues={{
          ...data,
          isAdmin: data === 1,
          isEnabled: data === 1
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
          email: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          password: Yup.string().required(requiredText),
          isAdmin: Yup.boolean(),
          isEnabled: Yup.boolean()
        })}
        onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
          setSubmitting(true)
          delete values.submit
          const dataForm = { ...values }
          dataForm.isAdmin = values.isAdmin ? 1 : 0
          dataForm.isEnabled = 1
          // console.log(values)
          const promise = () => new Promise((resolve) => {
            let data = null
            try {
              data = apiCallWithBody({ url: `${BASE_URL_API}/Users/${values.userId}`, method: 'PUT', body: JSON.stringify(dataForm) })
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
              handleReset('', true)
              resetForm()
              return `El usuario ${values.fullName} se editó correctamente`
            },
            error: 'Error al editar el usuario'
          })
        }}
      >
        {({ values, touched, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Tooltip arrow followCursor disableInteractive {...errors.fullName && { title: errors.fullName }}>
                  <InputBase
                    name='fullName'
                    value={values.fullName}
                    label='Nombre'
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.fullName && errors.fullName)}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4} position='relative'>
                <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '30%', left: '19%', fontSize: '10px' }}>Estatus</Typography>
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
              <Grid item xs={8}>
                <Tooltip arrow followCursor disableInteractive {...errors.email && { title: errors.email }}>
                  <InputBase
                    name='email'
                    value={values.email}
                    label='Correo electrónico'
                    type='email'
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.email && errors.email)}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4} position='relative'>
                <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '30%', left: '19%', fontSize: '10px' }}>Tipo de usuario</Typography>
                <Box display='flex' alignItems='center' width='100%' justifyContent='center' mt={2} gap={2}>
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => values.isAdmin ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: !values.isAdmin && '800',
                      fontSize: !values.isAdmin && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Normal
                  </Typography>
                  <Switch
                    color='primary'
                    size='small'
                    checked={values.isAdmin}
                    name='isAdmin'
                    onChange={handleChange}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => !values.isAdmin ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: values.isAdmin && '800',
                      fontSize: values.isAdmin && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Administrador
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
                  <InputBase
                    name='password'
                    value={values.password}
                    label='Contraseña'
                    type='password'
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.password && errors.password)}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                      autocomplete: 'new-password',
                      form: {
                        autocomplete: 'off'
                      }
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Box width='100%' mt={5} display='flex' justifyContent='flex-end'>
              <Button type='submit' variant='outlined' color='info' disabled={isSubmitting}>
                Guardar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

Edit.propTypes = {
  handleReset: PropTypes.func,
  data: PropTypes.object
}

export default Edit
