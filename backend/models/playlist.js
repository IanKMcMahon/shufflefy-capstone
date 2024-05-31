'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsTo(models.User, { foreignKey: 'username' });
      Playlist.hasMany(models.Save, { foreignKey: 'playlistId' });
    }
  }

  Playlist.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trackUris: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    trackAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Playlist',
    timestamps: true
  });

  return Playlist;
};
