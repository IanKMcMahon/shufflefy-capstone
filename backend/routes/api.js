// routes/api.js
const express = require('express');
const router = express.Router();
const { Playlist, Save } = require('../models');

// Save changes to playlist
router.post('/api/save-changes', async (req, res) => {
  const { userId, playlistId, tracks } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const trackUris = tracks.map(track => track.uri);
    playlist.trackUris = trackUris;
    await playlist.save();

    await Save.create({ userId, playlistId, tracks: trackUris });

    res.json({ message: 'Playlist updated successfully' });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Undo changes to playlist
router.post('/api/undo-changes', async (req, res) => {
  const { playlistId } = req.body;

  try {
    const lastSave = await Save.findOne({
      where: { playlistId },
      order: [['createdAt', 'DESC']]
    });

    if (lastSave) {
      const playlist = await Playlist.findByPk(playlistId);
      playlist.trackUris = lastSave.tracks;
      await playlist.save();

      res.status(200).json({ message: 'Undo successful', tracks: lastSave.tracks });
    } else {
      res.status(404).json({ message: 'No previous save found' });
    }
  } catch (error) {
    console.error('Error undoing changes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
