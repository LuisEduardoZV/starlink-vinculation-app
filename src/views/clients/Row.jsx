/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'

const Row = ({ element, handleClick, isItemSelected, labelId, hasExtendedRow, RowTemplate, page }) => {
  const [rowExpanded, setRowExpanded] = useState(false)

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
          {element.ClientNumber}
        </TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.ClientTaxId}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.ClientName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.ClientEmail}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.ClientPhone}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.isEnabled}</TableCell>
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
