const express = require('express');
const router = express.Router();
const { Playlist, Save } = require('../models');

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
      res.status(200).json({ tracks: lastSave.tracks });
    } else {
      res.status(404).json({ message: 'No previous save found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
