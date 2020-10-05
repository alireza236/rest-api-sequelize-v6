'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Team.belongsToMany(models.Game, {
         through : 'GameTeam',
         foreignKey: 'teamId',
         otherKey: 'gameId',
         as: 'game'
       });

       Team.hasMany(models.GameTeam,{
         foreignKey: 'teamId'
       });

       Team.hasMany(models.Player, {
         foreignKey: 'teamId',
         as: 'player'
       });
    }
  };
  Team.init({
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: { 
      type: DataTypes.STRING(64)
    },
    country_base: { 
      type: DataTypes.STRING(64)
    },
    region: { 
      type: DataTypes.STRING(64)
    },
    owner_name: { 
      type: DataTypes.STRING(64)
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
    modelName: 'Team',
    tableName: 'teams',
    defaultScope: {
      where :{
        isActive: true
      }
    }
  });
  return Team;
};