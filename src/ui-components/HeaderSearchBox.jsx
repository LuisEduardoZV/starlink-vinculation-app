import PropTypes from 'prop-types'
import React from 'react'

// mui imports
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import { Box, Button, Typography } from '@mui/material'

// project imports
import InputSearch from './InputSearch'
import MainMirrorCard from './MainMirrorCard'

const HeaderSearchBox = React.forwardRef(({ handleOnAdd, handleSearch, Icon, title }, ref) => {
  const CustomIcon = Icon ?? PersonAddAltTwoToneIcon
  return (
    <MainMirrorCard ref={ref} sx={{ minHeight: 'auto', display: 'flex', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography color='white' variant='h2'>{title}</Typography>
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
})

HeaderSearchBox.displayName = 'HeaderSearchBox'

HeaderSearchBox.propTypes = {
  title: PropTypes.string,
  handleOnAdd: PropTypes.func,
  handleSearch: PropTypes.func,
  Icon: PropTypes.element
}

export default HeaderSearchBox
