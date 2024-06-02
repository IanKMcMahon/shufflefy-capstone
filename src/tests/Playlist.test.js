import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Playlist from '../routes/Playlist';
import { AuthContext } from '../AuthContext';
import { getTracks } from '../components/Api';
import axios from 'axios';

jest.mock('../components/Api');
jest.mock('axios');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
  useLocation: () => ({
    state: { playlist: { name: 'Test Playlist' } },
  }),
}));

test('renders Playlist component', async () => {
  const mockTracks = [
    {
      track: {
        id: '1',
        name: 'Song 1',
        artists: [{ name: 'Artist 1' }],
        duration_ms: 300000,
      },
    },
  ];

  getTracks.mockResolvedValueOnce(mockTracks);

  const { getByText } = render(
    <Router>
      <AuthContext.Provider value={{ accessToken: 'test_token', setTracks: jest.fn() }}>
        <Playlist />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => expect(getByText('Song 1')).toBeInTheDocument());
  expect(getByText('Artist 1')).toBeInTheDocument();
  expect(getByText('00:05:00')).toBeInTheDocument();
});

test('redirects to login if no access token', async () => {
  render(
    <Router>
      <AuthContext.Provider value={{ accessToken: null }}>
        <Playlist />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
});

test('shuffles tracks on shuffle button click', async () => {
  const mockTracks = [
    {
      track: {
        id: '1',
        name: 'Song 1',
        artists: [{ name: 'Artist 1' }],
        duration_ms: 300000,
      },
    },
  ];

  getTracks.mockResolvedValueOnce(mockTracks);

  const { getByText } = render(
    <Router>
      <AuthContext.Provider value={{ accessToken: 'test_token', tracks: mockTracks.map(t => t.track), setTracks: jest.fn() }}>
        <Playlist />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => expect(getByText('SHUFFLE')).toBeInTheDocument());

  fireEvent.click(getByText('SHUFFLE'));
  expect(getByText('EXPORT')).toBeInTheDocument();
});
