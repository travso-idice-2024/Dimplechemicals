'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CostWorking extends Model {
    static associate(models) {
      // Define associations here (if needed)
      CostWorking.hasMany(models.CostWorkingProduct, { 
        foreignKey: "cost_working_id", 
        as: "products" 
      });
      CostWorking.belongsTo(models.Customer, {
        foreignKey: "company_name",
        as: "company",
      });
    }
  }

  CostWorking.init({
    company_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nature_of_work: {
      type: DataTypes.STRING,
      allowNull: true
    },
    technology_used: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estimate_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estimate_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    revision_no: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    revision_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    area_to_be_coated: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    thickness_in_mm: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    labour_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cunsumable_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    transport_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supervision_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contractor_profit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    over_head_charges: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_application_labour_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_project_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_material_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cr_id: {
      type: DataTypes.INTEGER,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'CostWorking',
    tableName: 'cost_workings',
    timestamps: true
  });

  return CostWorking;
  
};
