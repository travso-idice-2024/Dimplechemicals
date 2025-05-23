'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      
        Category.hasMany(models.Product, {
          foreignKey: 'category_id',
          as: 'products'
        });
      
    }
  }
  Category.init({
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true // createdAt and updatedAt will be handled automatically
  });
  return Category;
};
