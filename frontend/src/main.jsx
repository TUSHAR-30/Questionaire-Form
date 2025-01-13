// import './wydr';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './App';
import router from './routes/router.jsx';
import './index.css';
import { SignupDetailsProvider } from './Context/SignupDetailsContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function redirectToDefaultBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for common in-app browser user agents
  const isInAppBrowser =
    /FBAN|FBAV|Instagram|LinkedInApp|Twitter|Snapchat/i.test(userAgent);

  if (isInAppBrowser && !sessionStorage.getItem("redirected") ) {
    // Redirect to the current URL in the default browser
    const currentUrl = window.location.href;

     // Mark that a redirection has occurred
     sessionStorage.setItem("redirected", "true");

    // Open the URL in a new tab and optionally close the in-app browser
    window.open(currentUrl, "_blank");
    window.location.href = "about:blank";
  }
}

// Invoke the function before rendering the app
redirectToDefaultBrowser();

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <SignupDetailsProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </SignupDetailsProvider>
  </ErrorBoundary>
);
