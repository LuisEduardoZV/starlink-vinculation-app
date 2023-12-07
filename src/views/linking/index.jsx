import { useNavigate } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import { emailerrorText, requiredText } from '../../utils/labelsErrorsFormik'

const Linking = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flex: 1 }}>
      <Formik
        initialValues={{
          assignId: 0,
          client: null,
          terminals: [],
          userId: null,
          dashboardId: null,
          user: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          client: Yup.string().required(requiredText),
          userId: Yup.object().nullable(),
          dashboardId: Yup.object().required(requiredText).nullable(),
          terminals: Yup.array().min(1, 'Debe seleccionar por lo menos una terminal').required(requiredText),
          user: Yup.string().email(emailerrorText),
          password: Yup.string()
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          delete values.submit
          console.log(values)

          const toastId = toast.loading('Vinculando...')

          try {
            if (!values.dashboardId) throw new Error('Debe seleccionar un Dashboard')
            if (!values.userId && values.user?.trim() === '' && values.password?.trim() === '') throw new Error('Debe seleccionar un usuario disponible o crear uno nuevo, si así se desea')
            if (!values.userId && (values.user?.trim() === '' || values.password?.trim() === '')) throw new Error('Para crear un nuevo usuario debe proporcionar toda la información solicitada')
            const data = {
              userId: 0,
              clientId: values.client,
              fullName: `NewUser-Terminal-${values.terminals?.toString()}`,
              email: values.user,
              password: values.password,
              isEnabled: 1,
              isAdmin: 0
            }
            const newUser = await apiCallWithBody({ url: `${BASE_URL_API}/Users`, method: 'POST', body: JSON.stringify(data) })
            if (!newUser) throw new Error('Hubo un error al crear el nuveo usuario')

            delete values.user
            delete values.password
            delete values.client
            values.dashboardId = values.dashboardId.dashboardId
            values.userId = newUser.userId

            values.terminals.forEach(async (id) => {
              const data = { ...values, terminalId: id }
              delete data.terminals
              const res = await apiCallWithBody({ url: `${BASE_URL_API}/Assigns`, method: 'POST', body: JSON.stringify(data) })
              if (!res) throw new Error(`Error al vincularse con la terminal ${id}`)
            })

            toast.success('Se han vinculado conrrectamente', { id: toastId })
            setStatus({ success: true })
            setSubmitting(false)
            navigate('/terminals', { replace: true, state: { view: 2 } })
          } catch (error) {
            toast.error(error.message, { id: toastId })
          }
        }}
      >
        {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flex: 1, px: '4%', gap: 5 }}>
              <Step1
                values={values}
                errors={errors}
                handleChange={setFieldValue}
              />
              <Step2
                values={values}
                errors={errors}
                handleChange={setFieldValue}
                active={!!values.client}
              />
              <Step3
                values={values}
                errors={errors}
                touched={touched}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                active={values.terminals.length !== 0}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Linking
