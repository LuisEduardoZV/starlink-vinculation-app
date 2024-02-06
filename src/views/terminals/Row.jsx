/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// third imports
import { toast } from 'sonner'
import * as Yup from 'yup'

// mui imports
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'

// project imports
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'
import InputBase from '../../ui-components/InputBase'

const Row = ({ element, handleClick, isItemSelected, labelId, hasExtendedRow, hasMoreActions, RowTemplate, page, handleSave, viewType, handleOpen, isSuperUser }) => {
  const [rowExpanded, setRowExpanded] = useState(false)
  const [mode, setMode] = useState(0)

  const [newData, setNewData] = useState({ })

  const validInfo = async () => {
    try {
      await Yup.string().required('El nombre del sitio  es un campo requerido').validate(newData.terminalSiteName)
      await Yup.string().required('El nombre personalizado es un campo requerido').validate(newData.terminalFriendlyName)
      await Yup.number().required('La latitud es un campo requerido').typeError('La latitud debe ser un dato numérico').validate(newData.terminalLatitude)
      await Yup.number().required('La logitud es un campo requerido').typeError('La logitud debe ser un dato numérico').validate(newData.terminalLongitude)
      return true
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChangeMode = async () => {
    if (mode) {
      const valid = await validInfo()
      if (valid) {
        handleSave({
          ...newData,
          isMobile: newData.isMobile ? 1 : 0,
          terminalLatitude: Number(newData.terminalLatitude),
          terminalLongitude: Number(newData.terminalLongitude)
        })
        setMode(0)
      }
    } else {
      setMode(1)
    }
  }

  const handleChangeData = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value })
  }

  const handleChangeSwitch = (e, val) => {
    setNewData({ ...newData, isMobile: val ? 1 : 0 })
  }

  const Icon = mode === 0 ? DriveFileRenameOutlineTwoToneIcon : SaveTwoToneIcon

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  useEffect(() => {
    if (mode) setRowExpanded(true)
  }, [mode])

  useEffect(() => {
    setNewData({ ...element, isMobile: !!(element.isMobile === 1) })

    return () => setNewData({})
  }, [element])

  return (
    <>
      <TableRow hover aria-checked={isItemSelected} tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell component='th' colSpan={2} id={labelId} align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          {mode === 0
            ? element.terminalSiteName
            : (
              <InputBase
                name='terminalSiteName'
                value={newData.terminalSiteName}
                label='Nombre del sitio'
                variant='filled'
                size='small'
                fullWidth
                color='primary'
                required
                onChange={handleChangeData}
              />
              )}
        </TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          {mode === 0
            ? element.terminalFriendlyName ?? ''
            : (
              <InputBase
                name='terminalFriendlyName'
                value={newData.terminalFriendlyName}
                label='Nombre personalizado'
                variant='filled'
                size='small'
                fullWidth
                color='primary'
                required
                onChange={handleChangeData}
              />
              )}
        </TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalLineOfService}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalKitNumber}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalSerialNumber ?? '------------------------------'}</TableCell>
        {hasExtendedRow && (
          <TableCell>
            <Box sx={{ width: '100%', display: 'flex' }}>
              <CustomTooltipBtns title={mode === 0 ? 'Editar' : 'Guardar'} placement='top' type='primary'>
                <IconButton
                  size='small' onClick={(e) => {
                    handleChangeMode()
                    handleClick(e, element.terminalId)
                  }}
                >
                  <Icon fontSize='small' sx={{ color: (theme) => mode ? theme.palette.mode === 'light' ? 'primary.dark' : 'primary.800' : 'primary.main' }} />
                </IconButton>
              </CustomTooltipBtns>
              {viewType && (
                <CustomTooltipBtns title='Desvincular' placement='top' type='error'>
                  <IconButton
                    size='small' onClick={(e) => {
                      handleClick(e, element.terminalId)
                      handleOpen(element, element.terminalId)
                    }}
                    sx={{
                      visibility: mode ? 'hidden' : 'visible',
                      opacity: mode ? 0 : 100,
                      transition: 'all 0.2s linear'
                    }}
                  >
                    <LinkOffTwoToneIcon fontSize='small' sx={{ color: 'error.main' }} />
                  </IconButton>
                </CustomTooltipBtns>
              )}
              {mode
                ? (
                  <CustomTooltipBtns title='Cancelar' type='error' placement='top'>
                    <IconButton
                      size='small' onClick={() => {
                        setMode(0)
                      }}
                    >
                      <CancelTwoToneIcon fontSize='small' sx={{ color: (theme) => mode ? theme.palette.mode === 'light' ? 'error.main' : 'error.dark' : 'primary.main' }} />
                    </IconButton>
                  </CustomTooltipBtns>
                  )
                : (
                  <IconButton aria-label='expand row' size='small' onClick={() => setRowExpanded(!rowExpanded)}>
                    {rowExpanded ? <KeyboardArrowUpIcon sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.300' }} /> : <KeyboardArrowDownIcon sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.300' }} />}
                  </IconButton>
                  )}
            </Box>
          </TableCell>
        )}
      </TableRow>
      {hasExtendedRow && <RowTemplate rowExpanded={rowExpanded} element={element} mode={mode} data={newData} handleChange={handleChangeData} handleChangeSwitch={handleChangeSwitch} isSuperUser={isSuperUser} />}
    </>
  )
}

Row.propTypes = {
  element: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  changeMode: PropTypes.func,
  handleOpen: PropTypes.func,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  hasMoreActions: PropTypes.bool,
  rowMode: PropTypes.number,
  viewType: PropTypes.number,
  isSuperUser: PropTypes.bool,
  RowTemplate: PropTypes.any
}

export default Row
