import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleError = (error, info) => {
      console.error("Error caught by ErrorBoundary:", error, info);
      setHasError(true);
      setErrorInfo(info);
    };

    const errorHandler = (event) => {
      if (event.error) {
        handleError(event.error, event.error.stack);
      }
    };

    // Attach a global error listener
    window.addEventListener("error", errorHandler);

    return () => {
      // Clean up the listener
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: "1rem", border: "1px solid red", color: "red" }}>
        <h2>Something went wrong.</h2>
        {/* {errorInfo && <details>{errorInfo}</details>} */}
        <button
          style={{
            padding: "0.5rem",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
