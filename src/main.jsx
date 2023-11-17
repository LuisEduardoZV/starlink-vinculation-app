import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ConfigProvider } from './contexts/ConfigContext'

import { BASE_PATH } from './config.js'

import 'animate.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter basename={BASE_PATH}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
)
