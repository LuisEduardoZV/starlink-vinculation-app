import PropTypes from 'prop-types'

// mui imports
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const EnhancedTableHead = ({ order, orderBy, onRequestSort, headCells, hasExtendedRowOption }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' width='fit-content' />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell?.align ? headCell.align : 'left'}
            width={headCell.width ?? 'auto'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ color: 'white' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: 'white' }}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                  )
                : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasExtendedRowOption && <TableCell />}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
  hasExtendedRowOption: PropTypes.bool
}

export default EnhancedTableHead
