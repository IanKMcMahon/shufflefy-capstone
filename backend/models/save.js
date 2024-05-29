'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    static associate(models) {
      Save.belongsTo(models.User, { foreignKey: 'userId' });
      Save.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
    }
  }

  Save.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Playlists',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Save',
    timestamps: true
  });

  return Save;
};
