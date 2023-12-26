import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// material-ui
import { useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'
import FormAuth from './components/FormAuth'


// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const ContactEdit = ({ user, isAdd, onFinish, onCloseEdit, onCloseAdd, ...others }) => {
  const [initVal, setInitVal] = useState({ ...user, isEnabled: user.isEnabled === 1 })
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    setInitVal({ ...user, isEnabled: user.isEnabled === 1 })
  }, [user, isAdd])

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        '2xl': 1900
      }
    }
  })

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

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
          fullName: Yup.string().max(200, 'La longitud debe ser menor a 200 caracteres').required(requiredText),
          email: Yup.string().email(emailerrorText).max(255).required(requiredText).required(requiredText),
          password: Yup.string().required(requiredText),
          isAdmin: Yup.boolean(),
          isEnabled: Yup.boolean()
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmitting(true)
          delete values.submit
          values.isEnabled = values.isEnabled ? 1 : 0
          const promise = () => new Promise((resolve, reject) => {
            let data = null
            try {
              if (isAdd) {
                data = apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers`, method: 'POST', body: JSON.stringify(values) })
                apiCallWithBody({
                  url: `${BASE_URL_API}/AltaUserGraf?type=2`,
                  body: JSON.stringify({
                    name: values.fullName,
                    email: values.email,
                    login: values.email,
                    password: values.password,
                    OrgId: 1
                  })
                })
              } else {
                data = apiCallWithBody({ url: `${BASE_URL_API}/PowerUsers/${values.powerUser_Id}`, method: 'PUT', body: JSON.stringify(values) })
              }
            } catch (error) {
              return reject(new Error(error))
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
              if (isAdd) return `El Super Usuario ${values.fullName} se agregó correctamente`
              return `El Super Usuario ${values.fullName} se editó correctamente`
            },
            error: (er) => {
              return er.message
            }
          })
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormAuth
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setShowPass={setShowPass}
              isAdd={isAdd}
              showPass={showPass}
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
