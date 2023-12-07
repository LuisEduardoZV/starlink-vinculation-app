import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

// mui imports
import Looks3TwoToneIcon from '@mui/icons-material/Looks3TwoTone'
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Autocomplete, Box, Button, Divider, IconButton, InputAdornment, Skeleton, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import InputBase from '../../ui-components/InputBase'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const Step3 = ({ values, errors, touched, active, handleBlur, handleChange }) => {
  const { client, userId, dashboardId, user, password } = values
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(true)

  const [users, setUsers] = useState([])
  const [dash, setDash] = useState([])

  const isUserNewComplete = useMemo(() => (user?.trim() !== '' && password?.trim() !== ''), [user, password])
  const isUserSelected = useMemo(() => (!!userId), [userId])

  const handleChangeNewUser = (e) => {
    handleChange(e.target.name, e.target.value)
  }

  useEffect(() => {
    (async () => {
      try {
        if (client && active) {
          setLoading(true)
          const res = await apiCall({ url: `${BASE_URL_API}/getClientUser?id=${client}` })
          setUsers(res)

          const resDash = await apiCall({ url: `${BASE_URL_API}/Dashboards` })
          setDash(resDash)
          console.log(resDash)

          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setUsers([])
      setLoading(true)
    }
  }, [active, client])

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1}>
          <Looks3TwoToneIcon /> Selección de dashboard y usuario
        </Typography>
        <Box width='100%'>
          {loading
            ? <Skeleton width='100%' variant='rectangular' sx={{ my: 0 }} />
            : <Autocomplete
                disablePortal
                fullWidth
                size='small'
                id='auto-combo-dashboards'
                options={dash}
                value={dashboardId}
                onChange={(e, nue) => {
                  handleChange('dashboardId', nue)
                }}
                getOptionLabel={(option) => (option.dashboardName)}
                renderOption={(props, option) => (
                  <Box key={option.dashboardId} component='li' sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }} {...props}>
                    <Typography variant='body2' color='grey.400' textAlign='start' width='100%'>{option.dashboardName}</Typography>
                    <Typography variant='subtitle2' color='grey.700' textAlign='start' width='100%'>{option.dashboardDesc}</Typography>
                  </Box>
                )}
                renderInput={(params) => <TextField
                  {...params}
                  label='Dashboards disponibles'
                  sx={{
                    '& .MuiButtonBase-root': {
                      color: (theme) => theme.palette.primary.main
                    },
                    '& .MuiChip-root': {
                      color: 'black',
                      bgcolor: (theme) => theme.palette.primary.main
                    }
                  }}
                                         />}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                  color: 'white',
                  '& .MuiInputBase-input, & .MuiInputBase-root': {
                    bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                    color: 'white'
                  }
                }}
              />}
        </Box>
        <Divider sx={{ borderColor: 'grey.700' }} />
        <Box width='100%'>
          {loading
            ? <Skeleton width='100%' variant='rectangular' sx={{ my: 0 }} />
            : <Autocomplete
                disablePortal
                fullWidth
                size='small'
                id='auto-combo-users'
                disabled={isUserNewComplete}
                options={users}
                value={userId}
                onChange={(e, nue) => handleChange('userId', nue)}
                getOptionLabel={(option) => option.fullName}
                renderInput={(params) => <TextField
                  {...params}
                  label='Usuarios disponibles'
                  sx={{
                    '& .MuiButtonBase-root': {
                      color: (theme) => theme.palette.primary.main
                    },
                    '& .MuiChip-root': {
                      color: 'black',
                      bgcolor: (theme) => theme.palette.primary.main
                    },
                    '& .MuiChip-root.Mui-disabled': {
                      color: 'black',
                      bgcolor: (theme) => theme.palette.primary[800]
                    },
                    '& .MuiButtonBase-root.Mui-disabled': {
                      color: (theme) => theme.palette.primary[800]
                    },
                    '.Mui-disabled': {
                      bgcolor: (theme) => alpha(theme.palette.grey[600], 1)
                    }
                  }}
                                         />}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                  color: 'white',
                  '.Mui-disabled': {
                    bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                    color: (theme) => theme.palette.grey[700]
                  },
                  '& .MuiInputBase-input, & .MuiInputBase-root': {
                    bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                    color: 'white'
                  }
                }}
              />}
        </Box>
        <Divider>O</Divider>
        <Box mt={1} display='flex' flexDirection='column' rowGap={4}>
          <Typography variant='h4' color='grey.400'>Cree un nuevo usuario para el cliente</Typography>
          <InputBase
            value={values.user}
            name='user'
            label='Usuario'
            onBlur={handleBlur}
            onChange={(e) => {
              handleChangeNewUser(e)
            }}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.user && errors.user)}
            disabled={isUserSelected}
            InputProps={{
              autoComplete: 'new-password'
            }}
          />
          <InputBase
            value={values.password}
            name='password'
            label='Contraseña'
            type={showPass ? 'text' : 'password'}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChangeNewUser(e)
            }}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.password && errors.password)}
            disabled={isUserSelected}
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPass((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{ color: (theme) => theme.palette.grey[400] }}
                  >{showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                  </IconButton>
                </InputAdornment>)
            }}
          />
        </Box>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='outlined' color='error'>Cancelar</Button>
          <Button variant='outlined' color='info' type='submit'>Vincular</Button>
        </Box>
      </Box>
      <Box sx={{
        transition: 'opacity 0.15s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: (theme) => theme.palette.background.paper,
        opacity: active ? 0 : 0.8,
        zIndex: active ? -1 : 99999
      }}
      />
    </MainMirrorCard>
  )
}

Step3.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  active: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
}

export default Step3
