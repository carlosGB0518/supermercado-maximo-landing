import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './estilos/variables.css'
import './estilos/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('raiz')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
