import './index.css'
import './App.css'
import AppWithRouter from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithRouter />
  </StrictMode>,
)
