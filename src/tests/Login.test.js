import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../routes/Login';
import { AuthContext } from '../AuthContext';

test('renders Login component', () => {
  const { getByText } = render(
    <AuthContext.Provider value={{}}>
      <Login />
    </AuthContext.Provider>
  );

  expect(getByText('Login to Spotify')).toBeInTheDocument();
  expect(getByText('Once logged in, you can access all of your personal playlists')).toBeInTheDocument();
  expect(getByText('Login with Spotify')).toBeInTheDocument();
});

test('redirects to Spotify authorization URL on button click', () => {
  delete window.location;
  window.location = { href: '' };

  const { getByText } = render(
    <AuthContext.Provider value={{}}>
      <Login />
    </AuthContext.Provider>
  );

  fireEvent.click(getByText('Login with Spotify'));

  expect(window.location.href).toContain('https://accounts.spotify.com/authorize');
  expect(window.location.href).toContain('client_id=db419786e9514488959cb7765ca0902d');
  expect(window.location.href).toContain('response_type=code');
  expect(window.location.href).toContain('redirect_uri=http://localhost:3000/callback');
  expect(window.location.href).toContain('scope=user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read');
});
