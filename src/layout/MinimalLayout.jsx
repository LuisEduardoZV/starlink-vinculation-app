import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import WOW from 'wowjs'

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  useEffect(() => {
    new WOW.WOW({
      live: true
    }).init()
  }, [])

  return (
    <>
      <Toaster closeButton theme='dark' />
      <Outlet />
    </>
  )
}

export default MinimalLayout
