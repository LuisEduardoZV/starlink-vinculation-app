/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone'
import { Box, Chip, IconButton, TableCell, TableRow } from '@mui/material'

const Row = ({ element, hasExtendedRow, RowTemplate, page, onEdit, onDelete }) => {
  const [rowExpanded, setRowExpanded] = useState(false)

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell padding='checkbox' />
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.fullName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.email}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Chip label={element.isEnabled ? 'Activo' : 'Inactivo'} size='small' variant='outlined' clickable sx={{ color: (theme) => (element.isEnabled ? theme.palette.mode === 'light' ? theme.palette.primary[800] : theme.palette.success.dark : theme.palette.error.main), borderColor: (theme) => (element.isEnabled ? theme.palette.mode === 'light' ? theme.palette.primary[800] : theme.palette.success.dark : theme.palette.error.main) }} />
        </TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Box display='flex' gap={1}>
            <IconButton size='small' color='primary' onClick={() => { onEdit(element) }}><EditNoteTwoToneIcon /></IconButton>
            <IconButton size='small' color='error' onClick={() => { onDelete(element) }}><PersonRemoveTwoToneIcon /></IconButton>
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
  onDelete: PropTypes.func,
  onShow: PropTypes.func
}

export default Row
