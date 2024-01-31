import PropTypes from 'prop-types'

// mui imports
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import SatelliteAltTwoToneIcon from '@mui/icons-material/SatelliteAltTwoTone'
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'
import { Tabs } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// project imports
import LinkTab from '../../ui-components/LinkTab'

const PowerUserMenu = ({ tab, handleChange }) => {
  const theme = useTheme()

  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      sx={{
        minHeight: '40px',
        display: 'flex',
        width: 'fit-content',
        '& .MuiTab-root.Mui-selected': { color: 'black', bgcolor: alpha(theme.palette.common.white, 0.55), transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' },
        '& .MuiTab-root': { py: 0, minHeight: '40px', pt: 0.5 },
        '& .MuiTabs-flexContainer': { borderColor: theme.palette.grey[400] }
      }}
      TabIndicatorProps={{ style: { maxHeight: '2px' } }}
    >
      <LinkTab
        label='Clientes' href='/clients'
        icon={<SupervisedUserCircleTwoToneIcon
          fontSize='small' sx={{ color: tab === 0 ? theme.palette.primary[800] : theme.palette.primary.main }}
              />}
      />
      <LinkTab label='Terminales' href='/terminals' icon={<SatelliteAltTwoToneIcon fontSize='small' sx={{ color: tab === 1 ? theme.palette.primary[800] : theme.palette.primary.main }} />} />
      <LinkTab
        label='Vincular' href='/linking' icon={<InsertLinkIcon fontSize='small' sx={{ color: tab === 2 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
      <LinkTab
        label='Terminales Asignadas' href='/terminalsAssigned' icon={<CloudDoneTwoToneIcon fontSize='small' sx={{ color: tab === 3 ? theme.palette.primary[800] : theme.palette.primary.main }} />} sx={{ borderLeft: `solid 1px ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[400]}` }}
      />
      <LinkTab
        label='Reportes' href='/reports' icon={<SummarizeTwoToneIcon fontSize='small' sx={{ color: tab === 4 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
      <LinkTab
        label='Super usuarios' href='/admins' icon={<AdminPanelSettingsTwoToneIcon fontSize='small' sx={{ color: tab === 5 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
    </Tabs>
  )
}

PowerUserMenu.propTypes = {
  tab: PropTypes.number,
  handleChange: PropTypes.func
}

export default PowerUserMenu
