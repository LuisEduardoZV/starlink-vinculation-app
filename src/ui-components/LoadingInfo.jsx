import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingInfo = () => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      minHeight: 300,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 3
    }}
  >
    <CircularProgress />
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant='h2' gutterBottom sx={{ color: 'white' }}>
        Cargando...
      </Typography>
      <Typography variant='subtitle1' gutterBottom sx={{ color: (theme) => theme.palette.grey[500] }}>
        Obteniendo información. Un momento.
      </Typography>
    </Box>
  </Box>
)

export default LoadingInfo
