import PropTypes from 'prop-types'

// mui imports
import LooksOneTwoToneIcon from '@mui/icons-material/LooksOneTwoTone'
import { Box, List, ListItemText, Typography } from '@mui/material'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { CustomListItemButtonPrimary as CustomListItemButton } from '../../ui-components/CustomListItemButton'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const clients = [
  {
    name: 'ABC Company',
    operator: 'John Doe',
    position: 'CEO',
    user: 'johndoe',
    password: 'password123',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    clientId: '1'
  },
  {
    name: 'XYZ Corporation',
    operator: 'Jane Smith',
    position: 'CFO',
    user: 'janesmith',
    password: 'pass456',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    clientId: '2'
  },
  {
    name: '123 Industries',
    operator: 'Mike Johnson',
    position: 'CTO',
    user: 'mikejohnson',
    password: 'wordpass789',
    email: 'mikejohnson@example.com',
    phone: '555-123-4567',
    clientId: '3'
  },
  {
    name: 'Acme Co.',
    operator: 'Sarah Williams',
    position: 'COO',
    user: 'sarahwilliams',
    password: 'acmepass',
    email: 'sarahwilliams@example.com',
    phone: '888-999-0000',
    clientId: '4'
  },
  {
    name: 'Global Corp.',
    operator: 'Robert Brown',
    position: 'CIO',
    user: 'robertbrown',
    password: 'global123',
    email: 'robertbrown@example.com',
    phone: '111-222-3333',
    clientId: '5'
  },
  {
    name: 'Tech Solutions',
    operator: 'Lisa Davis',
    position: 'Manager',
    user: 'lisadavis',
    password: 'techpass',
    email: 'lisadavis@example.com',
    phone: '444-555-6666',
    clientId: '6'
  },
  {
    name: 'Innovative Inc.',
    operator: 'Mark Wilson',
    position: 'Director',
    user: 'markwilson',
    password: 'innovate789',
    email: 'markwilson@example.com',
    phone: '777-888-9999',
    clientId: '7'
  },
  {
    name: 'Alpha Enterprises',
    operator: 'Emily Taylor',
    position: 'Supervisor',
    user: 'emilytaylor',
    password: 'alpha456',
    email: 'emilytaylor@example.com',
    phone: '222-333-4444',
    clientId: '8'
  },
  {
    name: 'Beta Corp.',
    operator: 'David Anderson',
    position: 'Analyst',
    user: 'davidanderson',
    password: 'betapass',
    email: 'davidanderson@example.com',
    phone: '555-666-7777',
    clientId: '9'
  },
  {
    name: 'Gamma Ltd.',
    operator: 'Olivia Martinez',
    position: 'Engineer',
    user: 'oliviamartinez',
    password: 'gamma123',
    email: 'oliviamartinez@example.com',
    phone: '888-999-0000',
    clientId: '10'
  },
  {
    name: 'Delta Systems',
    operator: 'Daniel Brown',
    position: 'Developer',
    user: 'danielbrown',
    password: 'deltapass',
    email: 'danielbrown@example.com',
    phone: '111-222-3333',
    clientId: '11'
  },
  {
    name: 'Sigma Solutions',
    operator: 'Sophia Clark',
    position: 'Manager',
    user: 'sophiaclark',
    password: 'sigma789',
    email: 'sophiaclark@example.com',
    phone: '444-555-6666',
    clientId: '12'
  },
  {
    name: 'Omega Tech',
    operator: 'Matthew Davis',
    position: 'Director',
    user: 'matthewdavis',
    password: 'omega456',
    email: 'matthewdavis@example.com',
    phone: '777-888-9999',
    clientId: '13'
  },
  {
    name: 'Nu Enterprises',
    operator: 'Ava Johnson',
    position: 'Supervisor',
    user: 'avajohnson',
    password: 'nu123',
    email: 'avajohnson@example.com',
    phone: '222-333-4444',
    clientId: '14'
  },
  {
    name: 'Zeta Corp.',
    operator: 'James Wilson',
    position: 'Analyst',
    user: 'jameswilson',
    password: 'zeta456',
    email: 'jameswilson@example.com',
    phone: '555-666-7777',
    clientId: '15'
  },
  {
    name: 'Epsilon Ltd.',
    operator: 'Chloe Taylor',
    position: 'Engineer',
    user: 'chloetaylor',
    password: 'epsilon789',
    email: 'chloetaylor@example.com',
    phone: '888-999-0000',
    clientId: '16'
  },
  {
    name: 'Iota Systems',
    operator: 'Liam Smith',
    position: 'Developer',
    user: 'liamsmith',
    password: 'iota123',
    email: 'liamsmith@example.com',
    phone: '111-222-3333',
    clientId: '17'
  },
  {
    name: 'Kappa Solutions',
    operator: 'Emma Brown',
    position: 'Manager',
    user: 'emmabrown',
    password: 'kappa456',
    email: 'emmabrown@example.com',
    phone: '444-555-6666',
    clientId: '18'
  },
  {
    name: 'Theta Tech',
    operator: 'Noah Clark',
    position: 'Director',
    user: 'noahclark',
    password: 'theta789',
    email: 'noahclark@example.com',
    phone: '777-888-9999',
    clientId: '19'
  },
  {
    name: 'Lambda Enterprises',
    operator: 'Mia Johnson',
    position: 'Supervisor',
    user: 'miajohnson',
    password: 'lambda123',
    email: 'miajohnson@example.com',
    phone: '222-333-4444',
    clientId: '20'
  },
  {
    name: 'Rho Corp.',
    operator: 'Logan Wilson',
    position: 'Analyst',
    user: 'loganwilson',
    password: 'rho456',
    email: 'loganwilson@example.com',
    phone: '555-666-7777',
    clientId: '21'
  },
  {
    name: 'Tau Ltd.',
    operator: 'Amelia Taylor',
    position: 'Engineer',
    user: 'ameliataylor',
    password: 'tau789',
    email: 'ameliataylor@example.com',
    phone: '888-999-0000',
    clientId: '22'
  },
  {
    name: 'Upsilon Systems',
    operator: 'Ethan Brown',
    position: 'Developer',
    user: 'ethanbrown',
    password: 'upsilon123',
    email: 'ethanbrown@example.com',
    phone: '111-222-3333',
    clientId: '23'
  },
  {
    name: 'Phi Solutions',
    operator: 'Oliver Clark',
    position: 'Manager',
    user: 'oliverclark',
    password: 'phi456',
    email: 'oliverclark@example.com',
    phone: '444-555-6666',
    clientId: '24'
  },
  {
    name: 'Chi Tech',
    operator: 'Aria Johnson',
    position: 'Director',
    user: 'ariajohnson',
    password: 'chi789',
    email: 'ariajohnson@example.com',
    phone: '777-888-9999',
    clientId: '25'
  },
  {
    name: 'Psi Enterprises',
    operator: 'Elijah Wilson',
    position: 'Supervisor',
    user: 'elijahwilson',
    password: 'psi123',
    email: 'elijahwilson@example.com',
    phone: '222-333-4444',
    clientId: '26'
  },
  {
    name: 'Omega Corp.',
    operator: 'Avery Taylor',
    position: 'Analyst',
    user: 'averytaylor',
    password: 'omega456',
    email: 'averytaylor@example.com',
    phone: '555-666-7777',
    clientId: '27'
  },
  {
    name: 'Zeta Ltd.',
    operator: 'Scarlett Martinez',
    position: 'Engineer',
    user: 'scarlettmartinez',
    password: 'zeta789',
    email: 'scarlettmartinez@example.com',
    phone: '888-999-0000',
    clientId: '28'
  },
  {
    name: 'Epsilon Systems',
    operator: 'Benjamin Brown',
    position: 'Developer',
    user: 'benjaminbrown',
    password: 'epsilon123',
    email: 'benjaminbrown@example.com',
    phone: '111-222-3333',
    clientId: '29'
  },
  {
    name: 'Iota Solutions',
    operator: 'Grace Clark',
    position: 'Manager',
    user: 'graceclark',
    password: 'iota456',
    email: 'graceclark@example.com',
    phone: '444-555-6666',
    clientId: '30'
  }
]

const Step1 = ({ values, errors, handleChange }) => {
  const { client } = values

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='center'>
          <LooksOneTwoToneIcon color='primary' /> Seleccione el cliente *
        </Typography>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: '65vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box}>
            {clients.map(({ clientId, name }) => (
              <CustomListItemButton
                key={clientId}
                selected={client === clientId}
                onClick={() => handleChange('client', clientId)}
              >
                <ListItemText
                  primary={name} sx={{
                    '& .MuiListItemText-primary': {
                      color: (theme) => theme.palette.grey[400]
                    }
                  }}
                />
              </CustomListItemButton>
            ))}
          </List>
        </PerfectScrollbar>
      </Box>
    </MainMirrorCard>
  )
}

Step1.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
}

export default Step1
