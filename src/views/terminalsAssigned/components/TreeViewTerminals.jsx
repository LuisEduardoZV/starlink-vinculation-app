/* eslint-disable react/jsx-handler-names */
import PropTypes from 'prop-types'

// mui imports
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone'
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import { Box, IconButton, MenuItem, Select } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { Column } from 'primereact/column'
import { TreeTable } from 'primereact/treetable'

// project imports
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import CustomTooltipBtns from '../../../ui-components/CustomTooltipBtns'

const TreeViewTerminals = ({ loading, data, handleDelete }) => {
  const theme = useTheme()

  const actionTemplate = (options) => {
    return (options && !options.children && typeof options?.data?.assignId === 'number'
      ? (
        <Box>
          <CustomTooltipBtns type='error' title='Eliminar vinculación'>
            <IconButton size='small' color='error' onClick={() => handleDelete(options.data.assignId, options.data)}>
              <DeleteForeverTwoToneIcon fontSize='small' />
            </IconButton>
          </CustomTooltipBtns>
        </Box>
        )
      : <Box minWidth={10} />)
  }

  const togglerTemplate = (node, options) => {
    if (!node) {
      return
    }

    const expanded = options.expanded

    return options.props.level === 0 || (options.props.level === 1 && node.children)
      ? (
        <IconButton className='p-treetable-toggler p-link' size='small' sx={{ position: options.props.level === 1 && 'absolute', right: options.props.level === 1 && -10, top: options.props.level === 1 && '50%', bottom: options.props.level === 1 && '50%' }} onClick={options.onClick}>
          {expanded ? <ExpandMoreTwoToneIcon fontSize='small' color={theme.palette.mode === 'light' ? 'primary' : 'white'} /> : <ChevronRightTwoToneIcon fontSize='small' color={theme.palette.mode === 'light' ? 'primary' : 'white'} />}
        </IconButton>
        )
      : <Box ml={5} mt={5} />
  }

  if (!data) return
  return (
    <>
      {data && (
        <TreeTable
          value={data} rowHover loading={loading} paginator id='tabla' rows={10} tableStyle={{
            minWidth: '50rem',
            width: '100%'
          }}
          togglerTemplate={togglerTemplate}
          paginatorTemplate={{
            layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
            RowsPerPageDropdown: (options) => {
              const dropdownOptions = [
                { value: 5 },
                { value: 10 },
                { value: 25 }
              ]

              return (
                <>
                  <Box component='span' sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white, userSelect: 'none', py: 3, px: 2 }}>
                    Filas por página:
                  </Box>
                  <Select
                    value={options.value}
                    onChange={(e) => options.onChange(e.target)}
                    size='small'
                    sx={{
                      border: 'none',
                      outline: 'none',
                      borderColor: theme.palette.background.paper,
                      outlineColor: theme.palette.background.paper,
                      '& .MuiSelect-select': {
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.primary.main
                      },
                      '& .MuiSelect-icon': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {dropdownOptions.map(({ value }) => (
                      <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </>
              )
            },
            CurrentPageReport: (options) => {
              return (
                <Box component='span' sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white, userSelect: 'none', width: '120px', textAlign: 'center' }}>
                  {options.first} - {options.last} de {options.totalRecords}
                </Box>
              )
            },
            PrevPageLink: () => {
              return (
                <Box mx={1}>
                  <ArrowBackIosNewTwoToneIcon sx={{ fontSize: '1em', color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.main' }} />
                </Box>
              )
            },
            NextPageLink: () => {
              return (
                <Box mx={1}>
                  <ArrowForwardIosTwoToneIcon sx={{ fontSize: '1em', color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.main' }} />
                </Box>
              )
            }
          }}
          currentPageReportTemplate='{first} - {last} de {totalRecords}'
          paginatorLeft resizableColumns showGridlines columnResizeMode='expand'
        >
          <Column
            field='clientName' header='Cliente' expander
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}`, position: 'relative' }}
          />
          <Column
            field='fullName' header='Nombre/Usuario'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}`, overflowWrap: 'break-word' }}
          />
          <Column
            field='terminalSiteName' header='Nombre del sitio'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column
            field='terminalLineOfService' header='Terminal Id'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column
            field='terminalFriendlyName' header='Nombre personalizado'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column
            field='dashboardName' header='Nombre del dashboard'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, alignItems: 'center', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column field='assignId' header='Acciones' headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.7)}`, minWidth: 100, width: 100 }} bodyStyle={{ borderBottom: `1px solid ${alpha(theme.palette.grey[800], 0.5)}` }} body={actionTemplate} />
        </TreeTable>
      )}
    </>
  )
}

TreeViewTerminals.displayName = 'TreeViewTerminals'

TreeViewTerminals.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  handleDelete: PropTypes.func
}

export default TreeViewTerminals
