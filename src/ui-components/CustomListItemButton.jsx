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
    backgroundColor: alpha(theme.palette.primary.light, 0.01)
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.primary.main
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary[800], 0.2),
    borderColor: theme.palette.primary.main,
    position: 'sticky',
    top: 1,
    zIndex: 2,
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'right'
  },
  '&.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.06)
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
    backgroundColor: alpha(theme.palette.info.light, 0.01)
  },
  '&:hover .MuiListItemText-primary': {
    color: theme.palette.info.main
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.info.dark, 0.2),
    borderColor: theme.palette.info.main,
    backdropFilter: 'blur(60px)'
  },
  '&.Mui-selected .MuiListItemText-primary': {
    fontWeight: 800,
    textAlign: 'right'
  },
  '&.Mui-selected .MuiListItemText-secondary': {
    fontWeight: 600,
    textAlign: 'right'
  },
  '&.Mui-selected:hover': {
    backgroundColor: alpha(theme.palette.info.main, 0.06)
  }
}))

export { CustomListItemButtonInfo, CustomListItemButtonPrimary }

