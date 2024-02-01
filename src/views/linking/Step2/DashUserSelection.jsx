import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'

// mui imports
import { Autocomplete, Box, Button, Chip, Divider, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

// project imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import TransferList from '../../../ui-components/TransferList'

// services
import { BASE_URL_API } from '../../../config'
import { apiCall } from '../../../contexts/api'

const DashUserSelection = React.forwardRef(({ values, handleChangeAutocompleteInfo, handleAddUser, disabledBtns, cancelBtn, handleDeleteUser, finishBtn, users, dash, loading, terminalsAsigned, setTerminalsUser, terminales }, ref) => {
  const { userId, dashboards, terminals } = values

  const [preSelected, setPreselected] = useState([])
  const [terminalsSelected, setTerminalSelected] = useState(terminalsAsigned ?? [])

  const isUserSelected = useMemo(() => (!!userId), [userId])

  const validFinish = useMemo(() => ((isUserSelected) && (dashboards.length > 0) && !!(terminals && terminals.length > 0)), [isUserSelected, dashboards, terminals])

  const disabled = useMemo(() => (terminalsAsigned && terminalsAsigned.length > 0), [terminalsAsigned])

  useEffect(() => {
    (async () => {
      try {
        if (userId && userId.userId && !terminalsAsigned) {
          const presSelRes = await apiCall({ url: `${BASE_URL_API}/getAsigmentUser?UserId=${userId.userId}` })
          setPreselected(presSelRes)
          setTerminalSelected(presSelRes)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [terminalsAsigned, userId])

  return (
    <Box ref={ref} display='flex' flexDirection='column' rowGap={3} mt={3}>
      <Box width='100%' display='flex' gap={5} alignItems='center'>
        {!loading && (
          <>
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
                  <Typography variant='body2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.800' : 'grey.400' }}>{option.dashboardName}</Typography>
                  <Typography variant='subtitle2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'primary.dark' : 'grey.700' }}>{option.dashboardDesc}</Typography>
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
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((op, index) => (
                  <Chip key={index} {...getTagProps({ index })} label={op.dashboardName} variant='outlined' color='primary' size='small' sx={{ bgcolor: 'transparent' }} />
                ))
              }}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                '& .MuiInputBase-input, & .MuiInputBase-root': {
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                  color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }
              }}
            />
            <Autocomplete
              disablePortal
              fullWidth
              size='small'
              id='auto-combo-users'
              options={cancelBtn ? [] : users}
              value={userId}
              onChange={(e, nue) => {
                handleChangeAutocompleteInfo('userId', nue)
                if (!nue) setTerminalSelected([])
              }}
              getOptionLabel={(option) => option.fullName}
              isOptionEqualToValue={(a, b) => (a.userId === b.userId)}
              renderInput={(params) => <TextField
                {...params}
                label='Usuarios del cliente'
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
                bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                '.Mui-disabled': {
                  bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                  color: (theme) => theme.palette.grey[700]
                },
                '& .MuiInputBase-input, & .MuiInputBase-root': {
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                  color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }
              }}
            />
            <Box display='flex' minWidth='max-content' justifyContent='end' gap={5} alignItems='start'>
              {!disabledBtns && (
                <>
                  {cancelBtn
                    ? <Button variant='outlined' color='error' onClick={handleDeleteUser}>Eliminar</Button>
                    : <Button variant='outlined' color='primary' disabled={!validFinish} onClick={handleAddUser}>Guardar cambios</Button>}
                  {finishBtn && <Button variant='outlined' color='primary' type='submit' disabled={!validFinish}>Terminar & Vincular</Button>}
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      <Divider sx={{ borderColor: 'grey.900' }} />
      <Box display='flex' flexDirection='column' width='100%' maxHeight='35vh' height='100%'>
        <TransferList terminals={terminales} termSelected={terminalsSelected} setNewTerms={setTerminalsUser} disabled={disabled} preSelected={preSelected} />
      </Box>
    </Box>
  )
})

DashUserSelection.displayName = 'DashUserSelection'

DashUserSelection.propTypes = {
  values: PropTypes.object,
  users: PropTypes.array,
  dash: PropTypes.array,
  disabledBtns: PropTypes.bool,
  cancelBtn: PropTypes.bool,
  finishBtn: PropTypes.bool,
  loading: PropTypes.bool,
  client: PropTypes.number,
  handleChangeAutocompleteInfo: PropTypes.func,
  handleAddUser: PropTypes.func,
  handleDeleteUser: PropTypes.func,
  terminalsAsigned: PropTypes.array,
  terminales: PropTypes.array,
  setTerminalsUser: PropTypes.func
}

export default DashUserSelection
