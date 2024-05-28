module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // other fields
  });
  Track.associate = (models) => {
    Track.belongsTo(models.Playlist);
  };
  return Track;
};
