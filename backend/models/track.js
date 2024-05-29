'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
    }
  }

  Track.init({
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Track',
    timestamps: true
  });

  return Track;
};
