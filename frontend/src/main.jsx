import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './App';
import router from './router.jsx';
import './index.css';
import { SignupDetailsProvider } from './Context/SignupDetailsContext.jsx';

createRoot(document.getElementById('root')).render(
  <SignupDetailsProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </SignupDetailsProvider>
);

