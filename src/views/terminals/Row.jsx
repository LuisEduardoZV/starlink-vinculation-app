/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'

// project imports
import InputBase from '../../ui-components/InputBase'

const Row = ({ element, handleClick, isItemSelected, labelId, hasExtendedRow, hasMoreActions, RowTemplate, page, handleSave }) => {
  const [rowExpanded, setRowExpanded] = useState(false)
  const [mode, setMode] = useState(0)

  const [newData, setNewData] = useState({ ...element })

  const handleChangeMode = () => {
    setMode((prev) => {
      if (prev === 1) {
        handleSave(newData)
        return 0
      } else return 1
    })
  }

  const handleChangeData = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value })
  }

  const Icon = mode === 0 ? DriveFileRenameOutlineTwoToneIcon : SaveTwoToneIcon

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

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
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalSerialNumber}</TableCell>
        {hasExtendedRow && (
          <TableCell>
            <Box sx={{ width: '100%', display: 'flex' }}>
              {hasMoreActions && (
                <>
                  <IconButton
                    size='small' onClick={(e) => {
                      handleChangeMode()
                      handleClick(e, element.terminalId)
                    }}
                  >
                    <Icon fontSize='small' sx={{ color: (theme) => mode ? theme.palette.mode === 'light' ? 'primary.main' : 'primary.dark' : theme.palette.mode === 'light' ? 'success.dark' : 'info.main' }} />
                  </IconButton>
                </>
              )}
              <IconButton aria-label='expand row' size='small' onClick={() => setRowExpanded(!rowExpanded)}>
                {rowExpanded ? <KeyboardArrowUpIcon sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.300' }} /> : <KeyboardArrowDownIcon sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.700' : 'grey.300' }} />}
              </IconButton>
            </Box>
          </TableCell>
        )}
      </TableRow>
      {hasExtendedRow && <RowTemplate rowExpanded={rowExpanded} element={element} />}
    </>
  )
}

Row.propTypes = {
  element: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  changeMode: PropTypes.func,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  hasMoreActions: PropTypes.bool,
  rowMode: PropTypes.number,
  RowTemplate: PropTypes.any
}

export default Row
