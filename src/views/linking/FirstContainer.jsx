import PropTypes from 'prop-types'
import { useMemo } from 'react'

// mui imports
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone'
import { Box, Button, Fade, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import ClientList from './Step1/ClientList'
import TermianlsList from './Step1/TermianlsList'

const FirstContainer = ({ values, inView, handleChange, handleContinue, viewType }) => {
  const theme = useTheme()
  const btnActive = useMemo(() => ((values.client !== null && values.terminals.length > 0 && inView === 1)), [values, inView])

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))
  return (
    <>
      {viewType && <ClientList inView={inView} handleChange={handleChange} />}
      <TermianlsList
        inView={inView}
        values={values}
        handleChange={handleChange}
        viewType={viewType}
      />
      <Box position='absolute' right={viewType ? '5%' : '10%'} bottom={matchDown2Xl ? '7%' : '3%'} zIndex={btnActive ? 5 : -1}>
        <Fade in={btnActive}>
          <Button variant='outlined' endIcon={<TrendingFlatTwoToneIcon />} onClick={handleContinue}>Continuar</Button>
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
  handleContinue: PropTypes.func
}

export default FirstContainer
