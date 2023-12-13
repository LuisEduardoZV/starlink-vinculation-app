import PropTypes from 'prop-types'

// third imports
import { PatternFormat } from 'react-number-format'
import PerfectScrollbar from 'react-perfect-scrollbar'

// mui importts
import { Box, Divider, Grid, Switch, Tooltip, Typography } from '@mui/material'

// project imports
import InputBase from '../../../ui-components/InputBase'
import DefaultBtnsForms from '../../../ui-components/extended/DefaultBtnsForms'

const AuthEdit = ({ errors, values, touched, isAdd, handleBlur, handleChange, onCloseAdd, onCloseEdit }) => {
  return (
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
          <DefaultBtnsForms
            handleCancel={isAdd ? onCloseAdd : onCloseEdit}
            okBtnLabel={isAdd ? 'Agregar' : 'Guardar'}
            justifyContent='space-between'
          />
        </Grid>
      </Grid>
    </PerfectScrollbar>
  )
}

AuthEdit.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  touched: PropTypes.object,
  isAdd: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  onCloseAdd: PropTypes.func,
  onCloseEdit: PropTypes.func
}

export default AuthEdit
