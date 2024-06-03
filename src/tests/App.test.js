import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App'; // Adjust the path based on the actual location

test('renders App component', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );

  // Check if the Navigation component is rendered
  expect(getByText('Navigation')).toBeInTheDocument(); // Adjust if your Navigation component has specific text

  // Check if the AppRouter component is rendered
  expect(getByText('AppRouter')).toBeInTheDocument(); // Adjust if your AppRouter component has specific text
});
