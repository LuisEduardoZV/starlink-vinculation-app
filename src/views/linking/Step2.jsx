import PropTypes from 'prop-types'

// mui imports
import LooksTwoTwoToneIcon from '@mui/icons-material/LooksTwoTwoTone'
import { Box, List, ListItemText, Typography } from '@mui/material'

// third
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import { CustomListItemButtonInfo as CustomListItemButton } from '../../ui-components/CustomListItemButton'
import MainMirrorCard from '../../ui-components/MainMirrorCard'

import 'react-perfect-scrollbar/dist/css/styles.css'

const mainData = [
  {
    numKit: 'ABCD12345678',
    numAnt: 'EFGH12345678901234',
    serviceLine: 'IJKL12345-MNOPQ67890',
    domain: 'example.com',
    terId: 1,
    friendlyName: 'Antenna 1'
  },
  {
    numKit: 'WXYZ98765432',
    numAnt: 'UVWXYZ123456789012',
    serviceLine: 'RSTUV56789-WXYZA12345',
    domain: 'example.net',
    terId: 2,
    friendlyName: 'Antenna 2'
  },
  {
    numKit: '1234ABCD5678',
    numAnt: 'EFGH56789012345678',
    serviceLine: 'IJKL90123-MNOPQ45678',
    domain: 'example.org',
    terId: 3,
    friendlyName: 'Antenna 3'
  },
  {
    numKit: 'CDEF56781234',
    numAnt: 'GHIJ90123456789012',
    serviceLine: 'KLMN34567-OPQ12R56789',
    domain: 'example.co',
    terId: 4,
    friendlyName: 'Antenna 4'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL34567890123456',
    serviceLine: 'MNOP67890-Q123R45678',
    domain: 'example.io',
    terId: 5,
    friendlyName: 'Antenna 5'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.info',
    terId: 6,
    friendlyName: 'Antenna 6'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.biz',
    terId: 7,
    friendlyName: 'Antenna 7'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.us',
    terId: 8,
    friendlyName: 'Antenna 8'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.co.uk',
    terId: 9,
    friendlyName: 'Antenna 9'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.ca',
    terId: 10,
    friendlyName: 'Antenna 10'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.de',
    terId: 11,
    friendlyName: 'Antenna 11'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.fr',
    terId: 12,
    friendlyName: 'Antenna 12'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.it',
    terId: 13,
    friendlyName: 'Antenna 13'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.es',
    terId: 14,
    friendlyName: 'Antenna 14'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.pt',
    terId: 15,
    friendlyName: 'Antenna 15'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.au',
    terId: 16,
    friendlyName: 'Antenna 16'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.jp',
    terId: 17,
    friendlyName: 'Antenna 17'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.kr',
    terId: 18,
    friendlyName: 'Antenna 18'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.ru',
    terId: 19,
    friendlyName: 'Antenna 19'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.cn',
    terId: 20,
    friendlyName: 'Antenna 20'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.br',
    terId: 21,
    friendlyName: 'Antenna 21'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.mx',
    terId: 22,
    friendlyName: 'Antenna 22'
  },
  {
    numKit: '1234IJKL5678',
    numAnt: 'MNOP90123456789012',
    serviceLine: 'QRST23456-UVWXY78901',
    domain: 'example.ar',
    terId: 23,
    friendlyName: 'Antenna 23'
  },
  {
    numKit: 'KLMN56781234',
    numAnt: 'UVWX34567890123456',
    serviceLine: 'YZAB78901-CD12345678',
    domain: 'example.in',
    terId: 24,
    friendlyName: 'Antenna 24'
  },
  {
    numKit: '5678OPQR1234',
    numAnt: 'YZAB56789012345678',
    serviceLine: 'CDEF90123-UVWXY45678',
    domain: 'example.za',
    terId: 25,
    friendlyName: 'Antenna 25'
  },
  {
    numKit: 'STUV90123456',
    numAnt: 'CDEF90123456789012',
    serviceLine: 'GHIJ23456-KLMNO78901',
    domain: 'example.sa',
    terId: 26,
    friendlyName: 'Antenna 26'
  },
  {
    numKit: '1234WXYZ5678',
    numAnt: 'GHIJ56789012345678',
    serviceLine: 'KLMN90123-UVWXY23456',
    domain: 'example.id',
    terId: 27,
    friendlyName: 'Antenna 27'
  },
  {
    numKit: 'YZAB56781234',
    numAnt: 'KLMN56789012345678',
    serviceLine: 'OPQR23456-UVWXY78901',
    domain: 'example.ng',
    terId: 28,
    friendlyName: 'Antenna 28'
  },
  {
    numKit: '5678CDEF1234',
    numAnt: 'IJKL90123456789012',
    serviceLine: 'MNOP34567-Q123R56789',
    domain: 'example.pl',
    terId: 29,
    friendlyName: 'Antenna 29'
  },
  {
    numKit: 'EFGH90123456',
    numAnt: 'QRST56789012345678',
    serviceLine: 'UVWX90123-ABCDE67890',
    domain: 'example.tr',
    terId: 30,
    friendlyName: 'Antenna 30'
  }
]

const Step2 = ({ values, errors, active, handleChange }) => {
  const { terminals } = values

  const handleClick = (event, id) => {
    const selectedIndex = terminals.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(terminals, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(terminals.slice(1))
    } else if (selectedIndex === terminals.length - 1) {
      newSelected = newSelected.concat(terminals.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        terminals.slice(0, selectedIndex),
        terminals.slice(selectedIndex + 1)
      )
    }
    handleChange('terminals', newSelected)
  }

  const isSelected = (id) => terminals.indexOf(id) !== -1

  return (
    <MainMirrorCard sx={{
      maxHeight: '75vh',
      height: '100%',
      position: 'relative'
    }}
    >
      <Box display='flex' flexDirection='column' rowGap={3} position='relative'>
        <Typography component='div' variant='h2' color='white' display='flex' gap={1} alignItems='flex-start'>
          <LooksTwoTwoToneIcon color='info' /> Seleccione 1 o más terminales a vincular *
        </Typography>
        <PerfectScrollbar style={{ height: 'fit-content', maxHeight: '60vh', paddingLeft: 10, paddingRight: 15 }}>
          <List component={Box}>
            {mainData.map(({ terId, friendlyName, numAnt, domain }) => {
              const isItemSelected = isSelected(terId)

              return (
                <CustomListItemButton
                  key={terId}
                  selected={isItemSelected}
                  onClick={(e) => handleClick(e, terId)}
                >
                  <ListItemText
                    primary={`${friendlyName} (${numAnt})`} secondary={domain} color='info' sx={{
                      '& .MuiTypography-root': {
                        color: (theme) => theme.palette.grey[400]
                      },
                      '& .MuiListItemText-secondary': {
                        color: (theme) => theme.palette.grey[700]
                      }
                    }}
                  />
                </CustomListItemButton>
              )
            })}
          </List>
        </PerfectScrollbar>
      </Box>
      <Box sx={{
        transition: 'opacity 0.15s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: (theme) => theme.palette.background.paper,
        opacity: active ? 0 : 0.8,
        zIndex: active ? -1 : 1
      }}
      />
    </MainMirrorCard>
  )
}

Step2.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  active: PropTypes.bool,
  handleChange: PropTypes.func
}

export default Step2
