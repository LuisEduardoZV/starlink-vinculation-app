import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import { Autocomplete, Box, Collapse, Divider, Fade, IconButton, Stack, TextField, Tooltip, createFilterOptions, tooltipClasses } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const filter = createFilterOptions()

const AsideMenuCrud = ({ inFade, view, dataSelected, handleAdd, handleEdit, handleOpenDelete, addIcon, handleSearch }) => {
  const [activeSearch, setActiveSearch] = useState(false)
  const [search, setSearch] = useState([])

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
        <Box sx={{ position: 'fixed', color: 'white', left: '4%', bgcolor: (theme) => alpha(theme.palette.grey[600], 0.7), boxShadow: (theme) => theme.shadows[10], borderRadius: 2, p: 1 }}>
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
                  <Autocomplete
                    value={search}
                    size='small'
                    multiple
                    fullWidth
                    limitTags={4}
                    onChange={(event, newValue) => {
                      const values = []
                      for (let i = 0; i < newValue.length; i += 1) {
                        if (typeof newValue[i] === 'string') {
                          if (newValue[i].trim() !== '') {
                            if (newValue[i].trim().includes(' ')) {
                              const split = newValue[i].trim().split(' ')
                              split.forEach((op) => {
                                values.push(op.trim())
                              })
                            } else values.push(newValue[i].trim())
                          }
                        } else if (newValue[i].inputValue && newValue[i].inputValue.trim() !== '') {
                          values.push(newValue[i].inputValue.trim())
                        } else if (newValue[i].itemKey) {
                          values.push(newValue[i].itemValue)
                        }
                      }
                      setSearch(values)
                      handleSearch(event, values)
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)
                      const { inputValue } = params
                      const isExisting = options.some((option) => inputValue === option.itemValue)
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          itemValue: `Buscar por: "${inputValue}"`
                        })
                      }
                      return filtered
                    }}
                    id='free-solo-with-text-demo'
                    options={[]}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }
                      if (option.inputValue) {
                        return option.inputValue
                      }
                      if (option.itemKey) {
                        return option.itemValue
                      }
                      return option.itemValue
                    }}
                    renderOption={(props, option) => <li {...props}>{option.itemValue}</li>}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label='Buscar...'
                        sx={{
                          '& .MuiButtonBase-root': {
                            color: (theme) => theme.palette.primary.main
                          },
                          '& .MuiChip-root': {
                            color: 'black',
                            bgcolor: (theme) => theme.palette.primary.main
                          }
                        }}
                      />
                    )}
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                      color: 'white',
                      '& .MuiInputBase-input, & .MuiInputBase-root': {
                        bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                        color: 'white'
                      }
                    }}
                  />
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
  dataSelected: PropTypes.object
}

export default AsideMenuCrud
