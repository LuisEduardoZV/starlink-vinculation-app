import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'

// mui imports
import {
  Box,
  Button,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'

function not (a, b) {
  return a.filter(({ terminalId }) => b.findIndex((op) => (op?.terminalId === terminalId)) === -1)
}

function intersection (a, b) {
  return a.filter(({ terminalId }) => b.findIndex((op) => (op.terminalId === terminalId)) !== -1)
}

function union (a, b) {
  return [...a, ...not(b, a)]
}

export default function TransferList ({ terminals, termSelected, setNewTerms, disabled }) {
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState(not(terminals, termSelected))
  const [right, setRight] = useState(termSelected)

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (terminal) => () => {
    const currentIndex = checked.findIndex((op) => (op.terminalId === terminal.terminalId))
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push({ ...terminal })
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    const newTerms = right.concat(leftChecked)
    setRight(newTerms)
    setNewTerms(newTerms)
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    const newTerms = not(right, rightChecked)
    setLeft(left.concat(rightChecked))
    setRight(newTerms)
    setNewTerms(newTerms)
    setChecked(not(checked, rightChecked))
  }

  const customList = (title, items) => (
    <Box>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0 || disabled}
            inputProps={{
              'aria-label': 'all items selected'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider sx={{ borderColor: 'grey.500' }} />
      <List
        sx={{
          width: 350,
          height: 'max-content',
          maxHeight: '50vh',
          bgcolor: 'transparent',
          overflow: 'auto'
        }}
        dense
        component='div'
        role='list'
      >
        {items.map((op) => {
          const { terminalId, terminalSiteName } = op
          const labelId = `transfer-list-all-item-${terminalId}-label`

          return (
            <Fragment key={terminalId}>
              <ListItem
                role='listitem'
                color='primary'
                onClick={handleToggle(op)}
                sx={{
                  mb: 1.5
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.findIndex((op) => (op.terminalId === terminalId)) !== -1}
                    tabIndex={-1}
                    disableRipple
                    disabled={disabled}
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={<Typography variant='body1'>{terminalSiteName}</Typography>} sx={{ color: (theme) => theme.palette.mode === 'light' ? 'grey.800' : 'white' }} />
              </ListItem>
            </Fragment>
          )
        })}
      </List>
    </Box>
  )

  useEffect(() => {
    setLeft(not(terminals, termSelected))
    setRight(termSelected)
  }, [terminals, termSelected])

  return (
    <Grid container spacing={2} alignItems='start'>
      <Grid item>{customList('Disponibles', left)}</Grid>
      <Grid item alignSelf='center'>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0 || disabled}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0 || disabled}
            aria-label='move selected left'
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Asignados', right)}</Grid>
    </Grid>
  )
}

TransferList.propTypes = {
  terminals: PropTypes.array,
  termSelected: PropTypes.array,
  setNewTerms: PropTypes.func,
  disabled: PropTypes.bool
}
