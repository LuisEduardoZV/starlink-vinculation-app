import PropTypes from 'prop-types'

// material-ui
import { Avatar, Button, Grid, Tooltip, Typography } from '@mui/material'
import { alpha, styled, useTheme } from '@mui/material/styles'

// assets
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone'
import PermContactCalendarTwoToneIcon from '@mui/icons-material/PermContactCalendarTwoTone'
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone'

// styles
const ListWrapper = styled('div')(({ theme }) => ({
  padding: '15px 0',
  borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderTop: theme.palette.mode === 'dark' ? 'none' : '1px solid',
  borderColor: `${theme.palette.grey[800]}!important`
}))

// ==============================|| USER CONTACT LIST ||============================== //

const ContactList = ({ avatar, phone, name, role, onActive, onEditClick, onDeleteClick }) => {
  const theme = useTheme()

  return (
    <ListWrapper>
      <Grid container alignItems='center' spacing={3}>
        <Grid item xs={12} sm={6} onClick={() => onActive && onActive()} style={{ cursor: 'pointer' }}>
          <Grid container alignItems='center' spacing={3} sx={{ flexWrap: 'nowrap' }}>
            <Grid item>
              <Avatar sx={{ width: 48, height: 48, fontSize: '15px', color: theme.palette.grey[400], bgcolor: alpha(theme.palette.grey[800], 0.2), backdropFilter: 'blur(10px)' }}>{avatar}</Avatar>
            </Grid>
            <Grid item sm zeroMinWidth>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant='h4' component='div' color='whitesmoke'>
                    {name} ({role})
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='caption'>{phone}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={1}
            sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'flex-start' } }}
          >
            <Grid item>
              <Tooltip placement='top' title='Mostrar'>
                <Button variant='outlined' color='secondary' sx={{ minWidth: 32, height: 32, p: 0 }} onClick={() => onActive && onActive()}>
                  <PermContactCalendarTwoToneIcon fontSize='small' />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip placement='top' title='Editar'>
                <Button variant='outlined' color='info' sx={{ minWidth: 32, height: 32, p: 0 }} onClick={() => onEditClick && onEditClick()}>
                  <EditNoteTwoToneIcon fontSize='small' />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip placement='top' title='Eliminar'>
                <Button variant='outlined' color='error' sx={{ minWidth: 32, height: 32, p: 0 }} onClick={() => onDeleteClick && onDeleteClick()}>
                  <PersonRemoveTwoToneIcon fontSize='small' />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListWrapper>
  )
}

ContactList.propTypes = {
  avatar: PropTypes.string,
  phone: PropTypes.string,
  name: PropTypes.string,
  onActive: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  role: PropTypes.string
}

export default ContactList
