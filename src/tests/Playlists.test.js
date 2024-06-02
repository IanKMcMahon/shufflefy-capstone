import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Playlists from '../routes/Playlists';
import { AuthContext } from '../AuthContext';
import { getPlaylists } from '../components/Api';

jest.mock('../components/Api');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('renders Playlists component', async () => {
  const mockPlaylists = {
    data: {
      items: [
        {
          id: '1',
          name: 'Playlist 1',
          tracks: { total: 10 },
          owner: { display_name: 'User' },
        },
      ],
    },
  };

  getPlaylists.mockResolvedValueOnce(mockPlaylists);

  render(
    <Router>
      <AuthContext.Provider value={{ accessToken: 'test_token', setUsername: jest.fn() }}>
        <Playlists />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => expect(screen.getByText("User's Playlists")).toBeInTheDocument());
  expect(screen.getByText('Playlist 1')).toBeInTheDocument();
  expect(screen.getByText('10 Songs')).toBeInTheDocument();
});

test('redirects to login if no access token', async () => {
  render(
    <Router>
      <AuthContext.Provider value={{ accessToken: null }}>
        <Playlists />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
});
