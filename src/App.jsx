
import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'
import ThemeCustomization from './theme'

import { AuthContextProvider as AuthContext } from './contexts/AuthContext'

import Notify from './ui-components/Notify'

import './assets/scss/style.scss'

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
