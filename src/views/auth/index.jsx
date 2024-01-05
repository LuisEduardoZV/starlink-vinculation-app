import { useState } from 'react'

// mui imports
import { Box, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import useAuth from '../../hooks/useAuth'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import AuthLogin from './AuthLogin'

// assets
import bg from '../../assets/image/opcion.jpg'
import tangerine from '../../assets/image/tangerine.svg'

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
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundOrigin: 'border-box',
      backgroundPosition: 'bottom'
    }}
    >
      <Box sx={{ position: 'relative', minWidth: 450, width: 'max-content', borderRadius: 2, zIndex: 5, animation: 'floating 3s ease-in-out infinite' }}>
        <MainMirrorCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 4 }}>
          <img src={tangerine} alt='Tangerine icon' style={{ width: 90, height: 80 }} />
          <Typography variant='h1' color='white' textAlign='center' mt={1} sx={{ textShadow: (theme) => `1px 2px 1px ${theme.palette.primary[800]}`, letterSpacing: '0.1rem' }}>Tan-Graph</Typography>
          <Box sx={{
            width: '100%',
            borderImage: (theme) => (`linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.primary[800]}, ${theme.palette.background.paper}) 30`),
            borderWidth: '0.06em',
            borderStyle: 'solid',
            mb: 3
          }}
          />
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
                } else if (account) {
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
