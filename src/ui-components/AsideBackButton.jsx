import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// mui imports
import ReplyAllTwoToneIcon from '@mui/icons-material/ReplyAllTwoTone'
import { Box, Fade, IconButton, Stack, Tooltip, tooltipClasses } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const AsideBackButton = ({ inFade, handleBack }) => {
  const navigate = useNavigate()

  const CustomTooltipBack = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow title='Regresar' placement='right' classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.info.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.info.main
    }
  }))

  return (
    <Fade in mountOnEnter unmountOnExit style={{ zIndex: 5 }}>
      <Box position='relative' width='auto'>
        <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), boxShadow: (theme) => theme.shadows[10], borderRadius: 2, p: 1 }}>
          <Stack direction='column'>
            <CustomTooltipBack>
              <IconButton onClick={() => { handleBack ? handleBack() : navigate(-1) }}>
                <ReplyAllTwoToneIcon color={handleBack ? 'error' : 'info'} />
              </IconButton>
            </CustomTooltipBack>

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
