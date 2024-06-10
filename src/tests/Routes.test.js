import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../AppRouter';

test('renders AppRouter component', () => {
  const { container } = render(
    <Router>
      <AppRouter />
    </Router>
  );

  expect(container).toBeInTheDocument();
});
