import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { CreateFormProvider } from './Context/CreateFormContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CreateFormProvider>
      <App />
    </CreateFormProvider>
  </BrowserRouter>
)
