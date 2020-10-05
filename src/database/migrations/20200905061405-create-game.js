'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      federation : {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      region: {
        type: Sequelize.ENUM,
        values: ['asia', 'europe', 'africa','america','oceania'],
        allowNull: false
      },
      match_type: {
        type: Sequelize.ENUM,
        values: ['friendly', 'championship', 'charity','league','handicap'],
        allowNull: false
      },
      sponsorship : {
        type: Sequelize.STRING(54)
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: Sequelize.NOW,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('games');
  }
};