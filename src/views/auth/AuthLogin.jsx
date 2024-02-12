import PropTypes from 'prop-types'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Box, Button, IconButton, InputAdornment, Tooltip } from '@mui/material'

// third imports
import { toast } from 'sonner'

// project imports
import InputBase from '../../ui-components/InputBase'

const AuthLogin = ({
  errors, touched, values, showPass, isSubmitting, handleBlur, handleChange, setShowPass, handleMouseDownPassword
}) => {
  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
      <Tooltip arrow followCursor disableInteractive {...errors.user && { title: errors.user }}>
        <InputBase
          label='Usuario'
          fullWidth size='small'
          error={Boolean(touched.user && errors.user)}
          value={values.user}
          name='user'
          onBlur={handleBlur}
          onChange={handleChange}
          variant='filled'
          color='primary'
          required
          InputProps={{ autoComplete: 'off' }}
        />
      </Tooltip>
      <Tooltip arrow followCursor disableInteractive {...errors.password && { title: errors.password }}>
        <InputBase
          label='Contraseña' fullWidth size='small'
          type={showPass ? 'text' : 'password'}
          error={Boolean(touched.password && errors.password)}
          value={values.password}
          name='password'
          onBlur={handleBlur}
          onChange={handleChange}
          required
          variant='filled'
          color='primary'
          InputProps={{
            autoComplete: 'off',
            endAdornment: (
              <InputAdornment position='end' sx={{ position: 'absolute', right: '2%' }}>
                <IconButton size='small' sx={{ color: (theme) => theme.palette.primary[800] }} onClick={() => setShowPass(current => !current)} onMouseDown={handleMouseDownPassword}>
                  {showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                </IconButton>
              </InputAdornment>)
          }}
        />
      </Tooltip>
      <Button
        variant='contained'
        color='inherit'
        type='submit'
        sx={{
          width: '100%',
          bgcolor: 'black',
          color: 'white',
          boxShadow: (theme) => theme.shadows[5],
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
          '&:hover': {
            bgcolor: (theme) => theme.palette.primary.main,
            color: 'black'
          }
        }}
        size='small'
        disableElevation
        disabled={isSubmitting}
        onClick={() => {
          if (errors.user && errors.password) toast.error('Es necesario que llene todos los campos para continuar')
        }}
      >Acceder
      </Button>
    </Box>
  )
}

AuthLogin.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  showPass: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  setShowPass: PropTypes.func,
  handleMouseDownPassword: PropTypes.func
}

export default AuthLogin
