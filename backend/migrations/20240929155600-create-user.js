"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      country_code: Sequelize.STRING,
      phone_number: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      password: Sequelize.STRING,
      dob: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      created_by: Sequelize.INTEGER,
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_by: Sequelize.INTEGER,
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
