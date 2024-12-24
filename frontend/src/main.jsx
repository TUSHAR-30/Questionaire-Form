import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './App';
import router from './router.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>

);

