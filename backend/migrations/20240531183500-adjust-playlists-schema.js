'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Playlists');
    
    if (!tableInfo.userId) {
      await queryInterface.addColumn('Playlists', 'userId', {
        type: Sequelize.STRING,
        allowNull: false
      });
    }

    if (!tableInfo.trackAmount) {
      await queryInterface.addColumn('Playlists', 'trackAmount', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Playlists');
    
    if (tableInfo.userId) {
      await queryInterface.removeColumn('Playlists', 'userId');
    }

    if (tableInfo.trackAmount) {
      await queryInterface.removeColumn('Playlists', 'trackAmount');
    }
  }
};
