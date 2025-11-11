import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ui/styles/global.css'
import App from './ui/components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
