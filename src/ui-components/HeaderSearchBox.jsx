import PropTypes from 'prop-types'

// mui imports
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import { Box, Button, Typography } from '@mui/material'

// project imports
import InputSearch from './InputSearch'
import MainMirrorCard from './MainMirrorCard'

const HeaderSearchBox = ({ handleOnAdd, handleSearch, Icon }) => {
  const CustomIcon = Icon ?? PersonAddAltTwoToneIcon
  return (
    <MainMirrorCard sx={{ minHeight: 'auto', display: 'flex', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography color='white' variant='h2'>Lista de contactos</Typography>
      </Box>
      <Box minWidth='40%'>
        <InputSearch handleSearch={handleSearch} />
      </Box>
      <Box>
        <Button
          variant='contained'
          color='info'
          size='small'
          startIcon={<CustomIcon fontSize='small' />}
          onClick={handleOnAdd}
        >
          Agregar
        </Button>
      </Box>
    </MainMirrorCard>
  )
}

HeaderSearchBox.propTypes = {
  handleOnAdd: PropTypes.func,
  handleSearch: PropTypes.func,
  Icon: PropTypes.element
}

export default HeaderSearchBox
