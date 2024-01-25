import { useState } from 'react'

// mui imports
import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import useAuth from '../../hooks/useAuth'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import AuthLogin from './AuthLogin'

// assets
import bg from '../../assets/image/starlink.png'

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
      alignItems: 'start',
      justifyContent: 'start',
      flex: 1,
      bgcolor: (theme) => theme.palette.common.black,
      overflow: 'hidden'
    }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '68%',
          height: '2px',
          bgcolor: 'white',
          boxShadow: '0 0 20px white, 0 0 20px white inset',
          top: '74%',
          transform: 'translate(0,-74%) rotate(-10deg)',
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          animation: 'blinkNeon 1.5s linear infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '25%',
          height: '8px',
          bgcolor: 'white',
          boxShadow: '0 0 20px white, 0 0 20px white inset',
          top: '10%',
          right: '15%',
          transform: 'translate(0,-10%) rotate(-70deg)',
          border: (theme) => `1px solid ${theme.palette.grey[200]}`,
          animation: 'blinkNeon 3s linear infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 350,
          height: 350,
          top: '35%',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.07),
          borderRadius: '50%',
          right: '21%',
          boxShadow: (theme) => `0px 0px 350px 350px ${alpha(theme.palette.grey[700], 0.05)}`,
          animation: 'floating 3s ease-in-out infinite'
        }}
      />
      <Box
        component='img'
        sx={{
          position: 'absolute',
          height: 500,
          width: 500,
          top: '15%',
          right: '15%',
          animation: 'floating 3s ease-in-out infinite'
        }}
        alt='Starlink product'
        src={bg}
      />
      <Box sx={{ position: 'relative', minWidth: 450, width: 'max-content', borderRadius: 2, zIndex: 5, mx: 5, my: 20 }}>
        <MainMirrorCard sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          py: 4,
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          bgcolor: 'transparent'
        }}
        >
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
