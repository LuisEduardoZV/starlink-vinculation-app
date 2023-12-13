import PropTypes from 'prop-types'

// third imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Divider, Grid, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material'

// project importgs
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'
import DefaultBtnsForms from '../../../ui-components/extended/DefaultBtnsForms'

const FormAuth = ({ isAdd, showPass, values, errors, touched, handleBlur, handleChange, onCloseAdd, onCloseEdit, setShowPass }) => {
  return (
    <PerfectScrollbar style={{ height: 'auto', overflowX: 'hidden' }}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h2' color='whitesmoke'>
            {isAdd ? 'Nuevo Super Usuario' : 'Editando un Super Usuario'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Tooltip arrow followCursor disableInteractive {...errors.fullName && { title: errors.fullName }}>
            <InputBase
              label='Nombre'
              name='fullName'
              value={values.fullName}
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.fullName && errors.fullName)}
              required
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip arrow followCursor disableInteractive {...errors.email && { title: errors.email }}>
            <InputBase
              label='Correo Electrónico'
              type='email'
              name='email'
              value={values.email}
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              required
            />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
            <InputBase
              label='Contraseña'
              type={showPass ? 'text' : 'password'}
              name='password'
              value={values.password}
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton size='small' onClick={() => setShowPass(current => !current)}>
                      {showPass ? <VisibilityTwoToneIcon sx={{ color: 'grey.500' }} fontSize='small' /> : <VisibilityOffTwoToneIcon sx={{ color: 'grey.500' }} fontSize='small' />}
                    </IconButton>
                  </InputAdornment>)
              }}
            />
          </Tooltip>
        </Grid>
        {!isAdd && (
          <Grid item xs={12} position='relative' justifyContent='start'>
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

FormAuth.propTypes = {
  isAdd: PropTypes.bool,
  showPass: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  onCloseAdd: PropTypes.func,
  onCloseEdit: PropTypes.func,
  setShowPass: PropTypes.func
}

export default FormAuth
