import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from '../routes/Homepage';

test('renders Homepage component', () => {
  const { getByText } = render(
    <Router>
      <Homepage />
    </Router>
  );

  expect(getByText('Welcome to Shufflefy')).toBeInTheDocument();
  expect(getByText('Listen to your Spotify playlists in truly random order')).toBeInTheDocument();
  expect(getByText('GET STARTED')).toBeInTheDocument();
  expect(getByText('About our Mission')).toBeInTheDocument();
});

test('navigates to login on button click', () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  const { getByText } = render(
    <Router>
      <Homepage />
    </Router>
  );

  fireEvent.click(getByText('GET STARTED'));
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});
