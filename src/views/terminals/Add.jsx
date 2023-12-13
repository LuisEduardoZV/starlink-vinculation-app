import PropTypes from 'prop-types'

// mui imports
import { Box, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import { requiredText } from '../../utils/labelsErrorsFormik'
import AuthForm from './components/AuthForm'

const Add = ({ handleCancel }) => {
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5 }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Agregar nueva terminal</Typography>
      <Formik
        initialValues={{
          terminalId: 0,
          terminalKitNumber: '',
          terminalSerialNumber: '',
          terminalLineOfService: '',
          terminalSiteName: '',
          terminalLatitude: 0,
          terminalLongitude: 0,
          terminalFriendlyName: '',
          serviceLineNumber: '',
          isEnabled: 1,
          dataHistoric: true,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          terminalKitNumber: Yup.string().required(requiredText),
          terminalSerialNumber: Yup.string().required(requiredText),
          terminalLineOfService: Yup.string().required(requiredText),
          terminalSiteName: Yup.string().required(requiredText),
          terminalFriendlyName: Yup.string().required(requiredText),
          serviceLineNumber: Yup.string().required(requiredText),
          terminalLatitude: Yup.number().required(requiredText),
          terminalLongitude: Yup.number().required(requiredText),
          dataHistoric: Yup.boolean()
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.terminalLatitude = parseFloat(values.terminalLatitude)
          values.terminalLongitude = parseFloat(values.terminalLongitude)
          console.log(values)
          const promise = () => new Promise((resolve) => {
            let data = null
            try {
              data = apiCallWithBody({ url: `${BASE_URL_API}/Terminals`, method: 'POST', body: JSON.stringify(values) })
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
              handleCancel('', true)
              return `La terminal ${values.terminalSiteName} se agregó correctamente`
            },
            error: 'Error al agregar la terminal'
          })
        }}
      >
        {({ values, touched, errors, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <AuthForm
              values={values}
              touched={touched}
              errors={errors}
              isSubmitting={isSubmitting}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleCancel={handleCancel}
              isAdding
            />
          </form>
        )}
      </Formik>
    </Box>
  )
}

Add.propTypes = {
  handleCancel: PropTypes.func
}

export default Add
