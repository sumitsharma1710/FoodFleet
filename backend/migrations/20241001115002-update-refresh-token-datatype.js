'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the datatype of the refresh_token column to TEXT
    await queryInterface.changeColumn('refresh_tokens', 'refresh_token', {
      type: Sequelize.TEXT,
      allowNull: false, // Update this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the datatype change in case you need to rollback
    await queryInterface.changeColumn('refresh_tokens', 'refresh_token', {
      type: Sequelize.STRING(255), // or whatever the original type was
      allowNull: false, // Update this based on your requirements
    });
  },
};
