import PropTypes from 'prop-types'

// mui imports
import { Box, Typography } from '@mui/material'

// project imports
import LoadingInfo from '../../../ui-components/LoadingInfo'
import MainMirrorCard from '../../../ui-components/MainMirrorCard'

// assets
import starlink from '../../../assets/image/starlink.png'

const ViewByClient = ({ loading, data, selected, handleClick, handleSave, isSuperUser }) => {
  const isSelected = (name) => selected.indexOf(name) !== -1

  if (loading) return <LoadingInfo />
  return (
    <Box display='flex' flex={1} width='100%' justifyContent='space-between' gap={1} flexWrap='wrap'>
      {data && data.map(({ clientTerminal_Id: clientTerminalId, serviceLineNumber, terminalFriendlyName, terminalKitNumber, terminalLatitude, terminalLineOfService, terminalLongitude, terminalSiteName, terminalId }) => {
        const isItemSelected = isSelected(terminalId)
        return (
          <MainMirrorCard
            key={clientTerminalId} sx={{
              placeItems: 'center',
              display: 'flex',
              zIndex: isItemSelected ? 3 : 1,
              flexDirection: 'column',
              maxWidth: 'min-content',
              minWidth: '20%',
              transition: 'transform 0.3s ease-in-out',
              transform: isItemSelected && 'scale(1.2)',
              '&:hover': {
                transform: isItemSelected ? 'scale(1.2)' : 'scale(1.05)',
                cursor: 'pointer'
              }
            }}
            onClick={(e) => handleClick(e, terminalId)}
          >
            <Typography variant='h4'>{terminalKitNumber}</Typography>
            <Typography variant='body2' fontSize={13}>{terminalLineOfService}</Typography>
            <Box
              component='img'
              sx={{
                height: 210,
                width: 210,
                opacity: isItemSelected ? 0 : 100,
                visibility: isItemSelected ? 'hidden' : 'visible',
                zIndex: isItemSelected ? -1 : 1,
                transform: isItemSelected && 'scale(0)',
                transition: 'all 0.3s linear'
              }}
              alt='The house from the offer.'
              src={starlink}
            />
            <Box sx={{
              opacity: !isItemSelected ? 0 : 100,
              visibility: !isItemSelected ? 'hidden' : 'visible',
              zIndex: !isItemSelected ? -1 : 1
            }}
            />
          </MainMirrorCard>
        )
      })}
    </Box>
  )
}

ViewByClient.propTypes = {
  loading: PropTypes.bool,
  isSuperUser: PropTypes.bool,
  data: PropTypes.array,
  selected: PropTypes.array,
  handleClick: PropTypes.func,
  handleSave: PropTypes.func
}

export default ViewByClient
