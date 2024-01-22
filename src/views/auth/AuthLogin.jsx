import PropTypes from 'prop-types'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Box, Button, IconButton, InputAdornment, Tooltip } from '@mui/material'
import { alpha, createTheme, useTheme } from '@mui/material/styles'

// third imports
import { toast } from 'sonner'

// project imports
import InputBase from '../../ui-components/InputBase'

const AuthLogin = ({
  errors, touched, values, showPass, isSubmitting, handleBlur, handleChange, setShowPass, handleMouseDownPassword
}) => {
  const theme = useTheme()
  const newTheme = createTheme({
    ...theme,
    palette: {
      mode: 'dark',
      background: {
        default: alpha(theme.palette.common.white, 0.15)
      },
      primary: {
        main: theme.palette.common.white
      },
      common: {
        white: theme.palette.grey[500]
      }
    }
  })

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4, color: 'white' }}>
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
          theme={newTheme}
          extraSx={{ borderRadius: 2 }}
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
          theme={newTheme}
          extraSx={{ borderRadius: 2 }}
          InputProps={{
            autoComplete: 'off',
            endAdornment: (
              <InputAdornment position='end' sx={{ position: 'absolute', right: '2%' }}>
                <IconButton size='small' sx={{ color: (theme) => theme.palette.common.white }} onClick={() => setShowPass(current => !current)} onMouseDown={handleMouseDownPassword}>
                  {showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                </IconButton>
              </InputAdornment>)
          }}
        />
      </Tooltip>
      <Button
        variant='outlined'
        color='inherit'
        type='submit'
        sx={{
          width: '100%',
          bgcolor: alpha(theme.palette.common.white, 0.08),
          color: 'white',
          boxShadow: '0px 0px 4px white, 0px 0px 4px white inset',
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
          '&:hover': {
            bgcolor: (theme) => theme.palette.common.white,
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
