// import './wydr';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './App';
import router from './routes/router.jsx';
import './index.css';
import { SignupDetailsProvider } from './Context/SignupDetailsContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';


createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <SignupDetailsProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </SignupDetailsProvider>
  </ErrorBoundary>

);

