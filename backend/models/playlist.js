'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Playlist extends Model {
    static associate(models) {
      Playlist.belongsTo(models.User, { foreignKey: 'username' });
    }
  }

  Playlist.init({
    id: {
      type: DataTypes.STRING,
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
      allowNull: true
    },
    trackCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Playlist',
    timestamps: true
  });

  return Playlist;
};
