import PropTypes from 'prop-types'

// third imports
import { PatternFormat } from 'react-number-format'
import PerfectScrollbar from 'react-perfect-scrollbar'

// mui importts
import { Box, Divider, Grid, Tooltip, Typography } from '@mui/material'

// project imports
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'
import DefaultBtnsForms from '../../../ui-components/extended/DefaultBtnsForms'

const AuthEdit = ({ errors, values, touched, isAdd, handleBlur, handleChange, onCloseAdd, onCloseEdit }) => {
  return (
    <PerfectScrollbar style={{ height: 'auto', overflowX: 'hidden' }}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h2' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : 'white' }}>
            {isAdd ? 'Nuevo contácto' : 'Editando contácto'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ borderColor: (theme) => theme.palette.mode === 'light' && theme.palette.grey[400] }} />
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
                format='+52 (###) ###-####'
                mask='_'
                type='tel'
                customInput={InputBase}
                value={values.contactPhone}
                name='contactPhone'
                label='Teléfono móvil'
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
            <CustomSwitch
              value={!!values.isEnabled}
              handleChange={handleChange}
              name='isEnabled'
              label='Estatus'
              option1='Inactivo'
              option2='Activo'
            />
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
