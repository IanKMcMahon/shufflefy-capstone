'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column exists before renaming or adding
    const tableInfo = await queryInterface.describeTable('Playlists');

    if (!tableInfo.username) {
      await queryInterface.addColumn('Playlists', 'username', {
        type: Sequelize.STRING,
        allowNull: false
      });
    }

    if (tableInfo.trackAmount) {
      await queryInterface.renameColumn('Playlists', 'trackAmount', 'trackCount');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Playlists');

    if (tableInfo.username) {
      await queryInterface.removeColumn('Playlists', 'username');
    }

    if (tableInfo.trackCount) {
      await queryInterface.renameColumn('Playlists', 'trackCount', 'trackAmount');
    }
  }
};
