
import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'
import ThemeCustomization from './theme'

import './assets/scss/style.scss'

function App () {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
