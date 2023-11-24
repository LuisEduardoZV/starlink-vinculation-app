/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Checkbox, Chip, IconButton, TableCell, TableRow } from '@mui/material'

const Row = ({ element, handleClick, isItemSelected, labelId, hasExtendedRow, RowTemplate, page }) => {
  const [rowExpanded, setRowExpanded] = useState(false)

  const active = Number(element.IsEnabled) === 1

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected} sx={{ cursor: 'pointer' }}>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            checked={isItemSelected}
            onClick={(event) => handleClick(event, element.user_Id)}
            inputProps={{
              'aria-labelledby': 'selection-row'
            }}
            name='selection-row'
          />
        </TableCell>
        <TableCell component='th' id={labelId} align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>
          {element.ClientId}
        </TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.Email}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.FullName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>
          <Chip label={active ? 'Activo' : 'Inactivo'} size='small' variant='outlined' color={active ? 'info' : 'error'} clickable />
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
  handleClick: PropTypes.func.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  RowTemplate: PropTypes.any
}

export default Row
