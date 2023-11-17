import { useNavigate } from 'react-router-dom'

// mui imports
import { Box, Button, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import InputCustom from '../../ui-components/InputCustom'

// assets
import bg from '../../assets/image/opcion.jpg'

const Auth = () => {
  const navigate = useNavigate()

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
      backgroundSize: 'cover'
    }}
    >
      <Box sx={{ bgcolor: 'rgb(255 255 255 / 0.1)', position: 'absolute', p: 2, top: '30%', bottom: '30%', left: '15%', right: '65%', borderRadius: 2, backdropFilter: 'blur(8px)', boxShadow: (theme) => theme.shadows[10], animation: 'floating 3s ease-in-out infinite' }}>
        <Typography variant='h1' color='white' textAlign='right' mt={1} mb={3} sx={{ textShadow: '4px 4px 3px black' }}>Iniciar Sesión</Typography>
        <Formik
          initialValues={{
            user: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            user: Yup.string().required(),
            password: Yup.string().required()
          })}
          onSubmit={async (values) => {
            const promise = () => new Promise((resolve) => setTimeout(() => { return resolve({ status: 200 }) }, 1000))

            toast.promise(promise, {
              loading: 'Loading...',
              success: () => {
                return `Sesión iniciada como: ${values.user}`
              },
              error: 'Error'
            })
            setTimeout(() => { navigate('home', { replace: true }) }, 500)
          }}
        >
          {({ handleSubmit, handleBlur, handleChange, touched, errors, values, isValid, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
                <InputCustom
                  label='Usuario o correo'
                  fullWidth size='small'
                  error={Boolean(touched.user && errors.user)}
                  value={values.user}
                  name='user'
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <InputCustom
                  label='Contraseña' fullWidth size='small' type='password' error={Boolean(touched.password && errors.password)}
                  value={values.password}
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Button variant='contained' type='submit' sx={{ width: '50%', bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'white', color: 'black' } }} size='small' disableElevation disabled={!isValid || isSubmitting}>Login</Button>
              </Box>
            </form>)}
        </Formik>
      </Box>
    </Box>
  )
}

export default Auth
