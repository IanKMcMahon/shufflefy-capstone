const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const { Playlist, Save, User } = require('../models');

describe('API Routes', () => {
  let token;

  beforeAll(async () => {
    // Add setup code for database and authentication if necessary
  });

  afterAll(async () => {
    // Add teardown code for database if necessary
  });

  test('should save changes to a playlist', async () => {
    const response = await request(app)
      .post('/api/save-changes')
      .send({
        username: 'testuser',
        playlistId: '0kW4X8gv6mO2ZbaeyHE9QT',
        tracks: 'spotify:track:2oY13yM1AbuFhZOkUwdsqE,spotify:track:4tqLytSFOltkhsCdja4C1H',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Playlist updated successfully');
  });

  test('should undo changes to a playlist', async () => {
    const response = await request(app)
      .post('/api/undo-changes')
      .send({
        playlistId: '0kW4X8gv6mO2ZbaeyHE9QT',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.tracks).toBeDefined();
  });
});
