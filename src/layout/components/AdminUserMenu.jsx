import PropTypes from 'prop-types'

// mui imports
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import SatelliteAltTwoToneIcon from '@mui/icons-material/SatelliteAltTwoTone'
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone'
import { Tabs } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

// project imports
import LinkTab from '../../ui-components/LinkTab'

const AdminUserMenu = ({ tab, user, handleChange }) => {
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
        label='Usuarios' href={`/clients/${user?.user?.clientId}/users`} icon={<AccountCircleTwoToneIcon fontSize='small' sx={{ color: tab === 0 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
      <LinkTab
        label='Contactos' href={`/clients/${user?.user?.clientId}/contacts`} icon={<ContactPhoneTwoToneIcon fontSize='small' sx={{ color: tab === 1 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
      <LinkTab label='Terminales' href='/terminals' icon={<SatelliteAltTwoToneIcon fontSize='small' sx={{ color: tab === 2 ? theme.palette.primary[800] : theme.palette.primary.main }} />} />
      <LinkTab
        label='Vincular' href='/linking' icon={<InsertLinkIcon fontSize='small' sx={{ color: tab === 3 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
      <LinkTab
        label='Reportes' href='/reports' icon={<SummarizeTwoToneIcon fontSize='small' sx={{ color: tab === 4 ? theme.palette.primary[800] : theme.palette.primary.main }} />}
      />
    </Tabs>
  )
}

AdminUserMenu.propTypes = {
  tab: PropTypes.number,
  user: PropTypes.object,
  handleChange: PropTypes.func
}

export default AdminUserMenu
