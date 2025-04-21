'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class dealData extends Model {
    static associate(models) {
      dealData.belongsTo(models.Lead, {
        foreignKey: 'lead_id',
        as: 'lead',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      dealData.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }

  dealData.init(
    {
      lead_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      advance_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deal_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'dealData',
      tableName: 'dealdata',
    }
  );

  return dealData;
};
