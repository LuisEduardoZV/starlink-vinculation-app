import PropTypes from 'prop-types'

// mui import
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'
import { Button, Grid } from '@mui/material'

import { PatternFormat } from 'react-number-format'

// project imports
import InputBase from '../../ui-components/InputBase'

const NewContactRow = ({ contactName, contactPosition, contactPhone, publicNote, handleDeleteContact, index }) => {
  return (
    <Grid container spacing={3} alignItems='center'>
      <Grid item xs={12} md={3}>
        <InputBase
          label='Nombre'
          value={contactName}
          variant='filled'
          size='small'
          fullWidth
          color='primary'
          InputProps={{ readOnly: true }}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <InputBase
          label='Posición de trabajo'
          value={contactPosition}
          variant='filled'
          size='small'
          fullWidth
          color='primary'
          InputProps={{ readOnly: true }}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <PatternFormat
          format='+52 (###) ###-####'
          mask='_'
          type='tel'
          customInput={InputBase}
          value={contactPhone}
          label='Teléfono móvil'
          variant='filled'
          size='small'
          fullWidth
          color='primary'
          error={false}
          InputProps={{ readOnly: true }}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <InputBase
          label='Nota'
          value={publicNote}
          variant='filled'
          size='small'
          fullWidth
          color='primary'
          InputProps={{ readOnly: true }}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <Button
          color='error'
          size='small'
          startIcon={<RemoveCircleTwoToneIcon />}
          onClick={(e) => handleDeleteContact(e, index)}
        >Eliminar
        </Button>
      </Grid>
    </Grid>
  )
}

NewContactRow.propTypes = {
  contactName: PropTypes.string,
  contactPosition: PropTypes.string,
  contactPhone: PropTypes.string,
  publicNote: PropTypes.string,
  handleDeleteContact: PropTypes.func,
  index: PropTypes.number
}


export default NewContactRow
