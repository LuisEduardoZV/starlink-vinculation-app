import PropTypes from 'prop-types'
import { useState } from 'react'

// mui imports
import { Autocomplete, Chip, TextField, createFilterOptions } from '@mui/material'
import { alpha } from '@mui/material/styles'

const filter = createFilterOptions()

const InputSearch = ({ handleSearch }) => {
  const [search, setSearch] = useState([])

  return (
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
          variant='outlined'
          sx={{
            '& .MuiButtonBase-root': {
              color: (theme) => theme.palette.primary.main
            },
            '& .MuiAutocomplete-tag': {
              borderRadius: 10,
              bgcolor: 'transparent'
            }
          }}
        />
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((op, index) => (
          <Chip key={index} {...getTagProps({ index })} label={op} variant='outlined' color='primary' size='small' sx={{ bgcolor: 'transparent' }} />
        ))
      }}
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
        color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
        '& .MuiInputBase-input, & .MuiInputBase-root': {
          bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
          color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
        }
      }}
    />
  )
}

InputSearch.propTypes = {
  handleSearch: PropTypes.func
}

export default InputSearch
