import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { Box, Collapse, Divider, Fade, IconButton, Stack } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// project imports
import CustomTooltipBtns from './CustomTooltipBtns'
import InputSearch from './InputSearch'

const AsideMenuCrud = ({ inFade, view, dataSelected, handleAdd, handleEdit, handleOpenDelete, addIcon, handleSearch, extraBtns, btnsAvailable = true }) => {
  const theme = useTheme()

  const [activeSearch, setActiveSearch] = useState(false)

  const AddIcon = addIcon ?? AddCircleTwoToneIcon

  const renderExtraBtn = () => {
    if (extraBtns) {
      return (
        <>
          {extraBtns}
        </>
      )
    }
    return null
  }

  const aditionalBtns = renderExtraBtn()
  /*
  boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)', borderRadius: 2,
  */

  const extraTheme = theme.palette.mode === 'dark' ? { boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)', borderRadius: 2 } : { borderRadius: 3, boxShadow: '20px 20px 48px #c8c8c8, -20px -20px 48px #ffffff' }

  const extraThemeSearch = theme.palette.mode === 'dark' ? { borderRadius: 2, boxShadow: '7px 7px 10px 0px rgba(10, 10, 10, 1)' } : { borderRadius: 3, boxShadow: '20px 20px 48px #c8c8c8, -20px -20px 48px #ffffff' }


  return (
    <Fade in={!inFade} mountOnEnter unmountOnExit style={{ zIndex: 5 }}>
      <Box position='relative' width='auto'>
        <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: theme.palette.background.paper, p: 1, ...extraTheme }}>
          <Stack direction='column'>
            <IconButton
              sx={{
                animation: activeSearch ? 'floating 3s ease-in-out infinite' : 'none'
              }}
              onClick={() => setActiveSearch(current => !current)}
            >
              <SearchTwoToneIcon sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }} />
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
                <Box color='white' sx={{ bgcolor: alpha(theme.palette.background.paper, 1), py: 1, pr: 2, pl: 1, height: '100%', minHeight: 50, minWidth: 350, ...extraThemeSearch }}>
                  <InputSearch handleSearch={handleSearch} />
                </Box>
              </Box>
            </Collapse>
            {(!btnsAvailable && extraBtns) && (aditionalBtns)}
            {btnsAvailable && (
              <>
                <Divider sx={{ borderColor: theme.palette.grey[800], my: 0.5 }} />
                <CustomTooltipBtns key='addbtn' type='primary' title='Agregar'>
                  <IconButton onClick={handleAdd}>
                    <AddIcon color='primary' />
                  </IconButton>
                </CustomTooltipBtns>
                <Collapse in={!!dataSelected && !inFade && view !== 1}>
                  <Stack direction='column'>
                    <CustomTooltipBtns key='editbtn' type={theme.palette.mode === 'light' ? 'success' : 'info'} title='Editar'>
                      <IconButton onClick={handleEdit}>
                        <ModeEditOutlineTwoToneIcon color={theme.palette.mode === 'light' ? 'success' : 'info'} />
                      </IconButton>
                    </CustomTooltipBtns>
                    {extraBtns && (aditionalBtns)}
                    <Divider sx={{ borderColor: theme.palette.grey[800], my: 0.5 }} />
                    <CustomTooltipBtns key='deletebtn' type='error' title='Eliminar'>
                      <IconButton onClick={handleOpenDelete}>
                        <DeleteSweepTwoToneIcon color='error' />
                      </IconButton>
                    </CustomTooltipBtns>
                  </Stack>
                </Collapse>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Fade>
  )
}

AsideMenuCrud.propTypes = {
  inFade: PropTypes.bool,
  btnsAvailable: PropTypes.bool,
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
