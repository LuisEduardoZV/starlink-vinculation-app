
import './assets/scss/style.scss'

import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'

import { AuthContextProvider as AuthContext } from './contexts/AuthContext'

import ThemeCustomization from './theme'
import Notify from './ui-components/Notify'

function App () {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <AuthContext>
          <>
            <Routes />
            <Notify />
          </>
        </AuthContext>
      </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
