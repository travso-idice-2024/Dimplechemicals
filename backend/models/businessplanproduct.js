"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BusinessPlanProduct extends Model {
    static associate(models) {
      BusinessPlanProduct.belongsTo(models.AnnualBusinessPlan, {
        foreignKey: "business_plan_id",
        as: "businessPlan",
      });
      BusinessPlanProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      BusinessPlanProduct.belongsTo(models.Category, {
        foreignKey: "technology_used",
        as: "category",
      });
     
    }
  }
  BusinessPlanProduct.init(
    {
      business_plan_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      qty: DataTypes.FLOAT,
      rate: DataTypes.FLOAT,
      value_in_rs: DataTypes.FLOAT,
      gst_amt: DataTypes.FLOAT,
      gross_sale_include_gst: DataTypes.FLOAT,
      commission: DataTypes.STRING,
      net_sale: DataTypes.FLOAT,
      technology_used: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BusinessPlanProduct",
      tableName: "business_plan_products",
    }
  );
  return BusinessPlanProduct;
};
