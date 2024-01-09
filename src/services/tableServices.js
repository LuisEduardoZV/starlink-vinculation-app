function descendingComparator (a, b, orderBy) {
  if (typeof b[orderBy] === 'string') {
    if (b[orderBy].toUpperCase() < a[orderBy].toUpperCase()) {
      return -1
    }
    if (b[orderBy].toUpperCase() > a[orderBy].toUpperCase()) {
      return 1
    }
  } else if (typeof b[orderBy] === 'number') {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const ids = (headCells) => {
  const keys = Object.keys(headCells)
  const ids = []
  for (let i = 0; i < keys.length; i += 1) {
    const clave = keys[i]
    ids.push(headCells[clave].id)
  }

  return ids
}

function filterData (a, filter, keyFilter) {
  return a.filter((value) => value[keyFilter] === filter)
}
function not (a, filter, keyFilter) {
  return a.filter((value) => value[keyFilter] !== filter)
}

const getContactAvatar = (name) => {
  if (!name) return
  let avatar = ''
  name.trim().split(' ').forEach((op) => { avatar += op.charAt(0).toUpperCase() })
  return avatar
}

export { descendingComparator, filterData, getComparator, getContactAvatar, ids, not, stableSort }

