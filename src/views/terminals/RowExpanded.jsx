/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React from 'react'

// mui imports
import { Box, Chip, Collapse, TableCell, TableRow, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

import InputBase from '../../ui-components/InputBase'
// 19.2345 -93.7653

const RowExpanded = ({ rowExpanded, element, mode, data, handleChange }) => {
  return (
    <TableRow
      sx={{
        '& .MuiTableCell-root': !rowExpanded && { borderBottom: 0 },
        '& .icon-style': {
          color: (theme) => theme.palette.secondary.main,
          width: '20px',
          height: '20px'
        },
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[300] : alpha(theme.palette.common.white, 0.05),
        width: '100%',
        transition: 'all',
        transitionDuration: rowExpanded ? '400ms' : '500ms',
        transitionTimingFunction: 'ease-in'
      }}
    >
      <TableCell
        style={{
          paddingBottom: rowExpanded ? 20 : 0,
          paddingTop: rowExpanded ? 20 : 0,
          transition: 'all',
          transitionDuration: rowExpanded ? '500ms' : '400ms',
          transitionTimingFunction: 'ease-in-out',
          transitionDelay: rowExpanded ? '0ms' : '100ms'
        }}
        colSpan={8}
      >
        <Collapse in={rowExpanded} timeout='auto' unmountOnExit>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              height: 'fit-content',
              justifyContent: 'center',
              rowGap: 3
            }}
          >
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[300] : alpha(theme.palette.common.white, 0.05),
                px: 3,
                py: 1,
                display: 'flex',
                width: '100%',
                borderRadius: '0.2rem',
                boxShadow: 5,
                gap: 1,
                justifyContent: 'space-around'
              }}
            >
              <Box display='flex' gap={1} alignItems='center'>
                {mode
                  ? (<InputBase
                      name='terminalLatitude'
                      value={data.terminalLatitude}
                      label='Latitud'
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      required
                      onChange={handleChange}
                     />)
                  : (
                    <>
                      <Typography variant='subtitle1' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[800] : alpha(theme.palette.common.white, 0.8) }}>
                        Latitud:
                      </Typography>
                      <Typography>{element.terminalLatitude}</Typography>
                    </>
                    )}
              </Box>
              <Box display='flex' gap={1} alignItems='center'>

                {mode
                  ? (<InputBase
                      name='terminalLongitude'
                      value={data.terminalLongitude}
                      label='Longitud'
                      variant='filled'
                      size='small'
                      fullWidth
                      color='primary'
                      required
                      onChange={handleChange}
                     />)
                  : (
                    <>
                      <Typography variant='subtitle1' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[800] : alpha(theme.palette.common.white, 0.8) }}>
                        Longitud:
                      </Typography>
                      <Typography>{element.terminalLongitude}</Typography>
                    </>
                    )}
              </Box>
              <Box display='flex' gap={1} alignItems='center'>
                <Typography variant='subtitle1' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[800] : alpha(theme.palette.common.white, 0.8) }}>
                  Número de la línea de servicio:
                </Typography>
                <Typography>{element.serviceLineNumber}</Typography>
              </Box>
              <Box display='flex' gap={1} alignItems='center'>
                <Typography variant='subtitle1' sx={{ color: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[800] : alpha(theme.palette.common.white, 0.8) }}>
                  Histórico:
                </Typography>
                <Chip label={element.dataHistoric ? 'Activado' : 'Desactivado'} color={element.dataHistoric ? 'primary' : 'error'} clickable size='small' variant='outlined' />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

RowExpanded.propTypes = {
  rowExpanded: PropTypes.bool,
  element: PropTypes.object,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  mode: PropTypes.number
}

export default RowExpanded
