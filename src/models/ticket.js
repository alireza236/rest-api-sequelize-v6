'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Ticket.belongsTo(models.CategoryTicket,{
         foreignKey: 'categoryticketId'
       });

       Ticket.belongsTo(models.User,{
         foreignKey: 'userId'
       });

       Ticket.belongsTo(models.User,{
         as: 'assign',
         foreignKey: 'assignId'
      });

       Ticket.belongsToMany(models.Customer,{
         through: 'CustomerTicket',
         foreignKey: 'ticketId',
         otherKey: 'customerId'
       });
    }
  };
  Ticket.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    assignId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    categoryticketId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    code_ticket: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed', 'pending','resolved'],
      defaultValue: 'open',
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
    modelName: 'Ticket',
    tableName: 'tickets',
    defaultScope:{
      where: {
        isActive: true
      }
    }
    
  });
  return Ticket;
};