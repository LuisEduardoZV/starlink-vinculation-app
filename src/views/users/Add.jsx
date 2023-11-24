import PropTypes from 'prop-types'

// mui imports
import { Autocomplete, Box, Button, Grid, TextField, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'

const clients = [
  {
    ClientId: '1',
    ClientNumber: 'ABC123',
    ClientAddress: '123 Main St',
    ClientPhone: '555-1234',
    ClientZip: '12345',
    ClientEmail: 'example@example.com',
    ClientTaxId: 'A1B2C3D4E5F6G7',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ClientName: 'John Doe'
  },
  {
    ClientId: '5',
    ClientNumber: 'MNO345',
    ClientAddress: '345 Maple St',
    ClientPhone: '555-7890',
    ClientZip: '56789',
    ClientEmail: 'example5@example.com',
    ClientTaxId: 'C9D8E7F6G5H4I3',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae.',
    ClientName: 'Michael Johnson'
  },
  {
    ClientId: '8',
    ClientNumber: 'VWX234',
    ClientAddress: '234 Oak St',
    ClientPhone: '555-5678',
    ClientZip: '45678',
    ClientEmail: 'example8@example.com',
    ClientTaxId: 'X5Y6Z7A8B9C0D1',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse.',
    ClientName: 'Catherine Thompson'
  },
  {
    ClientId: '10',
    ClientNumber: 'BCD890',
    ClientAddress: '890 Elm St',
    ClientPhone: '555-2345',
    ClientZip: '34567',
    ClientEmail: 'example10@example.com',
    ClientTaxId: 'K6L7M8N9O0P1Q2',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas.',
    ClientName: 'Michelle Davis'
  },
  {
    ClientId: '11',
    ClientNumber: 'CDE901',
    ClientAddress: '901 Cedar St',
    ClientPhone: '555-6789',
    ClientZip: '90123',
    ClientEmail: 'example11@example.com',
    ClientTaxId: 'R2S3T4U5V6W7X8',
    isEnabled: '0',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas. Integer.',
    ClientName: 'Daniel Johnson'
  },
  {
    ClientId: '13',
    ClientNumber: 'FGH567',
    ClientAddress: '567 Oak St',
    ClientPhone: '555-2345',
    ClientZip: '67890',
    ClientEmail: 'example13@example.com',
    ClientTaxId: 'F2G3H4I5J6K7L8',
    isEnabled: '1',
    PublicNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vulputate, neque at congue efficitur, ligula sem gravida arcu, at tincidunt quam nisl ac nibh. Sed eget tellus vitae. Nunc. Ut. Suspendisse. Fusce. Maecenas. Integer. Proin. Aliquam.',
    ClientName: 'Olivia Davis'
  }
]

const Add = ({ handleCancel, data, setData }) => {
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5 }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Agregar nuevo usuario</Typography>
      <Formik
        initialValues={{
          UserId: 0,
          ClientId: '',
          FullName: '',
          Email: '',
          Password: '',
          IsEnabled: 1,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          ClientId: Yup.string().required(requiredText),
          FullName: Yup.string().required(requiredText),
          Email: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          Password: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          IsEnabled: Yup.number()
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.UserId = data.length + 1
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
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.FullName && { title: errors.FullName }}>
                  <TextField
                    value={values.FullName}
                    name='FullName'
                    label='Nombre completo'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.FullName && errors.FullName)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.FullName && errors.FullName) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.ClientId && { title: errors.ClientId }}>
                  <Autocomplete
                    id='combo-box-demo'
                    options={clients}
                    getOptionLabel={(option) => option.ClientName}
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientId && errors.ClientId) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    renderInput={(params) => <TextField {...params} label='Movie' />}
                  />
                  {/*
                  <TextField
                    value={values.ClientId}
                    name='ClientId'
                    label='Seleccione un Cliente'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.ClientId && errors.ClientId)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.ClientId && errors.ClientId) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  /> */}
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.Email && { title: errors.Email }}>
                  <TextField
                    value={values.Email}
                    name='Email'
                    type='email'
                    label='Correo eletrónico'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.Email && errors.Email)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.Email && errors.Email) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.Password && { title: errors.Password }}>
                  <TextField
                    value={values.Password}
                    name='Password'
                    label='Contraseña'
                    type='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.Password && errors.Password)}
                    required
                    sx={{
                      boxShadow: (theme) => theme.shadows[5],
                      '& .MuiInputBase-input': {
                        color: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: !(touched.Password && errors.Password) && ((theme) => theme.palette.primary.main)
                      }
                    }}
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Box width='100%' display='flex' justifyContent='flex-end' height='100%' mt={5} gap={10}>
              <Button color='info' variant='outlined' type='submit' disabled={isSubmitting} sx={{ alignSelf: 'flex-end' }}>Agregar</Button>
              <Button color='error' variant='outlined' onClick={handleCancel} sx={{ alignSelf: 'flex-end' }}>Cancelar</Button>
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
