import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'

// mui imports
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import { Autocomplete, Box, Button, Collapse, Divider, Fade, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import InputBase from '../../../ui-components/InputBase'

import 'react-perfect-scrollbar/dist/css/styles.css'

const DashUserSelection = React.forwardRef(({ values, errors, touched, handleBlur, handleChange, handleChangeAutocompleteInfo, handleAddUser, disabledBtns, cancelBtn, handleDeleteUser, finishBtn, users, dash, loading }, ref) => {
  const { userId, dashboards, email, password, terminals } = values
  const [showPass, setShowPass] = useState(false)

  const isUserNewComplete = useMemo(() => (email?.trim() !== '' && password?.trim() !== ''), [email, password])
  const isUserSelected = useMemo(() => (!!userId), [userId])

  const validFinish = useMemo(() => ((isUserNewComplete || isUserSelected) && (dashboards.length > 0) && !!(terminals && terminals.length > 0)), [isUserNewComplete, isUserSelected, dashboards, terminals])

  return (
    <Box ref={ref} display='flex' flexDirection='column' rowGap={3} position='relative' mt={3}>
      <Box width='100%'>
        <Autocomplete
          disablePortal
          fullWidth
          size='small'
          multiple
          limitTags={3}
          id='auto-combo-dashboards'
          options={dash}
          value={dashboards}
          onChange={(e, nue) => {
            handleChangeAutocompleteInfo('dashboards', nue)
          }}
          isOptionEqualToValue={(a, b) => (a.dashboardId === b.dashboardId)}
          getOptionLabel={(option) => (option.dashboardName)}
          renderOption={(props, option) => (
            <Box key={option.dashboards} component='li' sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }} {...props}>
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
        />
      </Box>
      <Divider sx={{ borderColor: 'grey.700' }} />
      <Collapse in={!isUserNewComplete}>
        <>
          <Box width='100%'>
            <Autocomplete
              disablePortal
              fullWidth
              size='small'
              id='auto-combo-users'
              disabled={isUserNewComplete}
              options={cancelBtn ? [] : users}
              value={userId}
              onChange={(e, nue) => handleChangeAutocompleteInfo('userId', nue)}
              getOptionLabel={(option) => option.fullName}
              isOptionEqualToValue={(a, b) => (a.userId === b.userId)}
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
            />
          </Box>
          <Fade in={(!isUserNewComplete && userId === null)}>
            <Divider sx={{ mt: 2.5 }}>O</Divider>
          </Fade>
        </>
      </Collapse>
      <Collapse in={userId === null}>
        <Box display='flex' flexDirection='column' rowGap={3}>
          <Typography variant='h4' color='grey.400'>Cree un nuevo usuario para el cliente</Typography>
          <InputBase
            value={values.email}
            name='email'
            label='Usuario'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            fullWidth
            size='small'
            color='primary'
            error={Boolean(touched.email && errors.email)}
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
            onChange={handleChange}
            variant='filled'
            fullWidth
            size='small'
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
      </Collapse>
      <Box mt={2} display='flex' justifyContent='space-between'>
        {!disabledBtns && (
          <>
            {cancelBtn
              ? <Button variant='outlined' color='error' onClick={handleDeleteUser}>Eliminar</Button>
              : <Button variant='outlined' color='secondary' disabled={!validFinish} onClick={handleAddUser}>Guardar usuario</Button>}
            {finishBtn && <Button variant='outlined' color='info' type='submit' disabled={!validFinish}>Terminar & Vincular</Button>}
          </>
        )}
      </Box>
    </Box>
  )
})

DashUserSelection.displayName = 'DashUserSelection'

DashUserSelection.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  users: PropTypes.array,
  dash: PropTypes.array,
  disabledBtns: PropTypes.bool,
  cancelBtn: PropTypes.bool,
  finishBtn: PropTypes.bool,
  loading: PropTypes.bool,
  client: PropTypes.number,
  handleChange: PropTypes.func,
  handleChangeAutocompleteInfo: PropTypes.func,
  handleBlur: PropTypes.func,
  handleAddUser: PropTypes.func,
  handleDeleteUser: PropTypes.func
}

export default DashUserSelection
