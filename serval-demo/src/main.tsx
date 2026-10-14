import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { clientConfig } from './config/client'

document.title = `${clientConfig.demoTitle} — Simulated demo`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
