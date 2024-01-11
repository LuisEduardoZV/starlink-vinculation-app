import PropTypes from 'prop-types'

// mui imports
import { Box, Button } from '@mui/material'

const DefaultBtnsForms = ({ okBtnLabel = 'Guardar', cancelBtnLabel = 'Cancelar', handleCancel, isSubmitting, noCancel = false, ...props }) => {
  return (
    <Box width='100%' display='flex' justifyContent={noCancel ? 'flex-end' : 'space-evenly'} height='100%' mt={4} {...props}>
      {!noCancel && (
        <Button color='error' variant='outlined' onClick={handleCancel} sx={{ alignSelf: 'flex-start' }}>{cancelBtnLabel}</Button>
      )}
      <Button color='info' variant='outlined' type='submit' disabled={isSubmitting} sx={{ alignSelf: 'flex-start' }}>
        {okBtnLabel}
      </Button>
    </Box>
  )
}

DefaultBtnsForms.propTypes = {
  okBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  handleCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
  noCancel: PropTypes.bool
}

export default DefaultBtnsForms
