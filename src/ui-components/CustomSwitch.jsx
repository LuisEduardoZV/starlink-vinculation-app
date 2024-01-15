import PropTypes from 'prop-types'

// mui imports
import { Box, Switch, Typography } from '@mui/material'

const CustomSwitch = ({ value, handleChange, name, label, option1, option2, sxLabel, ...props }) =>
  (
    <>
      <Typography variant='caption' color='primary' sx={{ position: 'absolute', top: '30%', left: '19%', fontSize: '10px', ...sxLabel }}>{label}</Typography>
      <Box display='flex' alignItems='center' width='100%' justifyContent='center' mt={2} gap={2}>
        <Typography
          variant='caption'
          sx={{
            color: (theme) => value ? theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500] : theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
            fontWeight: !value && '800',
            fontSize: !value && '13px',
            transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
          }}
        >{option1}
        </Typography>
        <Switch
          color='primary'
          size='small'
          checked={value}
          name={name}
          onChange={handleChange}
        />
        <Typography
          variant='caption'
          sx={{
            color: (theme) => !value ? theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[500] : theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
            fontWeight: value && '800',
            fontSize: value && '13px',
            transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, font-size 0.3s ease-in-out'
          }}
        >{option2}
        </Typography>
      </Box>
    </>
  )

CustomSwitch.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  option1: PropTypes.string,
  option2: PropTypes.string,
  sxLabel: PropTypes.object
}

export default CustomSwitch
