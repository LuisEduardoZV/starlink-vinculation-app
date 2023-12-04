import { Box, Typography } from '@mui/material'

import nodata from '../assets/image/no-data.png'

const NoInfoOverlay = () => (
  <Box width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={1}>
    <img alt='No data icon' src={nodata} />
    <Typography variant='h3' color='grey.400'>Sin información</Typography>
  </Box>
)

export default NoInfoOverlay
