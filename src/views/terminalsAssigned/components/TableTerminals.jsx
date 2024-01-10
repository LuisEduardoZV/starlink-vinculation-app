/* eslint-disable react/jsx-handler-names */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// mui imports
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone'
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone'
import { Box, IconButton, MenuItem, Select } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { Column } from 'primereact/column'
import { TreeTable } from 'primereact/treetable'

// project imports
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'

const TableTerminals = ({ loading, data, selected, handleClick, handleSave }) => {
  const theme = useTheme()

  const [rows, setRows] = useState([])

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      let lastUser = null
      let index = 1
      const newRows = []
      let info = {}
      for (let i = 0; i < data.length; i++) {
        const { assignId, dashboardName, fullName, terminalSiteName } = data[i]
        if (lastUser === fullName) {
          info.children.push({
            key: assignId,
            data: {
              fullName: index++,
              terminalSiteName,
              dashboardName
            }
          })
        } else {
          if (lastUser) newRows.push(info)
          info = {}
          index = 1
          lastUser = fullName
          info.children = []
          info.key = assignId
          info.data = {
            fullName,
            terminalSiteName: '',
            dashboardName: ''
          }
          info.children.push({
            key: assignId,
            data: {
              fullName: index++,
              terminalSiteName,
              dashboardName
            }
          })
        }
      }
      newRows.push(info)
      setRows(newRows)
    }
  }, [data])

  const togglerTemplate = (node, options) => {
    if (!node) {
      return
    }

    const expanded = options.expanded

    return options.props.level === 0
      ? (
        <IconButton className='p-treetable-toggler p-link' size='small' onClick={options.onClick}>
          {expanded ? <ExpandMoreTwoToneIcon fontSize='small' color={theme.palette.mode === 'light' ? 'primary' : 'white'} /> : <ChevronRightTwoToneIcon fontSize='small' color={theme.palette.mode === 'light' ? 'primary' : 'white'} />}
        </IconButton>
        )
      : <Box ml={5} />
  }

  if (!rows) return
  return (
    <>
      {rows && (
        <TreeTable
          value={rows} rowHover loading={loading} paginator id='tabla' rows={10} tableStyle={{
            minWidth: '50rem'
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
                  <Box component='span' sx={{ color: 'var(--text-color)', userSelect: 'none', py: 3, px: 2 }}>
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
                <Box component='span' sx={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                  {options.first} - {options.last} de {options.totalRecords}
                </Box>
              )
            },
            PrevPageLink: (options) => {
              return (
                <Box mx={1}>
                  <ArrowBackIosNewTwoToneIcon sx={{ fontSize: '1em', color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.main' }} />
                </Box>
              )
            },
            NextPageLink: (options) => {
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
            field='fullName' header='Nombre' expander
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}`, display: 'flex', gap: 10 }}
          />
          <Column
            field='terminalSiteName' header='Nombre del sitio'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
          />
          <Column
            field='dashboardName' header='Nombre del dashboard'
            headerStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white', textAlign: 'start', borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
            bodyStyle={{ color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[400], fontSize: '0.875rem', padding: 16, borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'black' : alpha(theme.palette.grey[800], 0.5)}` }}
          />
        </TreeTable>
      )}
    </>
  )
}

TableTerminals.displayName = 'TableTerminals'

TableTerminals.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  selected: PropTypes.array,
  handleClick: PropTypes.func,
  handleSave: PropTypes.func
}

export default TableTerminals
