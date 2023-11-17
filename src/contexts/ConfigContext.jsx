import PropTypes from 'prop-types'
import { createContext } from 'react'

// project import
import defaultConfig from '../config'
import useLocalStorage from '../hooks/useLocalStorage'

// initial state
const initialState = {
  ...defaultConfig,
  onChangeMenuType: () => {},
  onChangeLocale: () => {}
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

function ConfigProvider ({ children }) {
  const [config, setConfig] = useLocalStorage('tan-graph-config', {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    locale: initialState.locale
  })

  const onChangeMenuType = (navType) => {
    setConfig({
      ...config,
      navType
    })
  }

  const onChangeLocale = (locale) => {
    setConfig({
      ...config,
      locale
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeMenuType,
        onChangeLocale
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node
}

export { ConfigContext, ConfigProvider }

