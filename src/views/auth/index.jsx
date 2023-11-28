import { useState } from 'react'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Box, Button, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import useAuth from '../../hooks/useAuth'
import InputCustom from '../../ui-components/InputCustom'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

// assets
import bg from '../../assets/image/opcion.jpg'

import { requiredText } from '../../utils/labelsErrorsFormik'

const Auth = () => {
  const { loginProvider } = useAuth()

  const [showPass, setShowPass] = useState(false)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box sx={{
      minWidth: '100vw',
      maxWidth: '100vw',
      width: '100%',
      minHeight: '100vh',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flex: 1,
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundOrigin: 'border-box',
      backgroundPosition: 'bottom'
    }}
    >
      <Box sx={{ position: 'absolute', p: 2, top: '30%', bottom: '30%', left: '15%', right: '60%', borderRadius: 2, zIndex: 5, animation: 'floating 3s ease-in-out infinite' }}>
        <MainMirrorCard>
          <Typography variant='h1' color='white' textAlign='right' mt={1} mb={3} sx={{ textShadow: (theme) => `1px 2px 1px ${theme.palette.primary[800]}` }}>Iniciar Sesión</Typography>
          <Formik
            initialValues={{
              user: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              user: Yup.string().required(requiredText),
              password: Yup.string().required(requiredText)
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              const notify = toast.loading('Cargando...')
              try {
                setSubmitting(true)
                const account = await loginProvider(values.user, values.password)

                if (account) {
                  toast.success(`Sesión iniciada como: ${values.user}`, { id: notify })
                } else {
                  toast.error('El usuario y/o contraseña no son correctos', { id: notify })
                }
              } catch (error) {
                toast.error('El usuario y/o contraseña no son correctos', { id: notify })
              }
            }}
          >
            {({ handleSubmit, handleBlur, handleChange, touched, errors, values, isSubmitting }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
                  <Tooltip arrow followCursor disableInteractive {...errors.user && { title: errors.user }}>
                    <InputCustom
                      label='Usuario'
                      fullWidth size='small'
                      error={Boolean(touched.user && errors.user)}
                      value={values.user}
                      name='user'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      InputProps={{ autoComplete: 'off' }}
                    />
                  </Tooltip>
                  <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
                    <InputCustom
                      label='Contraseña' fullWidth size='small'
                      type={showPass ? 'text' : 'password'}
                      error={Boolean(touched.password && errors.password)}
                      value={values.password}
                      name='password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      InputProps={{
                        autoComplete: 'off',
                        endAdornment: (
                          <InputAdornment position='end' sx={{ position: 'absolute', right: '2%', bgcolor: 'black' }}>
                            <IconButton size='small' sx={{ color: (theme) => theme.palette.primary[800] }} onClick={() => setShowPass(current => !current)} onMouseDown={handleMouseDownPassword}>
                              {showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                            </IconButton>
                          </InputAdornment>)
                      }}
                    />
                  </Tooltip>
                  <Button
                    variant='contained'
                    type='submit'
                    sx={{
                      width: '100%',
                      bgcolor: 'black',
                      color: 'white',
                      boxShadow: (theme) => theme.shadows[5],
                      transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
                      '&:hover': {
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: 'black'
                      }
                    }}
                    size='small'
                    disableElevation
                    disabled={isSubmitting}
                    onClick={() => {
                      if (errors.user && errors.password) toast.error('Es necesario que llene todos los campos para continuar')
                    }}
                  >Acceder
                  </Button>
                </Box>
              </form>)}
          </Formik>
        </MainMirrorCard>
      </Box>
    </Box>
  )
}

export default Auth
