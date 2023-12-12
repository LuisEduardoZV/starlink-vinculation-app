import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import React from 'react'

const InputCustom = React.forwardRef((props, ref) => {
  const { error } = props
  return (
    <TextField
      {...props}
      ref={ref}
      error={error}
      sx={{
        boxShadow: (theme) => theme.shadows[5],
        '& .MuiInputBase-input': {
          backgroundColor: 'black',
          color: 'white'
        },
        '& .MuiInputBase-root': {
          backgroundColor: 'transparent',
          paddingRight: 0
        },
        '& .MuiInputLabel-root': {
          color: (theme) => error ? theme.palette.error.main : theme.palette.primary.main
        },
        '& label.Mui-focused': {
          color: (theme) => error ? theme.palette.error.main : theme.palette.primary.main
        },
        '& .MuiInput-underline:after': {
          border: 0
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 0
          },
          '&:hover fieldset': {
            border: 0
          },
          '&.Mui-focused fieldset': {
            border: 0
          }
        }
      }}
      InputProps={{ autoComplete: 'off', autoCorrect: 'off' }}
    />
  )
})

InputCustom.displayName = 'InputCustom'

InputCustom.propTypes = {
  error: PropTypes.bool
}

export default InputCustom
