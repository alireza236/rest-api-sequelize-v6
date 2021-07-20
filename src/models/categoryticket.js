'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CategoryTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CategoryTicket.hasMany(models.Ticket, {
        foreignKey: 'categoryticketId'
      })
    }
  };
  CategoryTicket.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    sla_level: {
      allowNull: false,
      type: DataTypes.INTEGER(64)
    },
    sla_name: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    response_time: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    resolution_time: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    sla_warning_time: {
      allowNull: false,
      type: DataTypes.STRING(64)
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
    modelName: 'CategoryTicket',
    tableName: 'categorytickets',
    defaultScope: {
      where: {
        isActive: true
      }
    }
  })
  return CategoryTicket
}
