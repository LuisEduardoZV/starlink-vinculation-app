/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'

// project imports

const Row = ({ element, handleClick, isItemSelected, hasExtendedRow, hasMoreActions, RowTemplate, page }) => {
  const [rowExpanded, setRowExpanded] = useState(false)

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover aria-checked={isItemSelected} tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell />
        <TableCell component='th' align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.fullName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalSiteName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.dashboardName}</TableCell>
        {hasMoreActions && (
          <TableCell width='auto'>
            <Box sx={{ width: 'auto', display: 'flex' }}>
              <IconButton
                size='small' onClick={(e) => {
                  handleClick(e, element.terminalId)
                }}
              >
                <DeleteForeverTwoToneIcon fontSize='small' sx={{ color: 'error.main' }} />
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
  changeMode: PropTypes.func,
  isItemSelected: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  hasMoreActions: PropTypes.bool,
  rowMode: PropTypes.number,
  RowTemplate: PropTypes.any
}

export default Row
