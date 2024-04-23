import React, { useState } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ServerError from './ServerError';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleCatchError = (error, errorInfo) => {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    // You can render a fallback UI here
    return <ServerError />;
  }

  return (
    <ReactErrorBoundary FallbackComponent={FallbackUI} onError={handleCatchError}>
      {children}
    </ReactErrorBoundary>
  );
}

const FallbackUI = () => <ServerError />;

export default ErrorBoundary;
