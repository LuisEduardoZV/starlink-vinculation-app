import { useEffect, useRef, useState } from 'react'

// material-ui
import BadgeIcon from '@mui/icons-material/Badge'
import PersonIcon from '@mui/icons-material/Person'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// third
import { toast } from 'sonner'

// project imports
import { SYS_VERSION } from '../config'
import MainCard from '../ui-components/MainCard'
import Transitions from '../ui-components/Transitions'

// assets
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import useAuth from '../hooks/useAuth'
import useConfig from '../hooks/useConfig'

// ==============================|| PROFILE MENU ||============================== //

const getUserType = (isPower, isAdmin) => {
  let text = ''
  let IconUser = PersonIcon
  if (isPower) {
    text = 'Super Usuario'
    IconUser = SupervisorAccountIcon
  }
  if (!isPower && isAdmin) {
    text = 'Cliente Administrador'
    IconUser = BadgeIcon
  }
  if (!isPower && !isAdmin) text = 'Usuario base'
  return (
    <Typography component='div' variant='h6' sx={{ fontWeight: 400, color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500], display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end', width: '100%' }}>
      <IconUser fontSize='small' sx={{ color: 'primary.light' }} />
      {text}
    </Typography>
  )
}

const ProfileSection = () => {
  const { logoutProvider, user } = useAuth()

  const theme = useTheme()
  const { borderRadius, onChangeMenuType, navType } = useConfig()

  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleLogOut = async () => {
    toast.loading('Saliendo...')
    await logoutProvider()
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Chip
        id='tuto-dash-profile'
        sx={{
          alignItems: 'center',
          borderRadius: '27px',
          paddingX: '10px',
          transition: 'color .2s ease-in-out, border-color .2s ease-in-out, background .2s ease-in-out',
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.background.paper,
            '& svg': {
              stroke: theme.palette.primary.main
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        label={<SettingsTwoToneIcon fontSize='small' color={theme.palette.primary.main} />}
        variant='outlined'
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        color='primary'
      />

      <Popper
        placement='bottom'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-60, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard
                    border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}
                  >
                    <Box sx={{ p: 2, pb: 0, gap: 1, display: 'flex', flexDirection: 'column' }}>
                      <Stack direction='column' spacing={0.5} alignItems='start'>
                        <Typography variant='h1' sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }}>Hola,</Typography>
                        <Typography component='span' variant='h4' sx={{ fontWeight: 400, color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500] }}>
                          {user?.user.fullName ?? 'Usuario'}
                        </Typography>
                      </Stack>
                      <Stack direction='row' spacing={0.5} alignItems='center'>
                        {getUserType(user?.user.isPowerUser, user?.user.isAdmin)}
                      </Stack>
                      <Divider sx={{ borderColor: (theme) => theme.palette.primary.main }} />
                    </Box>
                    <Box p={2} display='flex' flexDirection='column' gap={1}>
                      <FormControl component='fieldset'>
                        <FormLabel component='legend'>Estilo</FormLabel>
                        <RadioGroup
                          row
                          aria-label='layout'
                          value={navType}
                          onChange={(e) => onChangeMenuType(e.target.value)}
                          name='row-radio-buttons-group'
                        >
                          <FormControlLabel
                            value='light'
                            control={<Radio size='small' />}
                            label='Claro'
                            sx={{
                              '& .MuiSvgIcon-root': { fontSize: 25 },
                              '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                            }}
                          />
                          <FormControlLabel
                            value='dark'
                            control={<Radio size='small' />}
                            label='Obscuro'
                            sx={{
                              '& .MuiSvgIcon-root': { fontSize: 25 },
                              '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                      <Divider />
                    </Box>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <List
                        component='nav'
                        color='primary'
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 'fit-content',
                          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.7),
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                            border: '1px solid',
                            transition: 'all 0.2s ease-out',
                            borderColor: (theme) => theme.palette.background.paper,
                            '&:hover': {
                              borderColor: (theme) => theme.palette.primary[800],
                              bgcolor: (theme) => theme.palette.background.paper
                            },
                            '.MuiListItemText-root': {
                              transition: 'color 0.2s ease-out'
                            },
                            '&:hover .MuiListItemText-root': {
                              color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.common.white
                            }
                          }}
                          onClick={handleLogOut}
                        >
                          <ListItemIcon>
                            <LoginTwoToneIcon fontSize='small' sx={{ color: theme.palette.primary.main }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant='body2' color='inherit'>
                                Cerrar Sesión
                              </Typography>
                              }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                      <Divider sx={{ width: '100%', borderColor: 'grey.800' }} />
                      <Typography
                        variant='caption'
                        py={1}
                      >
                        v{SYS_VERSION}
                      </Typography>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  )
}

export default ProfileSection
