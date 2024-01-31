import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'

// mui imports
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone'
import { Box, Button, Fade, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import useAuth from '../../hooks/useAuth'
import ClientList from './Step1/ClientList'
import TermianlsList from './Step1/TermianlsList'

const FirstContainer = ({ values, inView, handleChange, handleContinue, viewType, handleLinkWithClient, handleUnlinkWithClient }) => {
  const { user } = useAuth()
  const theme = useTheme()
  const { client, terminals } = values
  const btnActive = useMemo(() => ((client !== null && terminals.length > 0 && inView === 1)), [client, terminals, inView])

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  useEffect(() => {
    if (client === null || terminals.length === 0) {
      handleChange('userVinculationInfo', [])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, terminals])

  return (
    <>
      {viewType && <ClientList inView={inView} handleChange={handleChange} />}
      <TermianlsList
        inView={inView}
        values={values}
        handleChange={handleChange}
        viewType={viewType}
        handleUnlinkWithClient={handleUnlinkWithClient}
      />
      <Box
        position='absolute' right={viewType ? '4%' : '10%'} bottom={matchDown2Xl ? '-6%' : '-3%'} zIndex={btnActive ? 5 : -1} sx={{
          maxWidth: viewType ? '60%' : '90%',
          minWidth: viewType ? '60%' : '90%',
          width: '100%'
        }}
      >
        <Fade in={btnActive}>
          <Box width='100%' display='flex' justifyContent={user?.user?.isPowerUser ? 'space-between' : 'flex-end'}>
            {(user?.user?.isPowerUser) ? <Button variant='outlined' onClick={() => handleLinkWithClient(client, terminals, values.clientName)} color='inherit'>Terminar vinculación</Button> : null}
            <Button variant='contained' endIcon={<TrendingFlatTwoToneIcon />} onClick={handleContinue}>Continuar & Asignar a Usuarios</Button>
          </Box>
        </Fade>
      </Box>
    </>
  )
}

FirstContainer.propTypes = {
  values: PropTypes.object,
  inView: PropTypes.number,
  viewType: PropTypes.bool,
  handleChange: PropTypes.func,
  handleLinkWithClient: PropTypes.func,
  handleUnlinkWithClient: PropTypes.func,
  handleContinue: PropTypes.func
}

export default FirstContainer
