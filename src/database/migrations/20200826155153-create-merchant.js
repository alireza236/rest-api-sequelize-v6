'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('merchants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
      },
      name: {
        type: Sequelize.STRING(64)
      },
      owner_name :{
        type: Sequelize.STRING(64)
      },
      address : {
        type:  Sequelize.STRING
      },
      productId :{
        type : Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('merchants');
  }
};