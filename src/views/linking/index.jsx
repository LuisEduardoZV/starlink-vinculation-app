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

import { requiredText } from '../../utils/labelsErrorsFormik'

const Linking = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [view, setView] = useState(1)
  const [viewType, setViewType] = useState(false)

  const initVal = useMemo(() => ({
    assignId: 0,
    client: user?.user?.isPowerUser ? null : user?.user?.clientId,
    terminals: [],
    userVinculationInfo: [],
    submit: null
  }), [user])

  const handleContinue = () => setView((prev) => prev + 1)

  useEffect(() => {
    if (user && user.user && user.user.isPowerUser) setViewType(true)
  }, [user])

  return (
    <Box>
      <Formik
        initialValues={initVal}
        validationSchema={Yup.object().shape({
          client: Yup.string().required(requiredText),
          terminals: Yup.array().min(1, 'Debe seleccionar por lo menos una terminal').required(requiredText)
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          delete values.submit

          const toastId = toast.loading('Vinculando...')
          try {
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

            console.log(usersInfo)

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
              toast.success('Se han vinculado correctamente', { id: toastId })
              setStatus({ success: true })
              setSubmitting(false)
              navigate('/terminalsAssigned', { replace: true, state: { view: 4 } })
            }
          } catch (error) {
            toast.error(error.message, { id: toastId })
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue, handleBlur }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', px: '4%', gap: 5, height: '100%', width: '100%', justifyContent: 'center' }}>
              <FirstContainer
                values={values}
                inView={view}
                handleChange={setFieldValue}
                handleContinue={handleContinue}
                viewType={viewType}
              />
              <SecondContainer
                inView={view}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                viewType={viewType}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Linking
