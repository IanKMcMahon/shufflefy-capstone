'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Track extends Model {}

  Track.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    uri: {
      type: DataTypes.STRING,
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
    album: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration_ms: {
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
