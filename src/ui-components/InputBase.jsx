import React from 'react'

import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

const InputBase = React.forwardRef(({ error, extraSx, ...others }, ref) => (
  <TextField
    {...others}
    ref={ref}
    error={error}
    sx={{
      boxShadow: (theme) => theme.shadows[5],
      bgcolor: (theme) => theme.palette.background.default,
      '& .MuiInputBase-input': {
        color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
        WebkitTextFillColor: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
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
        color: (theme) => theme.palette.primary[500],
        WebkitTextFillColor: 'inherit'
      },
      ...extraSx
    }}
    inputProps={{ autoComplete: 'off', autoCorrect: 'off' }}
  />
))

InputBase.displayName = 'InputBase'

InputBase.propTypes = {
  error: PropTypes.bool,
  extraSx: PropTypes.object
}

export default InputBase
