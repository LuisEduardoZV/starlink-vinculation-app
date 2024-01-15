import PropTypes from 'prop-types'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'

const ModalDelete = ({ open, id, handleClose, handleDelete, title, subtitle }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle component='div' id='alert-dialog-title' sx={{ color: 'white' }}>
        <Typography variant='h2' color='inherit' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description' sx={{ bgcolor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.grey[500] }}>
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
        <Button onClick={handleClose} variant='outlined' color='error' autoFocus>Cancelar</Button>
        <Button onClick={() => handleDelete(id)} variant='outlined' color='primary'>
          Aceptar y Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalDelete.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default ModalDelete
