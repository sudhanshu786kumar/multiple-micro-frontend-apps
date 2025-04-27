import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [HelloWorld, setHelloWorld] = useState(null);

  useEffect(() => {
    // Load the remote component after the app is mounted
    import('microfrontend1/HelloWorld').then(module => {
      setHelloWorld(() => module.default);
    });
  }, []);

  return (
    <div>
      <h1>Host Container</h1>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {HelloWorld && <HelloWorld />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;