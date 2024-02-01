import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// mui imports
import { Box } from '@mui/material'

// third
import { Formik } from 'formik'
import { toast } from 'sonner'
import * as Yup from 'yup'

// project imports
import { BASE_URL_API } from '../../config'
import { apiCallWithBody } from '../../contexts/api'
import useAuth from '../../hooks/useAuth'
import FirstContainer from './FirstContainer'
import SecondContainer from './SecondContainer'

import { MSG_SUCCESS_LINK_CLIENTTERMINAL } from '../../utils/constants'
import { requiredText } from '../../utils/labelsErrorsFormik'

const Linking = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [view, setView] = useState(1)
  const [viewType, setViewType] = useState(null)

  const initVal = useMemo(() => ({
    assignId: 0,
    client: user?.user?.isPowerUser ? null : user?.user?.clientId,
    terminals: [],
    userVinculationInfo: [],
    clientName: '',
    submit: null
  }), [user])

  function finishRedirect (name, client, toTerminals) {
    if (toTerminals) {
      navigate('/terminals', {
        replace: true,
        state: {
          view: user?.user?.isPowerUser ? 1 : 2, client: name, viewByClient: client
        }
      })
    } else navigate('/terminalsAssigned', { replace: true, state: { view: user?.user?.isPowerUser ? 3 : 2, clientId: client } })
  }

  const handleContinue = () => setView((prev) => prev + 1)

  const handleCancel = () => setView((prev) => prev - 1)

  const handleLinkWithClient = async (client, terminals, clientName) => {
    const toastId = toast.loading('Vinculando...')
    try {
      const newTerminals = terminals.map(({ terminalId }) => ({
        terminalId,
        clientId: client,
        clientTerminal_Id: 0
      }))
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/Client_TerminalAll`, body: JSON.stringify(newTerminals) })

      if (res === MSG_SUCCESS_LINK_CLIENTTERMINAL) {
        toast.success('Se ha vinculado correctamente las terminales con el cliente', { id: toastId })
        finishRedirect(clientName, client, 1)
      } else throw new Error()
    } catch (error) {
      console.log(error)
      toast.error('Error al vincular las terminales con el cliente', { id: toastId })
    }
  }

  const handleUnlinkWithClient = async (id) => {
    const toastId = toast.loading('Desvinculando...')
    try {
      const res = await apiCallWithBody({ url: `${BASE_URL_API}/ClientTerminals/${id}`, method: 'DELETE' })
      if (res && Array.isArray(res)) {
        toast.success('Se ha desvinculado correctamente', { id: toastId })
        return true
      } else throw new Error('Error al desvincular la terminal con el cliente')
    } catch (error) {
      console.log(error)
      toast.error(error.message, { id: toastId })
    }
  }

  const validationSchema = useMemo(() => {
    if (user && user.user && user.user.isPowerUser) {
      return Yup.object().shape({
        client: Yup.string().required(requiredText),
        terminals: Yup.array().min(1, 'Debe seleccionar por lo menos una terminal').required(requiredText)
      })
    } else {
      return Yup.object().shape({
        client: Yup.string().required(requiredText),
        terminals: Yup.array()
      })
    }
  }, [user])

  useEffect(() => {
    if (user && user.user && user.user.isPowerUser) setViewType(true)
    else {
      setViewType(false)
      handleContinue()
    }
  }, [user])

  return (
    <Box position='relative' minHeight='max-content'>
      <Formik
        initialValues={initVal}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          delete values.submit

          const toastId = toast.loading('Vinculando...')
          try {
            if (values.terminals && values.terminals.length > 0) await handleLinkWithClient(values.client, values.terminals, values.clientName)

            const usersInfo = []
            for (let i = 0; i < values.userVinculationInfo.length; i++) {
              const user = values.userVinculationInfo[i]
              if (user.userId) {
                const userInfo = user.userId
                const userGrafana = await apiCallWithBody({
                  url: `${BASE_URL_API}/AltaUserGraf?type=1`,
                  body: JSON.stringify({
                    name: userInfo.fullName,
                    email: userInfo.email,
                    login: userInfo.email,
                    password: userInfo.password,
                    OrgId: 1
                  })
                })
                if (!userGrafana) throw new Error('Hubo un error al crear el usuario en Grafana para el usuario existente, contacte con el administrador')
                usersInfo.push({ terminals: user.terminals, dashboards: user.dashboards, userId: user.userId.userId })
              } else {
                user.userId = 0
                const newUserInfo = { terminals: user.terminals, dashboards: user.dashboards, userId: null }
                const newUser = await apiCallWithBody({ url: `${BASE_URL_API}/Users`, method: 'POST', body: JSON.stringify({ ...user, fullname: user.fullName, isAdmin: user.isAdmin ? 1 : 0 }) })
                console.log(newUser)
                if (!newUser) throw new Error('Hubo un error al crear el nuveo usuario en Tan-Graph')
                const userGrafana = await apiCallWithBody({
                  url: `${BASE_URL_API}/AltaUserGraf?type=1`,
                  body: JSON.stringify({
                    name: user.fullName,
                    email: user.email,
                    login: user.email,
                    password: user.password,
                    OrgId: 1
                  })
                })
                if (!userGrafana) throw new Error('Hubo un error al crear el usuario en Grafana, contacte con el administrador')
                const newUserId = await newUser.find(({ email, userId }) => (user.email === email && userId))
                if (newUserId && newUserId.userId) {
                  newUserInfo.userId = newUserId.userId
                  usersInfo.push(newUserInfo)
                } else {
                  throw new Error('Error al crear el usuario')
                }
              }
            }

            // console.log(usersInfo)

            const globalData = []
            for (let i = 0; i < usersInfo.length; i++) {
              const data = usersInfo[i]
              for (let j = 0; j < data.terminals.length; j++) {
                for (let k = 0; k < data.dashboards.length; k++) {
                  const mainInfo = { assignId: 0, userId: data.userId, terminalId: data.terminals[j].terminalId, dashboardId: data.dashboards[k].dashboardId }
                  globalData.push(mainInfo)
                }
              }
            }

            const response = await apiCallWithBody({ url: `${BASE_URL_API}/AssignsALL`, method: 'POST', body: JSON.stringify(globalData) })

            if (response === 'Insert') {
              toast.success('Se han vinculado correctamente los usuarios', { id: toastId })
              setStatus({ success: true })
              setSubmitting(false)
              finishRedirect(values.clientName, values.client, 0)
            }
          } catch (error) {
            toast.error(error.message, { id: toastId })
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', px: '4%', gap: 5, height: '100%', width: '100%', justifyContent: 'center' }}>
              <FirstContainer
                values={values}
                inView={view}
                handleChange={setFieldValue}
                handleContinue={handleContinue}
                viewType={viewType}
                handleLinkWithClient={handleLinkWithClient}
                handleUnlinkWithClient={handleUnlinkWithClient}
              />
              <SecondContainer
                inView={view}
                values={values}
                handleChange={setFieldValue}
                viewType={viewType}
                handleCancel={handleCancel}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Linking
