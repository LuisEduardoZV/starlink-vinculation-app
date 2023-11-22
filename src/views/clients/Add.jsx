import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

import { emailerrorText, phoneformatText, phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'

const Add = ({ handleCancel, data, setData }) => {
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    return () => setShowPass(false)
  }, [])

  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5 }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Agregar nuevo cliente</Typography>
      <Formik
        initialValues={{
          name: '',
          operator: '',
          position: '',
          user: '',
          password: '',
          email: '',
          phone: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(requiredText),
          operator: Yup.string().required(requiredText),
          position: Yup.string().required(requiredText),
          user: Yup.string().required(requiredText),
          password: Yup.string().max(255).required(requiredText),
          email: Yup.string().email(emailerrorText).max(255).required(requiredText),
          phone: Yup.string()
            .matches(/^[0-9]+$/, phoneformatText)
            .min(10, phonelenghtText)
            .max(10, phonelenghtText)
            .required(requiredText)
            .typeError(requiredText)
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.clientId = data.length + 1
          // console.log(values)
          const promise = () => new Promise((resolve) => {
            setTimeout(() => {
              const newData = [...data, values]
              setData(newData)
              return resolve({ status: 200 })
            }, 1000)
          })

          toast.promise(promise, {
            loading: 'Cargando...',
            success: () => {
              return `El cliente ${values.name} se agregó correctamente`
            },
            error: 'Error al agregar el cliente'
          })
          setTimeout(() => {
            setStatus({ success: true })
            setSubmitting(false)
            handleCancel()
          }, 1200)
        }}
      >
        {({ values, touched, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={5} width='100%'>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.name && { title: errors.name }}>
                  <TextField
                    value={values.name}
                    name='name'
                    label='Nombre de la empresa'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.name && errors.name)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.name && errors.name) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.operator && { title: errors.operator }}>
                  <TextField
                    value={values.operator}
                    name='operator'
                    label='Nombre del operador'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.operator && errors.operator)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.operator && errors.operator) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.position && { title: errors.position }}>
                  <TextField
                    value={values.position}
                    name='position'
                    label='Posicion dentro de la empresa'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.position && errors.position)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.position && errors.position) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.email && { title: errors.email }}>
                  <TextField
                    type='email'
                    value={values.email}
                    name='email'
                    label='Correo electrónico'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.email && errors.email)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.email && errors.email) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.phone && { title: errors.phone }}>
                  <TextField
                    value={values.phone}
                    name='phone'
                    label='Teléfono movil'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.phone && errors.phone)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.phone && errors.phone) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h4' my={5} sx={{ color: (theme) => theme.palette.grey[400] }}>
                Usuario para el cliente
              </Typography>
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Tooltip arrow followCursor disableInteractive {...errors.user && { title: errors.user }}>
                    <TextField
                      value={values.user}
                      name='user'
                      label='Usuario'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.user && errors.user)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.user && errors.user) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
                    <TextField
                      value={values.password}
                      name='password'
                      label='Contraseña'
                      type={showPass ? 'text' : 'password'}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      error={Boolean(touched.password && errors.password)}
                      required
                      sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        '& .MuiInputBase-input': {
                          color: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: !(touched.password && errors.password) && ((theme) => theme.palette.primary.main)
                        }
                      }}
                      InputProps={{
                        autoComplete: 'off',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowPass((show) => !show)}
                              onMouseDown={(e) => e.preventDefault()}
                              sx={{ color: (theme) => theme.palette.grey[400] }}
                            >{showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                            </IconButton>
                          </InputAdornment>)
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box width='100%' display='flex' justifyContent='space-evenly'>
                    <Button color='info' variant='outlined' type='submit' disabled={isSubmitting}>Agregar</Button>
                    <Button color='error' variant='outlined' onClick={handleCancel}>Cancelar</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

Add.propTypes = {
  handleCancel: PropTypes.func,
  setData: PropTypes.func,
  data: PropTypes.array
}

export default Add
