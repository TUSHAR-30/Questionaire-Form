import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import CreateFormPage from './pages/CreateFormPage/CreateFormPage';
import FormsPage from './pages/FormsPage/FormsPage';
import FormPage from './pages/FormsPage/FormPage';
import Navbar from './assets/Navbar/Navbar';
import { EditFormProvider } from './Context/EditFormContext';
import { CreateFormProvider } from './Context/CreateFormContext';

// Define a layout with Navbar
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="app">{children}</div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/createform',
    element: (
      <Layout>
        <CreateFormProvider>
          <CreateFormPage />
        </CreateFormProvider>
      </Layout>
    ),
  },
  {
    path: '/forms',
    element: (
      <Layout>
        <FormsPage />
      </Layout>
    ),
  },
  {
    path: '/form/:formId',
    element: (
      <Layout>
        <EditFormProvider>
          <FormPage />
        </EditFormProvider>
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <SignupPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div>No page found</div>
      </Layout>
    ),
  },
]);

export default router;
