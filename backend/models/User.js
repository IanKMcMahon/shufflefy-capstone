module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // other fields
  });
  User.associate = (models) => {
    User.hasMany(models.Playlist);
  };
  return User;
};
