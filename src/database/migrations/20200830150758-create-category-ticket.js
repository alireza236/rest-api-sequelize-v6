'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorytickets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
      },
      sla_level: {
        allowNull: false,
        type: Sequelize.INTEGER(64)
      },
      sla_name: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      response_time: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      resolution_time: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      sla_warning_time: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: Sequelize.NOW,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorytickets')
  }
}
