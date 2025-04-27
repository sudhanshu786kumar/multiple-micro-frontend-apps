import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [HelloWorld, setHelloWorld] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRemote = async () => {
      try {
        const module = await import('microfrontend1/HelloWorld');
        setHelloWorld(() => module.default);
      } catch (err) {
        console.error('Failed to load remote component:', err);
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
              Failed to load remote component. Please check the console for details.
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