'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the datatype of the refresh_token column to TEXT
    await queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false, // Update this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the datatype change in case you need to rollback
    await queryInterface.changeColumn('users', 'phone_number', {
      type: Sequelize.INTEGER, // or whatever the original type was
      allowNull: false, // Update this based on your requirements
    });
  },
};