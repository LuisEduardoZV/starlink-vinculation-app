/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'

// project imports
import CustomTooltipBtns from '../../ui-components/CustomTooltipBtns'

const Row = ({ element, handleDelete, hasExtendedRow, RowTemplate, page }) => {
  const [rowExpanded, setRowExpanded] = useState(false)

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell />
        <TableCell component='th' align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalSiteName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalLineOfService}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.terminalFriendlyName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>{element.dashboardName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400] }}>
          <Box>
            <CustomTooltipBtns type='error' title='Eliminar vinculación'>
              <IconButton size='small' color='error' onClick={() => handleDelete(element.assignId, element)}>
                <DeleteForeverTwoToneIcon fontSize='small' />
              </IconButton>
            </CustomTooltipBtns>
          </Box>
        </TableCell>
      </TableRow>
      {hasExtendedRow && <RowTemplate rowExpanded={rowExpanded} element={element} />}
    </>
  )
}

Row.propTypes = {
  element: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeMode: PropTypes.func,
  page: PropTypes.number.isRequired,
  hasExtendedRow: PropTypes.bool,
  rowMode: PropTypes.number,
  RowTemplate: PropTypes.any
}

export default Row
