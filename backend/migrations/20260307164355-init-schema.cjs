'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      user_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      user_email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      user_password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      role: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_by: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};