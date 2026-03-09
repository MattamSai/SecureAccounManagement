'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audits', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      action: {
        type: Sequelize.STRING(200),
        defaultValue: 'null'
      },

      description: {
        type: Sequelize.STRING(500),
        defaultValue: 'null'
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
    await queryInterface.dropTable('audits');
  }
};