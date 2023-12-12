import PropTypes from 'prop-types'

// mui imports
import { Box, Button, Grid, Tooltip } from '@mui/material'

// project imports
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'

const AddAuth = ({ errors, values, touched, handleBlur, handleChange, backBtn, handleReset, isSubmitting }) => {
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
              type='password'
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
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Box width='100%' mt={5} display='flex' justifyContent={backBtn ? 'space-between' : 'flex-end'}>
        {backBtn && (<Button type='submit' variant='outlined' color='error' onClick={handleReset}>Cancelar</Button>)}
        <Button type='submit' variant='outlined' color='info' disabled={isSubmitting}>
          Agregar
        </Button>
      </Box>
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
