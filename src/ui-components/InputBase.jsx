import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'

const InputBase = (props) => {
  const { error } = props
  return (
    <TextField
      {...props}
      error={error}
      sx={{
        boxShadow: (theme) => theme.shadows[5],
        '& .MuiInputBase-input': {
          color: 'white'
        },
        '& .MuiInputLabel-root': {
          color: !error && ((theme) => theme.palette.primary.main)
        },
        '& .Mui-disabled': {
          WebkitTextFillColor: 'inherit'
        },
        '& .MuiInputLabel-root:disabled ': {
          color: (theme) => theme.palette.primary[800]
        },
        '& .MuiInputBase-input:disabled ': {
          color: (theme) => theme.palette.grey[500]
        }
      }}
      InputProps={{ autoComplete: 'off', autoCorrect: 'off' }}
    />
  )
}

InputBase.propTypes = {
  error: PropTypes.bool
}

export default InputBase
