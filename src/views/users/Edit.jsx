import PropTypes from 'prop-types'

// mui imports
import { Box, Typography } from '@mui/material'

// third imports
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project improts
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import EditAuth from './components/EditAuth'

import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleReset, data, backBtn }) => {
  if (!data) return
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5, maxHeight: '70vh' }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Editar usuario</Typography>
      <Formik
        initialValues={{
          ...data,
          isAdmin: data.isAdmin === 1,
          isEnabled: data.isEnabled === 1
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
            <EditAuth
              errors={errors}
              touched={touched}
              values={values}
              backBtn={backBtn}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleReset={handleReset}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Box>
  )
}

Edit.propTypes = {
  handleReset: PropTypes.func,
  data: PropTypes.object,
  backBtn: PropTypes.bool
}

export default Edit
