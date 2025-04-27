import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [HelloWorld, setHelloWorld] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRemote = async () => {
      try {
        console.log('Attempting to load remote component...');
        const module = await import('microfrontend1/HelloWorld');
        console.log('Remote component loaded successfully');
        setHelloWorld(() => module.default);
      } catch (err) {
        console.error('Failed to load remote component:', err);
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        setError(err);
      }
    };

    loadRemote();
  }, []);

  return (
    <div>
      <h1>Host Container</h1>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {error ? (
            <div className="error-message">
              <h2>Failed to load remote component</h2>
              <p>Error: {error.message}</p>
              <p>Please check the console for more details.</p>
            </div>
          ) : (
            HelloWorld && <HelloWorld />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;