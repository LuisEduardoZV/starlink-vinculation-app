import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import { Box, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import LoadingInfo from '../../ui-components/LoadingInfo'
import AuthForm from './components/AuthForm'

import { requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleCancel, selected }) => {
  const [initVal, setInitVal] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        if (selected && selected.terminalId) {
          const res = await apiCall({ url: `${BASE_URL_API}/Terminals/${selected.terminalId}` })
          setInitVal({ ...res, isEnabled: res.isEnabled === 1, submit: null })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setInitVal({})
      setLoading(true)
    }
  }, [selected])

  if (loading) return <LoadingInfo />
  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'flex-start', bgcolor: 'transparent', flexDirection: 'column', gap: 5 }}>
      <Typography variant='h2' sx={{ color: (theme) => theme.palette.grey[200] }}>Editar terminal</Typography>
      <Formik
        initialValues={initVal}
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
          values.isEnabled = values.isEnabled ? 1 : 0
          values.terminalLatitude = parseFloat(values.terminalLatitude)
          values.terminalLongitude = parseFloat(values.terminalLongitude)
          const promise = () => new Promise((resolve) => {
            let data = null
            try {
              data = apiCallWithBody({ url: `${BASE_URL_API}/Terminals/${values.terminalId}`, method: 'PUT', body: JSON.stringify(values) })
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
              return `El cliente ${values.clientName} se agregó correctamente`
            },
            error: 'Error al agregar el cliente'
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
            />
          </form>
        )}
      </Formik>
    </Box>
  )
}

Edit.propTypes = {
  handleCancel: PropTypes.func,
  selected: PropTypes.object
}

export default Edit
