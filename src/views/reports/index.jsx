/* eslint-disable new-cap */
import { useEffect, useState } from 'react'

// third imports
import dayjs from 'dayjs'

// mui imports
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone'
import { Autocomplete, Box, Button, Collapse, Divider, IconButton, TextField, Typography, createFilterOptions } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { BarChart, axisClasses, barElementClasses } from '@mui/x-charts'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// project imports
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone'
import { BASE_URL_API } from '../../config'
import { apiCall } from '../../contexts/api'
import useAuth from '../../hooks/useAuth'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import LoadingInfo from '../../ui-components/LoadingInfo'
import MainMirrorCard from '../../ui-components/MainMirrorCard'
import NoInfoOverlay from '../../ui-components/NoInfoOverlay'

// services
import { useDispatch, useSelector } from '../../store'
import { getAllClients } from '../../store/slices/clients'
import { getAllTerminals, getTerminalsByClient } from '../../store/slices/terminals'

Chart.register(CategoryScale, LinearScale, BarElement)

const Reportes = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const dispatch = useDispatch()

  const { list: clients } = useSelector((state) => state.clients)
  const { terminals, loading } = useSelector((state) => state.terminals)

  const [typeReport, setTypeReport] = useState(0)
  const [terminalSelected, setTerminalSelected] = useState(null)
  const [clientSelected, setClientSelected] = useState(null)

  const [firstDate, setFirstDate] = useState(dayjs(new Date()))
  const [secondDate, setSecondDate] = useState(dayjs(new Date()))

  const [data, setData] = useState(null)

  const handleSetTypeReport = (id) => () => {
    setTypeReport(id)
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => (option.terminalKitNumber + option.terminalLineOfService)
  })

  const filterOptionsClients = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => (option.clienName + option.clientEmail)
  })

  const div2PDF = async (e) => {
    const but = e.target
    but.style.display = 'none'
    const input = window.document.getElementsByClassName('div2PDF')[0]
    input.style.backgroundColor = 'transparent'

    let clientName = 'Terminal no vinculada a ningún cliente'
    const res = await apiCall({ url: `${BASE_URL_API}/getAsigment` })
    if (res) {
      res.forEach((op) => {
        if (op.fullName && op.terminalId) {
          if (Number(terminalSelected.terminalId) === Number(op.terminalId)) clientName = op.fullName
        }
      })
    }

    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL('image/png')
      const pdf = new jsPDF('l', 'pt')
      pdf.setFontSize(25)
      pdf.text(`Consumo de datos de la terminal: ${terminalSelected?.terminalKitNumber}`, 20, 30)
      pdf.setFontSize(15)
      pdf.text(`Fecha: ${firstDate.format('DD/MM/YYYY')} - ${secondDate.format('DD/MM/YYYY')}`, 20, 55)
      pdf.text(`Cliente: ${clientName}`, 420, 55)
      pdf.text(`Nombre del sitio: ${terminalSelected?.terminalSiteName}`, 20, 80)
      pdf.text(`Línea de servicio: ${terminalSelected?.terminalLineOfService}`, 20, 105)
      pdf.addImage(
        img,
        'png',
        15,
        110,
        842,
        500
      )
      pdf.save(`ConsumoDatos_${terminalSelected?.terminalKitNumber}.pdf`)
      but.style.display = 'block'
    })
  }

  const requestData = async () => {
    try {
      const res = await apiCall({ url: `${BASE_URL_API}/getGrafic?terminal=${terminalSelected?.terminalLineOfService}&fecha1=${dayjs(firstDate).format('YYYY-MM-DD')}&fecha2=${dayjs(secondDate).format('YYYY-MM-DD')}` })
      const labels = []
      const data = []
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        labels.push(item.substring(item.indexOf(':') + 1, item.indexOf(',')))
        data.push(Number(item.substring(item.lastIndexOf(':') + 1, item.indexOf('}'))))
      }
      setData({ labels, data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      dispatch(getAllClients())
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (async () => {
      if ((clientSelected && clientSelected.clientId) || (user && user.user && !(user.user.isPowerUser))) {
        const id = !(user.user.isPowerUser) ? user.user.clientId : clientSelected.clientId
        dispatch(getTerminalsByClient(id))
        setTerminalSelected(null)
      } else dispatch(getAllTerminals())
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSelected, user])

  return (
    <Box width='100%' px={8} display='flex' maxHeight='100vh' height='75vh' position='relative' gap={7}>
      <MainMirrorCard sx={{ height: '100%', maxWidth: '15%' }}>
        <Box display='flex' flexWrap='wrap' gap={2} width='100%'>
          <Typography variant='h4' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white }}>Tipos de Reportes</Typography>
          <Divider sx={{ width: '100%', borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700] }} />
          <Box display='flex' flexDirection='column' width='100%'>
            <Box
              display='flex' gap={1} alignItems='center' p={1} sx={{
                cursor: 'pointer'
              }}
              onClick={handleSetTypeReport(1)}
            >
              <LeaderboardTwoToneIcon color='primary' />
              <Typography
                variant='body1'
                sx={{
                  color: (theme) => typeReport === 1 ? theme.palette.primary.dark : theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.common.white,
                  transition: 'color 0.2s ease-in-out',
                  fontWeight: typeReport === 1 && 800
                }}
              >Consumo de Datos
              </Typography>
            </Box>
          </Box>
        </Box>
      </MainMirrorCard>
      <MainMirrorCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading
          ? <LoadingInfo />
          : (
            <>
              <Box width='100%' display='flex' justifyContent='space-between' alignItems='center' gap={2} position='relative'>
                <Autocomplete
                  disablePortal
                  filterOptions={filterOptionsClients}
                  size='small'
                  id='auto-combo-users'
                  options={clients}
                  value={clientSelected}
                  onChange={(e, nue) => setClientSelected(nue)}
                  getOptionLabel={(option) => option.clientName}
                  isOptionEqualToValue={(a, b) => (a.clientId === b.clientId)}
                  renderOption={(props, option) => (
                    <Box key={option.clientId} component='li' sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }} {...props}>
                      <Typography variant='body2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.800' : 'grey.400' }}>{option.clientName}</Typography>
                      <Typography variant='subtitle2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'primary.dark' : 'grey.700' }}>{option.clientEmail}</Typography>
                    </Box>
                  )}
                  renderInput={(params) => <TextField
                    {...params}
                    label='Seleccione un cliente'
                    sx={{
                      '& .MuiButtonBase-root': {
                        color: (theme) => theme.palette.primary.main
                      },
                      '& .MuiChip-root': {
                        color: 'black',
                        bgcolor: (theme) => theme.palette.primary.main
                      },
                      '& .MuiChip-root.Mui-disabled': {
                        color: 'black',
                        bgcolor: (theme) => theme.palette.primary[800]
                      },
                      '& .MuiButtonBase-root.Mui-disabled': {
                        color: (theme) => theme.palette.primary[800]
                      },
                      '.Mui-disabled': {
                        bgcolor: (theme) => alpha(theme.palette.grey[600], 1)
                      }
                    }}
                                           />}
                  sx={{
                    width: '25%',
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                    color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                    '.Mui-disabled': {
                      bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                      color: (theme) => theme.palette.grey[700]
                    },
                    '& .MuiInputBase-input, & .MuiInputBase-root': {
                      bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                      color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                    }
                  }}
                />
                <Autocomplete
                  disablePortal
                  filterOptions={filterOptions}
                  size='small'
                  id='auto-combo-users'
                  options={terminals}
                  value={terminalSelected}
                  onChange={(e, nue) => setTerminalSelected(nue)}
                  getOptionLabel={(option) => option.terminalKitNumber}
                  isOptionEqualToValue={(a, b) => (a.terminalId === b.terminalId)}
                  renderOption={(props, option) => (
                    <Box key={option.terminalLineOfService} component='li' sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }} {...props}>
                      <Typography variant='body2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.800' : 'grey.400' }}>{option.terminalKitNumber}</Typography>
                      <Typography variant='subtitle2' textAlign='start' width='100%' sx={{ color: (theme) => theme.palette.mode === 'light' ? 'primary.dark' : 'grey.700' }}>{option.terminalLineOfService}</Typography>
                    </Box>
                  )}
                  renderInput={(params) => <TextField
                    {...params}
                    label='Seleccione una terminal'
                    sx={{
                      '& .MuiButtonBase-root': {
                        color: (theme) => theme.palette.primary.main
                      },
                      '& .MuiChip-root': {
                        color: 'black',
                        bgcolor: (theme) => theme.palette.primary.main
                      },
                      '& .MuiChip-root.Mui-disabled': {
                        color: 'black',
                        bgcolor: (theme) => theme.palette.primary[800]
                      },
                      '& .MuiButtonBase-root.Mui-disabled': {
                        color: (theme) => theme.palette.primary[800]
                      },
                      '.Mui-disabled': {
                        bgcolor: (theme) => alpha(theme.palette.grey[600], 1)
                      }
                    }}
                                           />}
                  sx={{
                    width: '25%',
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                    color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                    '.Mui-disabled': {
                      bgcolor: (theme) => alpha(theme.palette.grey[600], 1),
                      color: (theme) => theme.palette.grey[700]
                    },
                    '& .MuiInputBase-input, & .MuiInputBase-root': {
                      bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
                      color: (theme) => theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                    }
                  }}
                />


                <Box display='flex' flex={1} justifyContent='flex-end' alignSelf='end' gap={2} width='50%'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Fecha de inicio'
                      value={firstDate}
                      onChange={(newValue) => {
                        setFirstDate(newValue)
                      }}
                      disableFuture
                      sx={{
                        '& .MuiInputLabel-root': { color: (theme) => theme.palette.primary.main },
                        '& .MuiTextField-root': { bgcolor: 'transparent' },
                        '& .MuiOutlinedInput-root': { bgcolor: 'transparent' },
                        '& .MuiOutlinedInput-input': { bgcolor: 'transparent' }
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Fecha de termino'
                      value={secondDate}
                      onChange={(newValue) => setSecondDate(newValue)}
                      disableFuture
                      minDate={firstDate}
                      sx={{
                        '& .MuiInputLabel-root': { color: (theme) => theme.palette.primary.main },
                        '& .MuiTextField-root': { bgcolor: 'transparent' },
                        '& .MuiOutlinedInput-root': { bgcolor: 'transparent' },
                        '& .MuiOutlinedInput-input': { bgcolor: 'transparent' }
                      }}
                    />
                  </LocalizationProvider>
                  <Button
                    variant='outlined' sx={{ alignSelf: 'center' }} onClick={requestData}
                  >Generar
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ width: '100%', borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700] }} />
              <Collapse in={!!data} sx={{ mt: 1 }}>
                <Box
                  width='100%'
                  display='flex'
                  flexDirection='column'
                  alignItems='end'
                >
                  {(data && (data.labels.length === 0 || data.data.length === 0)) && (
                    <NoInfoOverlay />
                  )}
                  {(data && (data.labels.length !== 0 || data.data.length !== 0)) && (
                    <>
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Box maxWidth='50%'>
                          <Typography variant='h2' alignSelf='start'>Consumo de datos de la terminal: {terminalSelected?.terminalKitNumber}</Typography>
                        </Box>
                        <Box display='flex'>
                          <CustomTooltipBtns type='primary' title='Exportar a PDF'>
                            <IconButton size='small' type='submit' onClick={div2PDF}>
                              <TableChartTwoToneIcon color='primary' />
                            </IconButton>
                          </CustomTooltipBtns>
                        </Box>
                      </Box>
                      <Box width='98%' display='flex' justifyContent='flex-end' justifySelf='self-end' className='div2PDF'>
                        <BarChart
                          xAxis={[{ scaleType: 'band', data: data.labels }]}
                          series={[{ data: data.data, valueFormatter: (value) => `${value} GB` }]}
                          height={350}
                          yAxis={[{ label: 'Datos consumidos (GB)' }]}
                          sx={{
                            [`.${axisClasses.left} .${axisClasses.label}`]: {
                              transform: 'translate(-10px, 0)',
                              zIndex: 1
                            },
                            [`.${barElementClasses.root}`]: {
                              fill: theme.palette.primary.dark,
                              stroke: theme.palette.primary.dark,
                              strokeWidth: 1,
                              fillOpacity: 0.4
                            },
                            justifySelf: 'flex-end'
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Collapse>
            </>
            )}
      </MainMirrorCard>
    </Box>
  )
}

export default Reportes
