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
