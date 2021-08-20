'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GameTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      GameTeam.belongsTo(models.Team, {
        foreignKey: 'teamId'
      })

      GameTeam.belongsTo(models.Game, {
        foreignKey: 'gameId'
      })
    }
  };
  GameTeam.init({
    gameId: {
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
    }
  }, {
    sequelize,
    modelName: 'GameTeam',
    tableName: 'gameteams'
  })
  return GameTeam
}
