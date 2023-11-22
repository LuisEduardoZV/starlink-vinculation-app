import PropTypes from 'prop-types'

// mui imports
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone'
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'
import { Box, Collapse, Fade, IconButton, Stack, Tooltip, tooltipClasses } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const AsideMenuCrud = ({ inFade, view, dataSelected, handleAdd, handleEdit, handleOpenDelete, addIcon }) => {
  const AddIcon = addIcon ?? AddCircleTwoToneIcon

  const CustomTooltipAdd = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow title='Agregar' placement='right' classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.primary.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main
    }
  }))

  const CustomTooltipEdit = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow title='Editar' placement='right' classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.info.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.info.main
    }
  }))

  const CustomTooltipDelete = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow title='Eliminar' placement='right' classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.error.main
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main
    }
  }))

  return (
    <Fade in={!inFade}>
      <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), boxShadow: (theme) => theme.shadows[10], borderRadius: 2, p: 1 }}>
        <Stack direction='column'>
          <CustomTooltipAdd>
            <IconButton onClick={handleAdd}>
              <AddIcon color='primary' />
            </IconButton>
          </CustomTooltipAdd>
          <Collapse in={!!dataSelected && !inFade && view !== 1}>
            <Stack direction='column'>
              <CustomTooltipEdit>
                <IconButton onClick={handleEdit}>
                  <ModeEditOutlineTwoToneIcon color='info' />
                </IconButton>
              </CustomTooltipEdit>
              <CustomTooltipDelete>
                <IconButton onClick={handleOpenDelete}>
                  <DeleteSweepTwoToneIcon color='error' />
                </IconButton>
              </CustomTooltipDelete>
            </Stack>
          </Collapse>

        </Stack>
      </Box>
    </Fade>
  )
}

AsideMenuCrud.propTypes = {
  inFade: PropTypes.bool,
  view: PropTypes.number,
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleOpenDelete: PropTypes.func,
  addIcon: PropTypes.any,
  dataSelected: PropTypes.object
}

export default AsideMenuCrud
