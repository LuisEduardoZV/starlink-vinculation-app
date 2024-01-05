import PropTypes from 'prop-types'

// mui imports
import { Box, Grid, Tooltip, Typography } from '@mui/material'

// third imports
import { PatternFormat } from 'react-number-format'

// project imports
import CustomSwitch from '../../../ui-components/CustomSwitch'
import InputBase from '../../../ui-components/InputBase'
import DefaultBtnsForms from '../../../ui-components/extended/DefaultBtnsForms'
import ContactsContainer from './ContactsContainer'

const AuthContainer = ({ values, touched, errors, isSubmitting, handleBlur, handleChange, loading, contacts, contact, handleAddNewContact, handleDeleteContact, handleChangeContact, handleCancel, preContacts, handleDeletePreContact, isAdding }) => {
  return (
    <Grid container spacing={5} width='100%'>
      <Grid item xs={12} md={5}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientName && { title: errors.clientName }}>
          <InputBase
            value={values.clientName}
            name='clientName'
            label='Nombre del cliente'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            required
            color='primary'
            error={Boolean(touched.clientName && errors.clientName)}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={4}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientTaxId && { title: errors.clientTaxId }}>
          <InputBase
            value={values.clientTaxId}
            name='clientTaxId'
            label='RFC / ID'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.clientTaxId && errors.clientTaxId)}
            required
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={3}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientNumber && { title: errors.clientNumber }}>
          <InputBase
            value={values.clientNumber}
            name='clientNumber'
            label='Número de cliente'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.clientNumber && errors.clientNumber)}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={7}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientAddress && { title: errors.clientAddress }}>
          <InputBase
            value={values.clientAddress}
            name='clientAddress'
            label='Dirección'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.clientAddress && errors.clientAddress)}
            required
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={2}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientZip && { title: errors.clientZip }}>
          <InputBase
            value={values.clientZip}
            name='clientZip'
            label='Código postal'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.clientZip && errors.clientZip)}
            required
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={3}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientPhone && { title: errors.clientPhone }}>
          <Box>
            <PatternFormat
              format='+1 (###) ###-####'
              mask='_'
              type='tel'
              customInput={InputBase}
              value={values.clientPhone}
              name='clientPhone'
              label='Teléfono movil'
              onBlur={handleBlur}
              onChange={handleChange}
              variant='filled'
              size='small'
              fullWidth
              color='primary'
              required
              error={Boolean(touched.clientPhone && errors.clientPhone)}
            />
          </Box>
        </Tooltip>
      </Grid>
      <Grid item xs={12} md={isAdding ? 12 : 9}>
        <Tooltip arrow followCursor disableInteractive {...errors.clientEmail && { title: errors.clientEmail }}>
          <InputBase
            value={values.clientEmail}
            name='clientEmail'
            type='email'
            label='Correl eletrónico'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            color='primary'
            error={Boolean(touched.clientEmail && errors.clientEmail)}
            required
          />
        </Tooltip>
      </Grid>
      {!isAdding && (
        <Grid item xs={12} md={3} position='relative'>
          <CustomSwitch
            value={!!values.isEnabled}
            handleChange={handleChange}
            name='isEnabled'
            label='Estatus'
            option1='Inactivo'
            option2='Activo'
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Tooltip arrow followCursor disableInteractive {...errors.publicNote && { title: errors.publicNote }}>
          <InputBase
            value={values.publicNote ?? ''}
            name='publicNote'
            label='Notas'
            onBlur={handleBlur}
            onChange={handleChange}
            variant='filled'
            size='small'
            fullWidth
            multiline
            rows={3}
            color='primary'
            error={Boolean(touched.publicNote && errors.publicNote)}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h4' sx={{ color: (theme) => theme.palette.grey[500] }}
        >Contactos
        </Typography>
      </Grid>
      <ContactsContainer
        contact={contact}
        contacts={contacts}
        loading={loading}
        handleAddNewContact={handleAddNewContact}
        handleChangeContact={handleChangeContact}
        handleDeleteContact={handleDeleteContact}
        preContacts={preContacts ?? null}
        handleDeletePreContact={preContacts && handleDeletePreContact}
      />
      <Grid item xs={12}>
        <DefaultBtnsForms
          handleCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </Grid>
    </Grid>
  )
}

AuthContainer.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isAdding: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  loading: PropTypes.bool,
  contacts: PropTypes.array,
  contact: PropTypes.object,
  handleAddNewContact: PropTypes.func,
  handleDeleteContact: PropTypes.func,
  handleChangeContact: PropTypes.func,
  handleCancel: PropTypes.func,
  preContacts: PropTypes.array,
  handleDeletePreContact: PropTypes.func
}

export default AuthContainer
