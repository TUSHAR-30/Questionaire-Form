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

  // Redirect only if in-app browser or for testing purposes
  if (!sessionStorage.getItem("redirected") && isInAppBrowser) {
    const currentUrl = window.location.href;

    // Mark that a redirection has occurred
    sessionStorage.setItem("redirected", "true");

    // Attempt to redirect to the standard browser
    try {
      // Use `window.location.replace` for a direct redirection
      window.location.replace(currentUrl);
    } catch (error) {
      console.error("Redirection failed:", error);
      alert("Please open this link in a standard browser for the best experience.");
    }

    // Fallback: Show instructions to manually open the website
    setTimeout(() => {
      alert(
        "Please open this link in a standard browser for the best experience. Please copy the link below and open it in your standard browser:\n\n" +
          currentUrl
      );
      // Optionally copy the link to the clipboard
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert("The link has been copied to your clipboard!");
      });
    }, 1000);

  }
}


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
