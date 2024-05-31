'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Save extends Model {
    static associate(models) {
      Save.belongsTo(models.User, { foreignKey: 'username' });
      Save.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
    }
  }

  Save.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'username'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    playlistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Playlists',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tracks: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Save',
    timestamps: true
  });

  return Save;
};
