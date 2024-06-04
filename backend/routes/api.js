const express = require('express');
const router = express.Router();
const { Playlist, Save, User } = require('../models');

/**
 * Endpoint to seed users
 * 
 * This endpoint seeds the database with a list of users.
 * 
 * @route POST /seed-users
 * @param {Array} req.body.users - Array of usernames to seed
 * @returns {Object} JSON response indicating success or failure
 */
router.post('/seed-users', async (req, res) => {
  const { users } = req.body;

  try {
    for (const username of users) {
      await User.findOrCreate({
        where: { username },
        defaults: { /* Add other user details if needed */ }
      });
    }
    res.json({ message: 'Users seeded successfully' });
  } catch (error) {
    console.error('Error adding users to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Endpoint to seed playlists
 * 
 * This endpoint seeds the database with a list of playlists.
 * 
 * @route POST /seed-playlists
 * @param {Array} req.body.playlists - Array of playlists to seed
 * @returns {Object} JSON response indicating success or failure
 */
router.post('/seed-playlists', async (req, res) => {
  const { playlists } = req.body;

  try {
    for (const playlist of playlists) {
      // Ensure the user exists
      await User.findOrCreate({
        where: { username: playlist.username },
        defaults: { /* Add other user details if needed */ }
      });

      // Insert the playlist
      const existingPlaylist = await Playlist.findByPk(playlist.id);
      if (!existingPlaylist) {
        await Playlist.create({
          id: playlist.id,
          name: playlist.name,
          username: playlist.username,
          trackUris: playlist.trackUris,
          trackCount: playlist.trackCount
        });
      }
    }
    res.json({ message: 'Playlists seeded successfully' });
  } catch (error) {
    console.error('Error seeding playlists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Check if playlist exists
 * 
 * This endpoint checks if a playlist exists in the database.
 * 
 * @route GET /playlists/:id
 * @param {String} req.params.id - The ID of the playlist to check
 * @returns {Object} JSON response with the playlist data or an error message
 */
router.get('/playlists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findByPk(id);
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({ error: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error checking playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Create new playlist
 * 
 * This endpoint creates a new playlist in the database.
 * 
 * @route POST /playlists
 * @param {String} req.body.id - The ID of the new playlist
 * @param {String} req.body.name - The name of the new playlist
 * @param {String} req.body.username - The username of the playlist owner
 * @param {Array} req.body.trackUris - The URIs of the tracks in the playlist
 * @param {Number} req.body.trackCount - The number of tracks in the playlist
 * @returns {Object} JSON response with the new playlist data or an error message
 */
router.post('/playlists', async (req, res) => {
  const { id, name, username, trackUris, trackCount } = req.body;
  try {
    const newPlaylist = await Playlist.create({
      id,
      name,
      username,
      trackUris,
      trackCount,
    });
    res.json(newPlaylist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Save changes to playlist
 * 
 * This endpoint saves changes made to a playlist.
 * 
 * @route POST /save-changes
 * @param {String} req.body.username - The username of the playlist owner
 * @param {String} req.body.playlistId - The ID of the playlist to update
 * @param {String} req.body.tracks - The new tracks in the playlist
 * @returns {Object} JSON response indicating success or failure
 */
router.post('/save-changes', async (req, res) => {
  const { username, playlistId, tracks } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const trackUris = tracks.split(',').map(track => track.trim());
    playlist.trackUris = trackUris;
    playlist.trackCount = trackUris.length;
    await playlist.save();

    await Save.create({ username, playlistId, tracks: trackUris });

    res.json({ message: 'Playlist updated successfully' });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Undo changes to playlist
 * 
 * This endpoint undoes the last set of changes made to a playlist.
 * 
 * @route POST /undo-changes
 * @param {String} req.body.playlistId - The ID of the playlist to undo changes for
 * @returns {Object} JSON response with the previous tracks or an error message
 */
router.post('/undo-changes', async (req, res) => {
  const { playlistId } = req.body;

  try {
    const lastSave = await Save.findOne({
      where: { playlistId },
      order: [['createdAt', 'DESC']]
    });

    if (lastSave) {
      await lastSave.destroy();
      res.status(200).json({ tracks: lastSave.tracks });
    } else {
      res.status(404).json({ message: 'No previous save found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
