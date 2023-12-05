import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import { Box, Button, Grid, Switch, Tooltip, Typography } from '@mui/material'

// third
import { Formik } from 'formik'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall, apiCallWithBody } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'
import LoadingInfo from '../../ui-components/LoadingInfo'

import { requiredText } from '../../utils/labelsErrorsFormik'

const Edit = ({ handleCancel, selected }) => {
  const [initVal, setInitVal] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        if (selected && selected.terminalId) {
          const res = await apiCall({ url: `${BASE_URL_API}/Terminals/${selected.terminalId}` })
          console.log(res)
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
          // console.log(values)
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
            <Grid container spacing={5} width='100%'>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalFriendlyName && { title: errors.terminalFriendlyName }}>
                  <InputBase
                    value={values.terminalFriendlyName}
                    name='terminalFriendlyName'
                    label='Nombre de la terminal'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.terminalFriendlyName && errors.terminalFriendlyName)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalSiteName && { title: errors.terminalSiteName }}>
                  <InputBase
                    value={values.terminalSiteName}
                    name='terminalSiteName'
                    label='Nombre del sitio'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.terminalSiteName && errors.terminalSiteName)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalLineOfService && { title: errors.terminalLineOfService }}>
                  <InputBase
                    value={values.terminalLineOfService}
                    name='terminalLineOfService'
                    label='Línea de servicio de la terminal'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.terminalLineOfService && errors.terminalLineOfService)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalSerialNumber && { title: errors.terminalSerialNumber }}>
                  <InputBase
                    value={values.terminalSerialNumber}
                    name='terminalSerialNumber'
                    label='Número de seria'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.terminalSerialNumber && errors.terminalSerialNumber)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalKitNumber && { title: errors.terminalKitNumber }}>
                  <InputBase
                    value={values.terminalKitNumber}
                    name='terminalKitNumber'
                    label='Número de Kit'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.terminalKitNumber && errors.terminalKitNumber)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3} position='relative'>
                <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '30%', left: '19%', fontSize: '10px' }}>Estatus</Typography>
                <Box display='flex' alignItems='center' width='100%' justifyContent='center' mt={2} gap={2}>
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => values.isEnabled ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: !values.isEnabled && '800',
                      fontSize: !values.isEnabled && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Inactivo
                  </Typography>
                  <Switch
                    color='primary'
                    size='small'
                    checked={values.isEnabled}
                    name='isEnabled'
                    onChange={handleChange}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => !values.isEnabled ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: values.isEnabled && '800',
                      fontSize: values.isEnabled && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Activo
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.serviceLineNumber && { title: errors.serviceLineNumber }}>
                  <InputBase
                    value={values.serviceLineNumber}
                    name='serviceLineNumber'
                    label='Número de la línea de servicio'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    error={Boolean(touched.serviceLineNumber && errors.serviceLineNumber)}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalLatitude && { title: errors.terminalLatitude }}>
                  <Box>
                    <NumericFormat
                      allowLeadingZeros
                      customInput={InputBase}
                      value={values.terminalLatitude}
                      name='terminalLatitude'
                      label='Latitud'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      required
                      error={Boolean(touched.terminalLatitude && errors.terminalLatitude)}
                    />
                  </Box>
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3}>
                <Tooltip arrow followCursor disableInteractive {...errors.terminalLongitude && { title: errors.terminalLongitude }}>
                  <Box>
                    <NumericFormat
                      allowLeadingZeros
                      customInput={InputBase}
                      value={values.terminalLongitude}
                      name='terminalLongitude'
                      label='Longitud'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      required
                      error={Boolean(touched.terminalLongitude && errors.terminalLongitude)}
                    />
                  </Box>
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={3} position='relative'>
                <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '30%', left: '19%', fontSize: '10px' }}>Histórico de los datos</Typography>
                <Box display='flex' alignItems='center' width='100%' justifyContent='center' mt={2} gap={2}>
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => values.dataHistoric ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: !values.dataHistoric && '800',
                      fontSize: !values.dataHistoric && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Desactivado
                  </Typography>
                  <Switch
                    color='primary'
                    size='small'
                    checked={values.dataHistoric}
                    name='dataHistoric'
                    onChange={handleChange}
                  />
                  <Typography
                    variant='caption'
                    sx={{
                      color: (theme) => !values.dataHistoric ? theme.palette.grey[500] : theme.palette.grey[300],
                      fontWeight: values.dataHistoric && '800',
                      fontSize: values.dataHistoric && '13px',
                      transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
                    }}
                  >Activado
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box display='flex' width='100%' justifyContent='space-around' mt={5} mb={1}>
              <Button variant='outlined' color='error' onClick={handleCancel}>Cancelar</Button>
              <Button variant='outlined' color='info' type='submit' disabled={isSubmitting}>Guardar</Button>
            </Box>
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
