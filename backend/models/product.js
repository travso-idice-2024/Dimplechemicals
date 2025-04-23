"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
     
        Product.belongsTo(models.Category, {
          foreignKey: 'category_id',
          as: 'category'
        });      
      // Define associations here if needed
    }
  }

  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HSN_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      category_id: DataTypes.INTEGER // 👈 Add this line
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
    }
  );

  return Product;
};
