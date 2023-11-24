import { useNavigate } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import { requiredText } from '../../utils/labelsErrorsFormik'

const Linking = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flex: 1 }}>
      <Formik
        initialValues={{
          client: null,
          terminals: [],
          user: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          client: Yup.string().required(requiredText),
          terminals: Yup.array().min(1, 'Debe seleccionar por lo menos una terminal').required(requiredText),
          user: Yup.string().required(requiredText),
          password: Yup.string().required(requiredText)
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          delete values.submit
          // console.log(values)
          const promise = () => new Promise((resolve) => {
            setTimeout(() => { return resolve({ status: 200 }) }, 1000)
          })

          toast.promise(promise, {
            loading: 'Vinculando...',
            success: () => {
              return 'Se han vinculado correctamente'
            },
            error: 'Error al vincular'
          })
          setTimeout(() => {
            setStatus({ success: true })
            setSubmitting(false)
            navigate('/terminals', { replace: true, state: { view: 2 } })
          }, 1200)
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
