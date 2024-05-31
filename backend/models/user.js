'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Playlist, { foreignKey: 'username' });
      User.hasMany(models.Save, { foreignKey: 'username' });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });

  return User;
};
