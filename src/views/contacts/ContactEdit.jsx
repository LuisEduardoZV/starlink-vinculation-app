import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// third
import { Formik } from 'formik'
import { PatternFormat } from 'react-number-format'
import { toast } from 'sonner'
import * as Yup from 'yup'

// material-ui
import {
    Box,
    Button,
    Divider,
    Grid,
    Switch,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material'
import { createTheme } from '@mui/material/styles'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import { phonelenghtText, requiredText } from '../../utils/labelsErrorsFormik'


// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const ContactEdit = ({ user, isAdd, onFinish, onCloseEdit, onCloseAdd, ...others }) => {
  console.log(isAdd)
  const [initVal, setInitVal] = useState({ ...user, isEnabled: user.isEnabled === 1 })

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
          console.log('entro')
          setSubmitting(true)
          delete values.submit
          values.isEnabled = values.isEnabled ? 1 : 0
          // console.log(contacts)
          // console.log(values.clientId)
          // console.log(values)
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
            <PerfectScrollbar style={{ height: 'auto', overflowX: 'hidden' }}>
              <Grid container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={12}>
                  <Typography variant='h2' color='whitesmoke'>
                    {isAdd ? 'Nuevo contácto' : 'Editando contácto'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.contactName && { title: errors.contactName }}>
                    <InputBase
                      label='Nombre'
                      name='contactName'
                      value={values.contactName}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.contactName && errors.contactName)}
                      required
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.contactPosition && { title: errors.contactPosition }}>
                    <InputBase
                      label='Posición de trabajo'
                      name='contactPosition'
                      value={values.contactPosition}
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.contactPosition && errors.contactPosition)}
                      required
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip arrow followCursor disableInteractive {...errors.contactPhone && { title: errors.contactPhone }}>
                    <Box>
                      <PatternFormat
                        format='+1 (###) ###-####'
                        mask='_'
                        type='tel'
                        customInput={InputBase}
                        value={values.contactPhone}
                        name='contactPhone'
                        label='Teléfono movil'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant='filled'
                        size='small'
                        fullWidth
                        color='primary'
                        required
                        error={Boolean(touched.contactPhone && errors.contactPhone)}
                      />
                    </Box>
                  </Tooltip>
                </Grid>
                {!isAdd && (
                  <Grid item xs={12} position='relative' justifyContent='start'>
                    <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '40%', left: '12%', fontSize: '10px' }}>Estatus</Typography>
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
                )}
                <Grid item xs={12}>
                  <InputBase
                    label='Nota pública'
                    name='publicNote'
                    value={values.publicNote}
                    variant='filled'
                    size='small'
                    fullWidth
                    color='primary'
                    multiline
                    rows={3}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.publicNote && errors.publicNote)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button variant='outlined' color='error' fullWidth onClick={isAdd ? onCloseAdd : onCloseEdit}>
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant='contained' fullWidth type='submit'>
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PerfectScrollbar>
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
