"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AnnualBusinessPlan extends Model {
    static associate(models) {
      AnnualBusinessPlan.belongsTo(models.User, {
        foreignKey: "emp_id",
        as: "employee",
      });
      AnnualBusinessPlan.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });
      AnnualBusinessPlan.belongsTo(models.BusinessAssociate, {
        foreignKey: "associate_id",
        as: "associate",
      });
      AnnualBusinessPlan.belongsTo(models.CustomerContactPerson, {
        foreignKey: "contact_person_id",
        as: "contactPerson",
      });
      AnnualBusinessPlan.hasMany(models.BusinessPlanProduct, {
        foreignKey: "business_plan_id",
        as: "products",
      });
      AnnualBusinessPlan.belongsTo(models.Category, {
        foreignKey: "technology_used",
        as: "category",
      });
      AnnualBusinessPlan.belongsTo(models.Mytable, {
        foreignKey: "location",
        targetKey: "areaname",
        as: "areaDetails",
      });
    }
  }
  AnnualBusinessPlan.init(
    {
      emp_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      associate_id: DataTypes.INTEGER,
      contact_person_id: DataTypes.INTEGER,
      project_name: DataTypes.STRING,
      area_mtr2: DataTypes.FLOAT,
      buisness_potential: DataTypes.FLOAT,
      technology_used: DataTypes.STRING,
      for_month: DataTypes.INTEGER,
      location: DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AnnualBusinessPlan",
      tableName: "annual_business_plan",
    }
  );
  return AnnualBusinessPlan;
};
