import React from 'react'

import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

const InputBase = React.forwardRef(({ error, ...others }, ref) => (
  <TextField
    {...others}
    ref={ref}
    error={error}
    sx={{
      boxShadow: (theme) => theme.shadows[5],
      '& .MuiInputBase-input': {
        color: 'white',
        WebkitTextFillColor: 'white'
      },
      '& .MuiInputLabel-root': {
        color: !error && ((theme) => theme.palette.primary.main)
      },
      '& .Mui-disabled, & .Mui-readOnly': {
        WebkitTextFillColor: 'inherit'
      },
      '& .MuiInputLabel-root.Mui-disabled': {
        color: (theme) => theme.palette.primary[800]
      },
      '& .MuiInputBase-input.MuiFilledInput-input.Mui-disabled ': {
        color: (theme) => theme.palette.grey[500],
        WebkitTextFillColor: 'inherit'
      }
    }}
    inputProps={{ autoComplete: 'off', autoCorrect: 'off' }}
  />
))

InputBase.displayName = 'InputBase'

InputBase.propTypes = {
  error: PropTypes.bool
}

export default InputBase
