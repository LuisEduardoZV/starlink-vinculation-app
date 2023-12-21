import 'animate.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './contexts/ConfigContext'

import { BASE_PATH } from './config.js'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider>
      <BrowserRouter basename={BASE_PATH}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
)
