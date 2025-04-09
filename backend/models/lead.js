"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relationship with Customers table
      Lead.belongsTo(models.Customer, {
        as: "customer",
        foreignKey: "customer_id",
        onDelete: "CASCADE",
      });

      // Relationship with Users table for lead owner
      Lead.belongsTo(models.User, {
        as: "leadOwner",
        foreignKey: "lead_owner_id",
        onDelete: "CASCADE",
      });

      // Relationship with Users table for assigned person
      Lead.belongsTo(models.User, {
        as: "assignedPerson",
        foreignKey: "assigned_person_id",
        onDelete: "SET NULL",
      });
      Lead.hasMany(models.CheckinCheckout, {
        as: "checkinCheckouts",
        foreignKey: "emp_id",
        sourceKey: "assigned_person_id",
        onDelete: "SET NULL",
      });
      
      Lead.hasMany(models.CostWorking, {
        as: "costWorking",
        foreignKey: "company_name",
        sourceKey: "customer_id",
        onDelete: "CASCADE",
      });
      
      // Nested relationships using models object only
      models.CostWorking.hasMany(models.CostWorkingProduct, {
        foreignKey: "cost_working_id",
        as: "costWorkingProducts",
      });
      models.CostWorkingProduct.belongsTo(models.CostWorking, {
        foreignKey: "cost_working_id",
      });
      
      models.CostWorkingProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      models.Product.hasMany(models.CostWorkingProduct, {
        foreignKey: "product_id",
      });
    }
  }
  Lead.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "customers", key: "id" },
      },
      lead_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      assigned_person_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
      },
      lead_source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lead_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assign_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lead_summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_contact: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      next_followup: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      product_service: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      product_detail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      quantity_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      special_requirement: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      who_contact_before: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_communication: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      follow_up_record: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      active_status: {
        type: DataTypes.ENUM("active", "deactive"),
        allowNull: false,
        defaultValue: "active",
      },
      lead_address: {
        type: DataTypes.STRING,
        allowNull: true, // You can set it to false if required
      },
      lead_custom_address: {
        // New column
        type: DataTypes.STRING,
        allowNull: true,
      },
      budget_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // ✅ Allow null
        defaultValue: null, // ✅ Default is null
      },
      deal_finalised: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
     },
    },
    {
      sequelize,
      modelName: "Lead",
      tableName: "leads",
      timestamps: true, // Includes createdAt and updatedAt automatically
    }
  );
  return Lead;
};
