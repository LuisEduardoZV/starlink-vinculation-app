import PropTypes from 'prop-types'

// third imports
import { NumericFormat } from 'react-number-format'

// mui imports
import { Box, Button, Grid, Tooltip } from '@mui/material'

// project imports
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'

const AuthForm = ({ values, errors, touched, isSubmitting, handleBlur, handleCancel, handleChange, isAdding }) => {
  return (
    <>
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
        <Grid item xs={12} md={isAdding ? 4 : 3}>
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
        <Grid item xs={12} md={isAdding ? 4 : 3}>
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
        <Grid item xs={12} md={isAdding ? 4 : 3}>
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
        {!isAdding && (
          <Grid item xs={12} md={3} position='relative'>
            <CustomSwitch
              value={values.isEnabled}
              handleChange={handleChange}
              name='isEnabled'
              label='Estatus'
              option1='Inactivo'
              option2='Activo'
            />
          </Grid>
        )}
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
          <CustomSwitch
            value={values.dataHistoric}
            handleChange={handleChange}
            name='dataHistoric'
            label='Histórico de los datos'
            option1='Desactivado'
            option2='Activado'
          />
        </Grid>
      </Grid>
      <Box display='flex' width='100%' justifyContent='space-around' mt={5} mb={1}>
        <Button variant='outlined' color='error' onClick={handleCancel}>Cancelar</Button>
        <Button variant='outlined' color='info' type='submit' disabled={isSubmitting}>{isAdding ? 'Agregar' : 'Guardar'}</Button>
      </Box>
    </>
  )
}

AuthForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isAdding: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func
}

export default AuthForm
