import { ListItemButton } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const CustomListItemButtonPrimary = styled(ListItemButton)(({ theme }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light
  },
  color: 'white',
  border: '1px solid',
  borderColor: 'transparent',
  textAlign: 'right',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.light, 0.01)
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.dark, 0.2) : alpha(theme.palette.primary[800], 0.2),
    borderColor: theme.palette.primary.main,
    position: 'sticky',
    top: 1,
    zIndex: 2,
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'left',
    color: theme.palette.mode === 'light' && theme.palette.common.black
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    color: theme.palette.mode === 'light' && theme.palette.common.black
  },
  '.MuiListItemText-primary': {
    transition: 'all 0.3s ease-in-out'
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.primary.main
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.06)
  }
}))

const CustomListItemButtonInfo = styled(ListItemButton)(({ theme }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
  },
  color: 'white',
  border: '1px solid',
  borderColor: 'transparent',
  textAlign: 'left',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.05) : alpha(theme.palette.common.white, 0.05)
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.grey[600]
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.grey[800], 0.3),
    borderColor: theme.palette.grey[700],
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'left'
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    fontWeight: theme.palette.mode === 'light' ? 400 : 600,
    textAlign: 'right'
  },
  '&.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
    borderColor: theme.palette.grey[800]
  }
}))

const CustomListItemButtonInfoDisable = styled(ListItemButton)(({ theme }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
  },
  border: '1px solid',
  borderColor: 'transparent',
  textAlign: 'left',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.05) : alpha(theme.palette.common.white, 0.05)
  },
  '.MuiListItemText-primary': {
    transition: 'all 0.3s ease-in-out'
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.grey[600]
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
    borderColor: theme.palette.grey[800],
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'left'
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    fontWeight: theme.palette.mode === 'light' ? 400 : 600,
    textAlign: 'left'
  },
  '&.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
    borderColor: theme.palette.grey[800]
  }
}))

export { CustomListItemButtonInfo, CustomListItemButtonInfoDisable, CustomListItemButtonPrimary }

