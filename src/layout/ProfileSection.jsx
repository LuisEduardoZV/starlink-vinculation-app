import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import {
  Box, Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// third
import { toast } from 'sonner'

// project imports
import MainCard from '../ui-components/MainCard'
import Transitions from '../ui-components/Transitions'

// assets
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import useConfig from '../hooks/useConfig'

// ==============================|| PROFILE MENU ||============================== //

const getWelcomeText = () => {
  const today = new Date()
  const hours = today.getHours()
  if (hours >= 5 && hours < 12) return 'Buenos días, '
  if (hours >= 12 && hours < 19) return 'Buenas tardes, '
  return 'Buenas noches, '
}

const ProfileSection = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { borderRadius } = useConfig()

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [open, setOpen] = useState(false)

  const welcome = getWelcomeText()

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

  const handleLogOut = () => {
    toast.loading('Saliendo...')
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 1000)
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
          borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.main,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.background.paper,
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
                      <Stack direction='row' spacing={0.5} alignItems='center'>
                        <Typography variant='h4' sx={{ color: 'white' }}>{welcome}</Typography>
                        <Typography component='span' variant='h4' sx={{ fontWeight: 400, color: (theme) => theme.palette.grey[500] }}>
                          User Name
                        </Typography>
                      </Stack>
                      <Divider sx={{ borderColor: (theme) => theme.palette.primary.main }} />
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
                              color: 'white'
                            }
                          }}
                          selected={selectedIndex === 0}
                        >
                          <ListItemIcon>
                            <SettingsTwoToneIcon fontSize='small' sx={{ color: theme.palette.primary.main }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant='body2' color='inherit'>
                                Ajustes de la Cuenta
                              </Typography>
                              }
                          />
                        </ListItemButton>
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
                              color: 'white'
                            }
                          }}
                          selected={selectedIndex === 4}
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
