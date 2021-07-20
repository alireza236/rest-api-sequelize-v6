'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MerchantProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      MerchantProduct.belongsTo(models.Product, {
        foreignKey: 'productId'
      })

      MerchantProduct.belongsTo(models.Merchant, {
        foreignKey: 'merchantId'
      })
    }
  };
  MerchantProduct.init({
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    merchantId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'MerchantProduct',
    tableName: 'merchantproducts'
  })
  return MerchantProduct
}
