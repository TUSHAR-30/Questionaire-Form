import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CreateFormProvider } from './Context/CreateFormContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CreateFormProvider>
        <App />
    </CreateFormProvider>
  </BrowserRouter>
)
