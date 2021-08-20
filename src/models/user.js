'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Product, {
        foreignKey: 'userId',
        as: 'products'
      })

      User.hasOne(models.Telephone, {
        foreignKey: 'userId',
        as: 'telephone'
      })

      User.hasMany(models.Ticket, {
        foreignKey: 'userId'
      })

      User.hasMany(models.Ticket, {
        as: 'assign',
        foreignKey: 'assignId'
      })
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING(64)
    },
    lastname: {
      type: DataTypes.STRING(64)
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      where: {
        isActive: true
      }
    }
  })
  return User
}
