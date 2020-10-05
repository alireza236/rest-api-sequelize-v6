'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      }); 
    }
  };
  Player.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    teamId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
       type: DataTypes.STRING(64)
    },
    height: {
      type: DataTypes.STRING(64)
    },
    weight: {
      type: DataTypes.STRING(64)
    },
    nationality: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    age: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    defaultScope: {
      where: {
        isActive: true
      }
    }
  });
  return Player;
};