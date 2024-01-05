import PropTypes from 'prop-types'

// mui imports
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import { Box, Button, Typography } from '@mui/material'

// project imports
import InputSearch from './InputSearch'
import MainMirrorFade from './MainMirrorFade'

const HeaderSearchBox = ({ handleOnAdd, handleSearch, Icon, title, open = true }) => {
  const CustomIcon = Icon ?? PersonAddAltTwoToneIcon
  return (
    <MainMirrorFade open={open} sx={{ minHeight: 'auto', display: 'flex', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
      <Box flex={1}>
        <Typography color='white' variant='h3'>{title}</Typography>
      </Box>
      <Box flex={1}>
        <InputSearch handleSearch={handleSearch} />
      </Box>
      <Box flex={1} justifyContent='end' display='flex'>
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
    </MainMirrorFade>
  )
}

HeaderSearchBox.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleOnAdd: PropTypes.func,
  handleSearch: PropTypes.func,
  Icon: PropTypes.element
}

export default HeaderSearchBox
