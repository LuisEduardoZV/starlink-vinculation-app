import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { Box, Collapse, Divider, Fade, IconButton, Stack, Tooltip, tooltipClasses } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import InputSearch from './InputSearch'

const AsideMenuCrud = ({ inFade, view, dataSelected, handleAdd, handleEdit, handleOpenDelete, addIcon, handleSearch, extraBtns }) => {
  const [activeSearch, setActiveSearch] = useState(false)

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
    <Fade in={!inFade} mountOnEnter unmountOnExit style={{ zIndex: 5 }}>
      <Box position='relative' width='auto'>
        <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)', borderRadius: 2, p: 1 }}>
          <Stack direction='column'>
            <IconButton
              sx={{
                animation: activeSearch ? 'floating 3s ease-in-out infinite' : 'none'
              }}
              onClick={() => setActiveSearch(current => !current)}
            >
              <SearchTwoToneIcon sx={{ color: 'white' }} />
            </IconButton>
            <Collapse
              in={activeSearch}
              orientation='horizontal'
              sx={{ float: 'right', position: 'absolute', top: 0, left: '105%' }}
            >
              <Box position='relative'>
                <IconButton size='small' color='primary' sx={{ position: 'absolute', top: -13, right: -13 }} onClick={() => setActiveSearch(false)}>
                  <HighlightOffTwoToneIcon fontSize='small' />
                </IconButton>
                <Box color='white' sx={{ bgcolor: (theme) => alpha(theme.palette.grey[600], 1), borderRadius: 2, boxShadow: (theme) => theme.shadows[10], py: 1, pr: 2, pl: 1, height: '100%', minHeight: 50, minWidth: 350 }}>
                  <InputSearch handleSearch={handleSearch} />
                </Box>
              </Box>
            </Collapse>
            <Divider sx={{ borderColor: (theme) => theme.palette.grey[800], my: 0.5 }} />
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
                {extraBtns && (
                  <>
                    {extraBtns}
                    <Divider sx={{ borderColor: (theme) => theme.palette.grey[800], my: 0.5 }} />
                  </>
                )}
                <CustomTooltipDelete>
                  <IconButton onClick={handleOpenDelete}>
                    <DeleteSweepTwoToneIcon color='error' />
                  </IconButton>
                </CustomTooltipDelete>
              </Stack>
            </Collapse>

          </Stack>
        </Box>
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
  handleSearch: PropTypes.func,
  addIcon: PropTypes.any,
  dataSelected: PropTypes.object,
  extraBtns: PropTypes.arrayOf(PropTypes.node)
}

export default AsideMenuCrud
