import PropTypes from 'prop-types'
import { Fragment } from 'react'

// mui import
import { Grid, Typography } from '@mui/material'

// project imports
import MainMirrorCard from '../../../ui-components/MainMirrorCard'
import NoInfoOverlay from '../../../ui-components/NoInfoOverlay'
import ContactList from '../ContactList'

// services
import { getContactAvatar } from '../../../services/tableServices'

const ContactListContainer = ({ data, loading, tamContacts, onActive, onEdit, onDelete }) => {
  return (
    <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3, flexDirection: 'column' }}>
      {Object.keys(data).map((key, index) => (
        <Fragment key={index}>
          <Grid item xs={12}>
            <Typography variant='h4' color='primary' sx={{ fontSize: '1.5rem' }}>
              {key.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12} borderColor='transparent'>
            <Grid container direction='row' spacing={1} borderColor='transparent'>
              {data[key].map((userRow, i) => (
                <Grid item xs={12} key={i} borderColor='transparent'>
                  <ContactList
                    avatar={getContactAvatar(userRow.contactName)}
                    name={userRow.contactName}
                    role={userRow.contactPosition}
                    phone={userRow.contactPhone}
                    onActive={() => onActive(userRow)}
                    onEditClick={() => onEdit(userRow)}
                    onDeleteClick={() => onDelete(userRow)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Fragment>
      ))}
      {(!loading && tamContacts === 0) && <NoInfoOverlay />}
    </MainMirrorCard>
  )
}

ContactListContainer.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  tamContacts: PropTypes.number,
  onActive: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default ContactListContainer
