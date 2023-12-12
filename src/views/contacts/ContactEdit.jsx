import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// material-ui
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import AuthEdit from './components/AuthEdit'

import { phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'

const ContactEdit = ({ user, isAdd, onFinish, onCloseEdit, onCloseAdd, ...others }) => {
  const theme = useTheme()
  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  const [initVal, setInitVal] = useState({ ...user, isEnabled: user.isEnabled === 1 })

  useEffect(() => {
    setInitVal({ ...user, isEnabled: user.isEnabled === 1 })
  }, [user, isAdd])

  return (
    <MainMirrorCard sx={{
      width: '100%',
      maxWidth: 342,
      p: 0,
      position: 'fixed',
      top: matchDown2Xl ? '16%' : '12.5%'
    }}
    >
      <Formik
        enableReinitialize
        initialValues={initVal}
        validationSchema={Yup.object().shape({
          contactName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
          contactPosition: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
          contactPhone: Yup.string()
            .min(10, phonelenghtText)
            .required(requiredText)
            .typeError(requiredText),
          isEnabled: Yup.boolean(),
          publicNote: Yup.string().max(4000, 'La longitud debe ser menor a 4000 caracteres')
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.isEnabled = values.isEnabled ? 1 : 0
          const promise = () => new Promise((resolve) => {
            let data = null
            try {
              if (isAdd) {
                data = apiCallWithBody({ url: `${BASE_URL_API}/Contacts`, method: 'POST', body: JSON.stringify(values) })
              } else {
                data = apiCallWithBody({ url: `${BASE_URL_API}/Contacts/${values.contactId}`, method: 'PUT', body: JSON.stringify(values) })
              }
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
              onFinish(values)
              if (isAdd) return `El contácto ${values.contactName} se agregó correctamente`
              return `El contácto ${values.contactName} se editó correctamente`
            },
            error: isAdd ? 'Error al agregar el contácto' : 'Error al editar el contácto'
          })
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <AuthEdit
              errors={errors}
              touched={touched}
              values={values}
              isAdd={isAdd}
              handleBlur={handleBlur}
              handleChange={handleChange}
              onCloseAdd={onCloseAdd}
              onCloseEdit={onCloseEdit}
            />
          </form>
        )}
      </Formik>
    </MainMirrorCard>
  )
}

ContactEdit.propTypes = {
  user: PropTypes.object,
  isAdd: PropTypes.bool,
  onFinish: PropTypes.func,
  onCloseEdit: PropTypes.func,
  onCloseAdd: PropTypes.func
}

export default ContactEdit
