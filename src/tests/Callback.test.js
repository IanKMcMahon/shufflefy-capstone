import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Callback from './Callback';
import { AuthContext } from '../AuthContext';

jest.mock('axios');

test('exchanges authorization code for access token', async () => {
  const mockSetAccessToken = jest.fn();
  const mockNavigate = jest.fn();
  const code = 'test_code';

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      search: `?code=${code}`,
    }),
  }));

  axios.post.mockResolvedValueOnce({
    status: 200,
    data: { access_token: 'test_access_token' },
  });

  render(
    <Router>
      <AuthContext.Provider value={{ setAccessToken: mockSetAccessToken }}>
        <Callback />
      </AuthContext.Provider>
    </Router>
  );

  await waitFor(() => {
    expect(mockSetAccessToken).toHaveBeenCalledWith('test_access_token');
    expect(mockNavigate).toHaveBeenCalledWith('/playlists');
  });
});

test('displays loading spinner initially', () => {
  const { container } = render(
    <Router>
      <AuthContext.Provider value={{}}>
        <Callback />
      </AuthContext.Provider>
    </Router>
  );

  expect(container.querySelector('l-jelly')).toBeInTheDocument();
});
