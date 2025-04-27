import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import HelloWorld from './HelloWorld';

const App = () => (
  <div>
    <h1>Microfrontend 1</h1>
    <ErrorBoundary>
      <HelloWorld />
    </ErrorBoundary>
  </div>
);

export default App;