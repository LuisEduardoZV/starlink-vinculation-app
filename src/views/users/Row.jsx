/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// mui imports
import { SatelliteAltTwoTone } from '@mui/icons-material'
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone'
import { Box, Chip, IconButton, TableCell, TableRow } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'

const Row = ({ element, hasExtendedRow, RowTemplate, page, onEdit, onDelete }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [rowExpanded, setRowExpanded] = useState(false)

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell padding='checkbox' />
        <TableCell align='left' sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.fullName}</TableCell>
        <TableCell align='left' sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.email}</TableCell>
        <TableCell align='left' sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Chip label={element.isAdmin ? 'Administrador' : 'Normal'} size='small' variant='outlined' sx={{ color: element.isAdmin ? 'primary.dark' : theme.palette.mode === 'light' ? 'primary.light' : 'grey.600', borderColor: element.isAdmin ? 'primary.dark' : theme.palette.mode === 'light' ? 'primary.light' : 'grey.600' }} clickable />
        </TableCell>
        <TableCell align='left' sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Chip label={element.isEnabled ? 'Activo' : 'Inactivo'} size='small' variant='outlined' clickable sx={{ color: element.isEnabled ? theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.main : theme.palette.error.main, borderColor: element.isEnabled ? theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.main : theme.palette.error.main }} />
        </TableCell>
        <TableCell align='left' sx={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Box display='flex' gap={0.5}>
            <CustomTooltipBtns key='editbtn' placement='top' type='primary' title='Editar'>
              <IconButton size='small' sx={{ color: 'primary.main' }} onClick={() => { onEdit(element) }}><EditNoteTwoToneIcon /></IconButton>
            </CustomTooltipBtns>
            <CustomTooltipBtns key='terminalsbtn' placement='top' type='white' title='Ver terminales'>
              <IconButton size='small' sx={{ color: 'grey.700' }} onClick={() => navigate('/terminalsAssigned', { state: { userId: element.userId, typeViewTerminals: 1 } })}><SatelliteAltTwoTone fontSize='small' /></IconButton>
            </CustomTooltipBtns>
            <CustomTooltipBtns key='deletebtn' placement='top' type='error' title='Eliminar'>
              <IconButton size='small' color='error' onClick={() => { onDelete(element) }}><PersonRemoveTwoToneIcon /></IconButton>
            </CustomTooltipBtns>
          </Box>
        </TableCell>
        {hasExtendedRow && (
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setRowExpanded(!rowExpanded)}>
              {rowExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {hasExtendedRow && <RowTemplate rowExpanded={rowExpanded} element={element} />}
    </>
  )
}

Row.propTypes = {
  element: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  RowTemplate: PropTypes.any,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default Row
