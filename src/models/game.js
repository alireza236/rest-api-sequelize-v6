'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Game.belongsToMany(models.Team, {
        through: 'GameTeam',
        foreignKey: 'gameId',
        otherKey: 'teamId',
        as: 'team'
      })

      Game.hasMany(models.GameTeam, {
        foreignKey: 'gameId'
      })
    }
  };
  Game.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    federation: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    region: {
      type: DataTypes.ENUM,
      values: ['asia', 'europe', 'africa', 'america', 'oceania'],
      allowNull: false
    },
    match_type: {
      type: DataTypes.ENUM,
      values: ['friendly', 'championship', 'charity', 'league', 'handicap'],
      allowNull: false
    },
    sponsorship: {
      type: DataTypes.STRING(54)
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'games',
    defaultScope: {
      where: {
        isActive: true
      }
    }
  })
  return Game
}
