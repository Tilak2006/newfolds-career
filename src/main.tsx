import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Careers from './Careers.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Careers />
  </StrictMode>,
)
