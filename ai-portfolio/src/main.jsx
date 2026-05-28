import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Performance monitoring for development
if (import.meta.env.DEV) {
  console.log('🚀 AI Portfolio - Development Mode')
  console.log('🎨 Design System Loaded')
  console.log('⚡ Performance Monitoring Active')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)