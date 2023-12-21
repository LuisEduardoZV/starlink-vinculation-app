
import './assets/scss/style.scss'

import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'

import { AuthContextProvider as AuthContext } from './contexts/AuthContext'

import Notify from './ui-components/Notify'

function App () {
  return (
    <NavigationScroll>
      <AuthContext>
        <>
          <Routes />
          <Notify />
        </>
      </AuthContext>
    </NavigationScroll>
  )
}

export default App
