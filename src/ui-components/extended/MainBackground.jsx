import { Box } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useMemo } from 'react'

const MainBackground = () => {
  const theme = useTheme()

  const defLiCss = useMemo(() => ({
    position: 'absolute',
    display: 'block',
    listStyle: 'none',
    width: '20px',
    height: '20px',
    background: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.2) : alpha(theme.palette.common.black, 0.4),
    animation: 'animate 19s linear infinite'
  }), [theme.palette])

  return (
    <Box
      component='ul'
      className='background' sx={{
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '76%',
          width: '126px',
          height: '126px',
          bottom: '-126px',
          animationDelay: '1s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '75%',
          width: '158px',
          height: '158px',
          bottom: '-158px',
          animationDelay: '5s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '16%',
          width: '199px',
          height: '199px',
          bottom: '-199px',
          animationDelay: '3s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '29%',
          width: '146px',
          height: '146px',
          bottom: '-146px',
          animationDelay: '6s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '76%',
          width: '171px',
          height: '171px',
          bottom: '-171px',
          animationDelay: '2s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: ' 3%',
          width: '144px',
          height: '144px',
          bottom: '-144px',
          animationDelay: '1s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '55%',
          width: '145px',
          height: '145px',
          bottom: '-145px',
          animationDelay: '14s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '15%',
          width: '164px',
          height: '164px',
          bottom: '-164px',
          animationDelay: '24s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '42%',
          width: '154px',
          height: '154px',
          bottom: '-154px',
          animationDelay: '26s'
        }}
      />
      <Box
        component='li' sx={{
          ...defLiCss,
          left: '33%',
          width: '179px',
          height: '179px',
          bottom: '-179px',
          animationDelay: '7s'
        }}
      />
    </Box>
  )
}

export default MainBackground
