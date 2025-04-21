'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessAssociate extends Model {
    static associate(models) {
      BusinessAssociate.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'customers'
      });
      
    }
  }

  BusinessAssociate.init({
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    associate_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BusinessAssociate',
    tableName: 'businessassociates'
  });

  return BusinessAssociate;
};
