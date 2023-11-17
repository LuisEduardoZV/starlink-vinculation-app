import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const InputCustom = styled(TextField)({
  '& .MuiInputBase-input': {
    backgroundColor: 'black',
    color: 'white'
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent'
  },
  '& .MuiInputLabel-root': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: 'white'
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
})

export default InputCustom
