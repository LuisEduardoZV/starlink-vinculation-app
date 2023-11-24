import PropTypes from 'prop-types'

// mui imports
import { Box, Button, Grid, TextField, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

import { emailerrorText, phoneformatText, phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'

const Add = ({ handleCancel, data, setData }) => {
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5 }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Agregar nuevo cliente</Typography>
      <Formik
        initialValues={{
          ClientId: 0,
          ClientName: '',
          ClientNumber: '',
          ClientAddress: '',
          ClientPhone: '',
          ClientZip: '',
          ClientEmail: '',
          ClientTaxId: '',
          isEnabled: 1,
          PublicNote: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          ClientName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres'),
          ClientNumber: Yup.string().max(50, 'La longitud debe ser menor a 50 caracteres'),
          ClientAddress: Yup.string().max(2000, 'La longitud debe ser menor a 2000 caracteres').required(requiredText),
          ClientPhone: Yup.string()
            .matches(/^[0-9]+$/, phoneformatText)
            .min(10, phonelenghtText)
            .max(10, phonelenghtText)
            .required(requiredText)
            .typeError(requiredText),
          ClientZip: Yup.string().required(requiredText),
          ClientEmail: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          ClientTaxId: Yup.string().max(20, 'La longitud debe ser menor a 20 caracteres'),
          isEnabled: Yup.number(),
          PublicNote: Yup.string().max(4000, 'La longitud debe ser menor a 4000 caracteres')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.ClientId = data.length + 1
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
              return `El cliente ${values.ClientTaxId} se agregó correctamente`
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
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientTaxId && { title: errors.ClientTaxId }}>
                  <TextField
                    value={values.ClientTaxId}
                    name='ClientTaxId'
                    label='CURP / ID'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientTaxId && errors.ClientTaxId)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientTaxId && errors.ClientTaxId) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientEmail && { title: errors.ClientEmail }}>
                  <TextField
                    value={values.ClientEmail}
                    name='ClientEmail'
                    type='email'
                    label='Correl eletrónico'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientEmail && errors.ClientEmail)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientEmail && errors.ClientEmail) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientPhone && { title: errors.ClientPhone }}>
                  <TextField
                    value={values.ClientPhone}
                    name='ClientPhone'
                    label='Teléfono movil'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientPhone && errors.ClientPhone)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientPhone && errors.ClientPhone) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientAddress && { title: errors.ClientAddress }}>
                  <TextField
                    value={values.ClientAddress}
                    name='ClientAddress'
                    label='Dirección'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientAddress && errors.ClientAddress)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientAddress && errors.ClientAddress) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={4}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientZip && { title: errors.ClientZip }}>
                  <TextField
                    value={values.ClientZip}
                    name='ClientZip'
                    label='Código postal'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientZip && errors.ClientZip)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientZip && errors.ClientZip) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h4' my={5} sx={{ color: (theme) => theme.palette.grey[400] }}>
                Información adicional
              </Typography>
              <Grid container spacing={5}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                      <Tooltip arrow followCursor disableInteractive {...errors.ClientName && { title: errors.ClientName }}>
                        <TextField
                          value={values.ClientName}
                          name='ClientName'
                          label='Nombre del cliente'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant='filled'
                          size='small'
                          fullWidth
                          color='primary'
                          error={Boolean(touched.ClientName && errors.ClientName)}
                          sx={{
                            boxShadow: (theme) => theme.shadows[5],
                            '& .MuiInputBase-input': {
                              color: 'white'
                            },
                            '& .MuiInputLabel-root': {
                              color: !(touched.ClientName && errors.ClientName) && ((theme) => theme.palette.primary.main)
                            }
                          }}
                          InputProps={{ autoComplete: 'off' }}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Tooltip arrow followCursor disableInteractive {...errors.ClientNumber && { title: errors.ClientNumber }}>
                        <TextField
                          value={values.ClientNumber}
                          name='ClientNumber'
                          label='Número de cliente'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant='filled'
                          size='small'
                          fullWidth
                          color='primary'
                          error={Boolean(touched.ClientNumber && errors.ClientNumber)}
                          sx={{
                            boxShadow: (theme) => theme.shadows[5],
                            '& .MuiInputBase-input': {
                              color: 'white'
                            },
                            '& .MuiInputLabel-root': {
                              color: !(touched.ClientNumber && errors.ClientNumber) && ((theme) => theme.palette.primary.main)
                            }
                          }}
                          InputProps={{
                            autoComplete: 'off'
                          }}
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Tooltip arrow followCursor disableInteractive {...errors.PublicNote && { title: errors.PublicNote }}>
                        <TextField
                          value={values.PublicNote}
                          name='PublicNote'
                          label='Notas'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          variant='filled'
                          size='small'
                          fullWidth
                          multiline
                          rows={3}
                          color='primary'
                          error={Boolean(touched.PublicNote && errors.PublicNote)}
                          sx={{
                            boxShadow: (theme) => theme.shadows[5],
                            '& .MuiInputBase-input': {
                              color: 'white'
                            },
                            '& .MuiInputLabel-root': {
                              color: !(touched.PublicNote && errors.PublicNote) && ((theme) => theme.palette.primary.main)
                            }
                          }}
                          InputProps={{
                            autoComplete: 'off'
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4} alignItems='flex-end' justifyContent='flex-end'>
                  <Box width='100%' display='flex' justifyContent='space-evenly' height='100%'>
                    <Button color='info' variant='outlined' type='submit' disabled={isSubmitting} sx={{ alignSelf: 'flex-end' }}>Agregar</Button>
                    <Button color='error' variant='outlined' onClick={handleCancel} sx={{ alignSelf: 'flex-end' }}>Cancelar</Button>
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
