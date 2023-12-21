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

const Row = ({ element, handleClick, isItemSelected, hasExtendedRow, hasMoreActions, RowTemplate, page }) => {
  const [rowExpanded, setRowExpanded] = useState(false)
  const [mode] = useState(0)

  const Icon = mode === 0 ? DriveFileRenameOutlineTwoToneIcon : SaveTwoToneIcon

  useEffect(() => {
    setRowExpanded(false)
  }, [page])

  return (
    <>
      <TableRow hover aria-checked={isItemSelected} tabIndex={-1} sx={{ cursor: 'pointer' }}>
        <TableCell />
        <TableCell component='th' align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.terminalSiteName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.dashboardName}</TableCell>
        <TableCell align='left' sx={{ color: (theme) => theme.palette.grey[400] }}>{element.fullName}</TableCell>
        {hasExtendedRow && (
          <TableCell>
            <Box sx={{ width: '100%', display: 'flex' }}>
              {hasMoreActions && (
                <>
                  <IconButton
                    size='small' onClick={(e) => {
                      handleClick(e, element.terminalId)
                    }}
                  >
                    <Icon fontSize='small' sx={{ color: mode ? 'primary.dark' : 'info.main' }} />
                  </IconButton>
                </>
              )}
              <IconButton aria-label='expand row' size='small' onClick={() => setRowExpanded(!rowExpanded)}>
                {rowExpanded ? <KeyboardArrowUpIcon sx={{ color: 'grey.300' }} /> : <KeyboardArrowDownIcon sx={{ color: 'grey.300' }} />}
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
