// import { createBrowserRouter, Outlet } from 'react-router-dom';
// import HomePage from './pages/HomePage/HomePage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import SignupPage from './pages/SignupPage/SignupPage';
// import CreateFormPage from './pages/CreateFormPage/CreateFormPage';
// import FormsPage from './pages/FormsPage/FormsPage';
// import FormPage from './pages/FormsPage/FormPage';
// import Navbar from './assets/Navbar/Navbar';
// import PrivateRoute from "./components/PrivateRoute"
// import PublicRoute from "./components/PublicRoute"
// import { EditFormProvider } from './Context/EditFormContext';
// import { CreateFormProvider } from './Context/CreateFormContext';

// // Layout Component
// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="app">
//         <Outlet /> {/* This is where child components will render */}
//       </div>
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />, // Use Layout as the parent
//     children: [
//       { path: '', element: <HomePage /> }, // Default route (HomePage)
//       {
//         path: 'forms', element: (
//           <PrivateRoute>
//             <FormsPage />
//           </PrivateRoute>
//         )
//       },
//       {
//         path: 'createform', element: (
//           <PrivateRoute>
//             <CreateFormProvider><CreateFormPage /></CreateFormProvider>
//           </PrivateRoute>

//         )
//       },
     
//       { path: 'form/:formId', element: (<EditFormProvider><FormPage /></EditFormProvider>) },
//       {
//         path: 'login', element: (
//           <PublicRoute>
//             <LoginPage />
//           </PublicRoute>
//         )
//       },
//       { path: 'signup', element: (
//         <PublicRoute>
//           <SignupPage />
//         </PublicRoute>
//       )
//     },
//       { path: '*', element: <div>No page found</div> },
//     ],
//   },
// ]);

// export default router;



//The commented code above is also a good code and taking care of authentication for protected and non-protected route using 2 files public and private route. But currently i am using the uncommented code which i consider more preferable as of now.
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import CreateFormPage from './pages/CreateFormPage/CreateFormPage';
import FormsPage from './pages/FormsPage/FormsPage';
import FormPage from './pages/FormsPage/FormPage';
import Navbar from './assets/Navbar/Navbar';
import ProtectedRoute from "./components/ProtectedRoute"
import { EditFormProvider } from './Context/EditFormContext';
import { CreateFormProvider } from './Context/CreateFormContext';

// Layout Component
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="app">
        <Outlet /> {/* This is where child components will render */}
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Navbar and shared layout
    children: [
      { path: '', element: <HomePage /> }, // Renders HomePage for '/'
      { path: 'form/:formId', element: (<EditFormProvider><FormPage /></EditFormProvider>) },
      {
        element: <ProtectedRoute isPrivate={true} />, // Controls private routes
        children: [
          { path: 'forms', element: <FormsPage /> }, // Renders FormsPage for '/forms'
          { path: 'createform', element: <CreateFormProvider><CreateFormPage /></CreateFormProvider> },
        ],
      },
      {
        element: <ProtectedRoute isPrivate={false} />, // Controls public routes
        children: [
          { path: 'login', element: <LoginPage /> }, // Renders LoginPage for '/login'
          { path: 'signup', element: <SignupPage /> },
        ],
      },
      { path: '*', element: <div>No page found</div> },
    ],
  },
]);


export default router;


