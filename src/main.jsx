import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// helps in finding DOM element with ID in HTML File
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
