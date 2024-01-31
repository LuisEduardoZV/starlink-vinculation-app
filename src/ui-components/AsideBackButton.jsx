import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// mui imports
import ReplyAllTwoToneIcon from '@mui/icons-material/ReplyAllTwoTone'
import { Box, Fade, IconButton, Stack } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

import CustomTooltipBtns from './CustomTooltipBtns'

const AsideBackButton = ({ inFade, handleBack }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const extraTheme = theme.palette.mode === 'dark'
    ? {
        boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)', borderRadius: 2
      }
    : { borderRadius: 3, boxShadow: '20px 20px 48px #c8c8c8, -20px -20px 48px #ffffff' }

  return (
    <Fade in={inFade ?? true} mountOnEnter unmountOnExit style={{ zIndex: 5 }}>
      <Box position='relative' width='auto'>
        <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7), p: 1, backdropFilter: 'blur(10px)', ...extraTheme }}>
          <Stack direction='column'>
            <CustomTooltipBtns key='backbtn' type={handleBack ? 'error' : 'primary'} title='Regresar'>
              <IconButton onClick={() => { handleBack ? handleBack() : navigate(-1) }}>
                <ReplyAllTwoToneIcon color={handleBack ? 'error' : 'primary'} />
              </IconButton>
            </CustomTooltipBtns>

          </Stack>
        </Box>
      </Box>
    </Fade>
  )
}

AsideBackButton.propTypes = {
  inFade: PropTypes.bool,
  handleBack: PropTypes.func
}

export default AsideBackButton
