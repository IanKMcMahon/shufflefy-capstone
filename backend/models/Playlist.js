module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define("Playlist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // other fields
  });
  Playlist.associate = (models) => {
    Playlist.belongsTo(models.User);
    Playlist.hasMany(models.Track);
  };
  return Playlist;
};
