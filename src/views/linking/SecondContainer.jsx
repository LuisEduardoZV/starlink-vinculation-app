import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

// mui imports
import Looks3TwoToneIcon from '@mui/icons-material/Looks3TwoTone'
import { Box, Slide, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import MainMirrorFade from '../../ui-components/MainMirrorFade'
import TransferList from '../../ui-components/TransferList'
import CustomTabPanel from '../../ui-components/extended/CustomTabPanel'
import DashUserSelection from './Step2/DashUserSelection'

import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

async function not (a, b) {
  return await a.filter(({ userId }) => b.userId !== userId)
}

const defaultUserInfo = {
  userId: null,
  fullName: 'NewUser-Terminal-',
  email: '',
  password: '',
  isEnabled: 1,
  isAdmin: 0,
  terminals: null,
  dashboards: []
}

const SecondContainer = ({ inView, values, errors, touched, handleBlur, handleChange }) => {
  const theme = useTheme()
  const { terminals, userVinculationInfo, client } = values

  const [viewTab, setViewTab] = useState(0)
  const [userInfo, setUserInfo] = useState(defaultUserInfo)

  const [users, setUsers] = useState([])
  const [dash, setDash] = useState([])

  const setTerminalsUser = (ter) => {
    setUserInfo({ ...userInfo, terminals: ter })
  }

  const handleChangeAutocompleteInfo = async (name, value) => {
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleChangeTab = (event, newValue) => {
    if (newValue === userVinculationInfo.length) {
      setUserInfo(defaultUserInfo)
    } else setUserInfo(userVinculationInfo[newValue])
    setViewTab(newValue)
  }

  const handleAddUser = async () => {
    if (userInfo.userId) setUsers(await not(users, userInfo.userId))
    handleChange('userVinculationInfo', [...userVinculationInfo, { ...userInfo, clientId: values.client }])
    handleChangeTab('', userVinculationInfo.length)
  }

  const handleDeleteUser = () => {
    let newUsersInfo = []

    const userId = userVinculationInfo[viewTab].userId ?? null

    if (viewTab === 0) {
      newUsersInfo = newUsersInfo.concat(userVinculationInfo.slice(1))
    } else if (viewTab === userVinculationInfo.length - 1) {
      newUsersInfo = newUsersInfo.concat(userVinculationInfo.slice(0, -1))
    } else if (viewTab > 0) {
      newUsersInfo = newUsersInfo.concat(
        userVinculationInfo.slice(0, viewTab),
        userVinculationInfo.slice(viewTab + 1)
      )
    }
    if (userId) setUsers((prev) => prev.concat(userId))
    handleChange('userVinculationInfo', newUsersInfo)
    setUserInfo(defaultUserInfo)
  }

  const matchDown2Xl = useMediaQuery(theme.breakpoints.down('2xl'))

  const terminalsAsigned = useMemo(() => {
    if (viewTab === userVinculationInfo.length) {
      return []
    } else {
      return userVinculationInfo[viewTab].terminals
    }
  }, [userVinculationInfo, viewTab])

  useEffect(() => {
    (async () => {
      try {
        if (client) {
          const res = await apiCall({ url: `${BASE_URL_API}/getClientUser?id=${client}` })
          setUsers(res)

          const resDash = await apiCall({ url: `${BASE_URL_API}/Dashboards` })
          setDash(resDash)
        }
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      setUsers([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <MainMirrorFade
      componentTransition={Slide}
      easing={{
        enter: 'cubic-bezier(0.99, -0.08, 1, 0.99)',
        exit: 'linear'
      }}
      timeout={{ enter: 400, exit: 200 }}
      direction='up'
      in={inView === 2}
      sx={{
        maxHeight: matchDown2Xl ? '75vh' : '85vh',
        minHeight: matchDown2Xl ? '75vh' : '85vh',
        height: '100%',
        position: 'relative',
        maxWidth: '100%',
        minWidth: '100%',
        width: 'max-content'
      }}
    >
      <Box display='flex' flexDirection='row' columnGap={3} position='relative'>
        <Box display='flex' flexDirection='column' width='65%'>
          <Typography component='div' variant='h2' color={theme.palette.mode === 'light' ? 'black' : 'white'} display='flex' gap={1} alignItems='flex-start'>
            <Looks3TwoToneIcon color='info' /> Vinculación de usuarios con las terminales
          </Typography>
          <TransferList terminals={terminals} termSelected={terminalsAsigned} setNewTerms={setTerminalsUser} disabled={terminalsAsigned.length > 0} />
        </Box>

        <Box width='35%' display='flex' flexDirection='column'>
          <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'light' ? 'grey.800' : 'grey.400' }}>Selección o creación de usuarios</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '100%' }}>
            <Tabs
              value={viewTab}
              onChange={handleChangeTab}
              variant='scrollable'
              scrollButtons='auto'
              sx={{
                minHeight: '40px',
                display: 'flex',
                width: 'auto',
                '& .MuiTab-root.Mui-selected': { color: theme.palette.mode === 'light' ? 'grey.700' : 'grey.500', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' },
                '& .MuiTab-root': { py: 0, minHeight: '40px', pt: 0.5 },
                '& .MuiTabs-flexContainer': { borderColor: (theme) => theme.palette.grey[800] }
              }}
              TabIndicatorProps={{ style: { maxHeight: '2px' } }}
            >
              {userVinculationInfo && userVinculationInfo.map((op, index) => (<Tab key={index} label={`Usuario ${index + 1}`} {...a11yProps(index)} />))}
              <Tab label='Nuevo Usuario' {...a11yProps(userVinculationInfo.length)} />
            </Tabs>
          </Box>
          {userVinculationInfo && userVinculationInfo.map((op, index) => (
            <CustomTabPanel key={index} value={viewTab} index={index}>
              <DashUserSelection
                client={values.client}
                values={op}
                errors={errors}
                touched={touched}
                users={users}
                dash={dash}
                handleChange={handleChangeUserInfo}
                handleChangeAutocompleteInfo={handleChangeAutocompleteInfo}
                handleBlur={handleBlur}
                cancelBtn
                handleDeleteUser={handleDeleteUser}
                {...(index === userVinculationInfo.length - 1) && { finishBtn: true }}
              />
            </CustomTabPanel>
          ))}
          <CustomTabPanel value={viewTab} index={userVinculationInfo.length}>
            <DashUserSelection
              client={values.client}
              values={userInfo}
              errors={errors}
              touched={touched}
              users={users}
              dash={dash}
              handleChange={handleChangeUserInfo}
              handleChangeAutocompleteInfo={handleChangeAutocompleteInfo}
              handleBlur={handleBlur}
              handleAddUser={handleAddUser}
            />
          </CustomTabPanel>
        </Box>
      </Box>
    </MainMirrorFade>
  )
}

SecondContainer.propTypes = {
  inView: PropTypes.number,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
}

export default SecondContainer
/**
 {
    "userId": 19,
    "fullName": "vbnbvnvbn dfgfdg",
    "email": "vbnvbn@bvnbvn-com",
    "password": "fghfghfghfgh",
    "isEnabled": 1,
    "isAdmin": 0,
    "terminals": [
        {
            "terminalId": 1,
            "terminalSiteName": "La Angostura Nueva"
        }
    ],
    "dashboards": [],
    "clientId": 5
}
 */
