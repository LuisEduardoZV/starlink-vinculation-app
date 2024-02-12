import { useState } from 'react'

// mui imports
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { SYS_VERSION } from '../../config'
import useAuth from '../../hooks/useAuth'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import AuthLogin from './AuthLogin'

// assets
// import bg from '../../assets/image/starlink.png'
import bgLight from '../../assets/image/fondo-light.webp'
import tangerine from '../../assets/image/icon.png'
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
      maxHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundImage: (theme) => theme.palette.mode === 'light' ? `url(${bgLight})` : `url(${bg})`,
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundOrigin: 'border-box',
      backgroundPosition: 'bottom'
    }}
    >
      <Box
        sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'transparent' }}
      >
        <Typography
          variant='caption'
          py={1}
          bgcolor='transparent'
        >
          v{SYS_VERSION}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative', minWidth: 450, width: 'max-content', borderRadius: 2, zIndex: 5, animation: 'floating 3s ease-in-out infinite' }}>
        <MainMirrorCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 4, boxShadow: (theme) => theme.palette.mode === 'light' && '7px 7px 20px 1px #c8c8c8, -7px -7px 20px 1px #ffffff' }}>
          <img src={tangerine} alt='App icon' style={{ width: 90, height: 80 }} />
          <Typography variant='h2' textAlign='center' mt={1} sx={{ textShadow: (theme) => theme.palette.mode === 'light' ? `2px 2px 1px ${theme.palette.grey[400]}` : `1px 2px 1px ${theme.palette.primary[800]}`, color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }}>Starlink Vinculation App</Typography>
          <Box sx={{
            width: '100%',
            borderImage: (theme) => (`linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.7)}, ${theme.palette.primary.dark}, ${alpha(theme.palette.background.paper, 0.7)}) 30`),
            borderWidth: '0.06em',
            borderStyle: 'solid',
            mb: 3
          }}
          />
          <Formik
            initialValues={{
              user: 'demo@demo.com',
              password: 'demo'
            }}
            validationSchema={Yup.object().shape({
              user: Yup.string().required(requiredText),
              password: Yup.string().required(requiredText)
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const notify = toast.loading('Cargando...')
              try {
                setSubmitting(true)
                const account = await loginProvider(values.user, values.password)

                if (account === -1) {
                  toast.error('No tiene permisos suficientes para ingresar', { id: notify })
                } else if (account === -2) {
                  toast.success('Acceso denegado. Es necesario tener terminales vinculadas para acceder', { id: notify })
                } else if (account) {
                  toast.success(`Sesión iniciada. Bienvenido(a) ${account.fullName}`, { id: notify })
                } else {
                  toast.error('El usuario y/o contraseña no son correctos', { id: notify })
                }
              } catch (error) {
                toast.error('El usuario y/o contraseña no son correctos', { id: notify })
              }
            }}
          >
            {({ handleSubmit, handleBlur, handleChange, touched, errors, values, isSubmitting }) => (
              <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                <AuthLogin
                  errors={errors}
                  touched={touched}
                  values={values}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleMouseDownPassword={handleMouseDownPassword}
                  setShowPass={setShowPass}
                  isSubmitting={isSubmitting}
                  showPass={showPass}
                />
              </form>)}
          </Formik>
        </MainMirrorCard>
      </Box>
    </Box>
  )
}

export default Auth
