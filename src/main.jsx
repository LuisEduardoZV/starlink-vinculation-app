import 'animate.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './contexts/ConfigContext'

import { BASE_PATH } from './config.js'
import { store } from './store'
import ThemeCustomization from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider>
      <ThemeCustomization>
        <BrowserRouter basename={BASE_PATH}>
          <App />
        </BrowserRouter>
      </ThemeCustomization>
    </ConfigProvider>
  </Provider>
)
