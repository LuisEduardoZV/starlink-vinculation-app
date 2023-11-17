import { useState } from 'react'

// mui imports
import { Box, Tabs, Typography } from '@mui/material'

// project imports
import { samePageLinkNavigation } from '../services/samplePageLinkNavigation'
import LinkTab from '../ui-components/LinkTab'

import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone'
import RoofingTwoToneIcon from '@mui/icons-material/RoofingTwoTone'
import SatelliteAltTwoToneIcon from '@mui/icons-material/SatelliteAltTwoTone'
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone'

const HeaderSection = () => {
  const [tab, setTab] = useState(0)

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setTab(newValue)
    }
  }

  return (
    <Box sx={{
      color: 'white',
      height: 'auto',
      position: 'fixed',
      display: 'flex',
      top: 0,
      left: '4%',
      right: '4%',
      borderRadius: 2,
      px: 3,
      py: 1,
      alignItems: 'center',
      backdropFilter: 'blur(6px)',
      boxShadow: (theme) => theme.shadows[10]
    }}
    >
      <Typography flex={1} variant='h2' color='white' sx={{ textShadow: '4px 4px 3px black' }}>Tan-Graph</Typography>
      <Box flex={5} display='flex' justifyContent='center'>
        <Tabs
          value={tab} onChange={handleChange}
          sx={{
            minHeight: '40px',
            display: 'flex',
            width: 'fit-content',
            '& .MuiTab-root.Mui-selected': { color: 'black', bgcolor: 'white', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' },
            '& .MuiTab-root': { py: 0, minHeight: '40px', bgcolor: (theme) => theme.palette.background.paper, pt: 0.5 },
            '& .MuiTabs-flexContainer': { borderColor: (theme) => theme.palette.grey[400] }
          }}
          TabIndicatorProps={{ style: { background: 'white', maxHeight: '1px' } }}
        >
          <LinkTab label='Tablero' href='/drafts' icon={<RoofingTwoToneIcon fontSize='small' />} />
          <LinkTab label='Clientes' href='/drafts' icon={<SupervisorAccountTwoToneIcon fontSize='small' />} />
          <LinkTab label='Terminales' href='/trash' icon={<SatelliteAltTwoToneIcon fontSize='small' />} />
          <LinkTab label='Usuarios' href='/spam' icon={<PermIdentityTwoToneIcon fontSize='small' />} />
        </Tabs>
      </Box>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        Opciones
      </Box>
    </Box>
  )
}

export default HeaderSection
