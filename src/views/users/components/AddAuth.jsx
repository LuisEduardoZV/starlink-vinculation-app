import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import { Grid, IconButton, InputAdornment, Tooltip } from '@mui/material'

// project imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'
import DefaultBtnsForms from '../../../ui-components/extended/DefaultBtnsForms'

const AddAuth = ({ errors, values, touched, handleBlur, handleChange, backBtn, handleReset, isSubmitting }) => {
  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Tooltip arrow followCursor disableInteractive {...errors.fullName && { title: errors.fullName }}>
            <InputBase
              name='fullName'
              label='Nombre'
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              error={Boolean(touched.fullName && errors.fullName)}
              required
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={4} position='relative'>
          <CustomSwitch
            value={values?.isAdmin}
            handleChange={handleChange}
            name='isAdmin'
            label='Tipo de usuario'
            option1='Normal'
            option2='Administrador'
          />
        </Grid>
        <Grid item xs={6}>
          <Tooltip arrow followCursor disableInteractive {...errors.email && { title: errors.email }}>
            <InputBase
              name='email'
              label='Correo electrónico'
              type='email'
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              error={Boolean(touched.email && errors.email)}
              required
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
            <InputBase
              name='password'
              label='Contraseña'
              type={!showPass ? 'password' : 'text'}
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              error={Boolean(touched.password && errors.password)}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' sx={{ bgcolor: 'transparent' }}>
                    <IconButton size='small' onClick={() => setShowPass((prev) => !prev)}>
                      {showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                    </IconButton>
                  </InputAdornment>)
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <DefaultBtnsForms
        handleCancel={handleReset}
        isSubmitting={isSubmitting}
        noCancel={!backBtn}
      />
    </>
  )
}

AddAuth.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  backBtn: PropTypes.bool,
  handleReset: PropTypes.func,
  isSubmitting: PropTypes.bool
}

export default AddAuth
