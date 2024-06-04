const express = require('express');
const router = express.Router();
const { Playlist, Save, User } = require('../models');

// Endpoint to seed users
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

// Endpoint to seed playlists
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

// Check if playlist exists
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

// Create new playlist
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

// Save changes to playlist
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

// Undo changes to playlist
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
