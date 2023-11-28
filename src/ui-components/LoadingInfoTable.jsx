import PropTypes from 'prop-types'

import { Skeleton, TableCell, TableRow } from '@mui/material'

const LoadingInfoTable = ({ headCells }) => {
  return (
    <>
      <TableRow>
        <TableCell />
        {headCells.map((op, index) => (
          <TableCell key={index}>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell />
        {headCells.map((op, index) => (
          <TableCell key={index}>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell />
        {headCells.map((op, index) => (
          <TableCell key={index}>
            <Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
          </TableCell>
        ))}
      </TableRow>
    </>
  )
}

LoadingInfoTable.propTypes = {
  headCells: PropTypes.array
}

export default LoadingInfoTable
