import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import Looks3TwoToneIcon from '@mui/icons-material/Looks3TwoTone'
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

// project imports
import { apiCall } from '../../contexts/api'
import LoadingInfo from '../../ui-components/LoadingInfo'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const Step3 = ({ values, errors, touched, active, handleBlur, handleChange }) => {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState(null)

  const getData = async () => {
    if (values.client && values.terminals.length !== 0) {
      if (user === null) {
        const res = await apiCall({ url: 'https://randomuser.me/api/?password=upper,lower,number,8-16' })
        setUser(res.results[0])
        handleChange('user', res.results[0].login.username)
        handleChange('password', res.results[0].login.password)
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        await getData()
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setUser(null)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      {loading
        ? <LoadingInfo />
        : (
          <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
            <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='center'>
              <Looks3TwoToneIcon /> Usuario generado
            </Typography>
            <Box mt={5} display='flex' flexDirection='column' rowGap={4}>
              <TextField
                value={values.user}
                name='user'
                label='Usuario'
                onBlur={handleBlur}
                onChange={handleChange}
                variant='filled'
                size='small'
                fullWidth
                color='primary'
                error={Boolean(touched.user && errors.user)}
                sx={{
                  boxShadow: (theme) => theme.shadows[5],
                  '& .MuiInputBase-input': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root': {
                    color: !(touched.user && errors.user) && ((theme) => theme.palette.primary.main)
                  }
                }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                value={values.password}
                name='password'
                label='Contraseña'
                type={showPass ? 'text' : 'password'}
                onBlur={handleBlur}
                onChange={handleChange}
                variant='filled'
                size='small'
                fullWidth
                color='primary'
                error={Boolean(touched.password && errors.password)}
                sx={{
                  boxShadow: (theme) => theme.shadows[5],
                  '& .MuiInputBase-input': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root': {
                    color: !(touched.password && errors.password) && ((theme) => theme.palette.primary.main)
                  }
                }}
                InputProps={{
                  readOnly: true,
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
            <Box mt={5} display='flex' justifyContent='space-between'>
              <Button variant='outlined' color='error'>Cancelar</Button>
              <Button variant='outlined' color='info' type='submit'>Vincular</Button>
            </Box>
          </Box>
          )}
      <Box sx={{
        transition: 'opacity 0.15s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: (theme) => theme.palette.background.paper,
        opacity: active ? 0 : 0.8,
        zIndex: active ? -1 : 1
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
