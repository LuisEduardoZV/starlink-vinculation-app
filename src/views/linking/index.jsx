import { useState } from 'react'
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
import FirstContainer from './FirstContainer'
import SecondContainer from './SecondContainer'

import { requiredText } from '../../utils/labelsErrorsFormik'

const Linking = () => {
  const navigate = useNavigate()

  const [view, setView] = useState(1)

  const handleContinue = () => setView((prev) => prev + 1)

  return (
    <Box>
      <Formik
        initialValues={{
          assignId: 0,
          client: null,
          terminals: [],
          userVinculationInfo: [],
          submit: null
        }}
        validationSchema={Yup.object().shape({
          client: Yup.string().required(requiredText),
          terminals: Yup.array().min(1, 'Debe seleccionar por lo menos una terminal').required(requiredText)
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          delete values.submit
          console.log(values)

          const toastId = toast.loading('Vinculando...')
          try {
            const usersInfo = []
            for (let i = 0; i < values.userVinculationInfo.length; i++) {
              const user = values.userVinculationInfo[i]
              if (user.userId) {
                usersInfo.push({ terminals: user.terminals, dashboards: user.dashboards, userId: user.userId.userId })
              } else {
                user.userId = 0
                const newUserInfo = { terminals: user.terminals, dashboards: user.dashboards, userId: null }
                const newUser = await apiCallWithBody({ url: `${BASE_URL_API}/Users`, method: 'POST', body: JSON.stringify(user) })
                if (!newUser) throw new Error('Hubo un error al crear el nuveo usuario')
                newUserInfo.userId = newUser.userId
                usersInfo.push(newUserInfo)
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

            console.log(globalData)

            const response = await apiCallWithBody({ url: `${BASE_URL_API}/AssignsALL`, method: 'POST', body: JSON.stringify(globalData) })
            console.log(response)

            if (response === 'Insert') {
              toast.success('Se han vinculado correctamente', { id: toastId })
              setStatus({ success: true })
              setSubmitting(false)
              navigate('/terminals', { replace: true, state: { view: 2 } })
            }
          } catch (error) {
            toast.error(error.message, { id: toastId })
          }

          //
          /*
          try {
            // if (!values.dashboardId) throw new Error('Debe seleccionar un Dashboard')
            // if (!values.userId && values.user?.trim() === '' && values.password?.trim() === '') throw new Error('Debe seleccionar un usuario disponible o crear uno nuevo, si así se desea')
            // if (!values.userId && (values.user?.trim() === '' || values.password?.trim() === '')) throw new Error('Para crear un nuevo usuario debe proporcionar toda la información solicitada')
            const data = {
              userId: 0,
              clientId: values.client,
              fullName: `NewUser-Terminal-${values.terminals?.toString()}`,
              email: values.user,
              password: values.password,
              isEnabled: 1,
              isAdmin: 0
            }
            const newUser = await apiCallWithBody({ url: `${BASE_URL_API}/Users`, method: 'POST', body: JSON.stringify(data) })
            if (!newUser) throw new Error('Hubo un error al crear el nuveo usuario')

            delete values.user
            delete values.password
            // delete values.client
            values.dashboardId = values.dashboardId.dashboardId
            values.userId = newUser.userId

            values.terminals.forEach(async (id) => {
              const data = { ...values, terminalId: id }
              delete data.terminals
              const res = await apiCallWithBody({ url: `${BASE_URL_API}/Assigns`, method: 'POST', body: JSON.stringify(data) })
              if (!res) throw new Error(`Error al vincularse con la terminal ${id}`)
            })

            toast.success('Se han vinculado conrrectamente', { id: toastId })
            setStatus({ success: true })
            setSubmitting(false)
            navigate('/terminals', { replace: true, state: { view: 2 } })
          } catch (error) {
            toast.error(error.message, { id: toastId })
          }
          */
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue, handleBlur }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', px: '4%', gap: 5, height: '100%', width: '100%' }}>
              <FirstContainer
                values={values}
                inView={view}
                handleChange={setFieldValue}
                handleContinue={handleContinue}
              />
              <SecondContainer
                inView={view}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Linking
