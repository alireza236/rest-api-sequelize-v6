'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telephone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Telephone.belongsTo(models.User,{
         foreignKey: "userId",
         as: "telephone"
       });
    }
  };
  Telephone.init({
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING
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
    modelName: 'Telephone',
    tableName: 'telephones',
    defaultScope:{
      where :{
        isActive: true
      }
    }
  });
  return Telephone;
};