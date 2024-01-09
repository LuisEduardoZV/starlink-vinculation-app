import { ListItemButton } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const CustomListItemButtonPrimary = styled(ListItemButton)(({ theme }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.primary[800]
  },
  color: 'white',
  border: '1px solid',
  borderColor: 'transparent',
  textAlign: 'left',
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
    textAlign: 'right',
    color: theme.palette.mode === 'light' && theme.palette.common.black
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    color: theme.palette.mode === 'light' && theme.palette.common.black
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
    backgroundColor: theme.palette.primary[800]
  },
  color: 'white',
  border: '1px solid',
  borderColor: 'transparent',
  textAlign: 'left',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.success.light, 0.01) : alpha(theme.palette.info.light, 0.01)
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.mode === 'light' ? theme.palette.success.dark : theme.palette.info.main
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.success.dark, 0.2) : alpha(theme.palette.info.dark, 0.2),
    borderColor: theme.palette.mode === 'light' ? theme.palette.success.dark : theme.palette.info.main,
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'right'
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    fontWeight: theme.palette.mode === 'light' ? 400 : 600,
    textAlign: 'right'
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.info.main, 0.06)
  }
}))

export { CustomListItemButtonInfo, CustomListItemButtonPrimary }

