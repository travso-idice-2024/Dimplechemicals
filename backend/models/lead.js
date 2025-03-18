'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relationship with Customers table
    Lead.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customer_id', onDelete: 'CASCADE' });

    // Relationship with Users table for lead owner
    Lead.belongsTo(models.User, { as: 'leadOwner', foreignKey: 'lead_owner_id', onDelete: 'CASCADE' });

    // Relationship with Users table for assigned person
    Lead.belongsTo(models.User, { as: 'assignedPerson', foreignKey: 'assigned_person_id', onDelete: 'SET NULL' });
    

    }
  }
  Lead.init({
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
  }, {
    sequelize,
    modelName: 'Lead',
    tableName: "Leads",
    timestamps: true, // Includes createdAt and updatedAt automatically
    
  });
  return Lead;
};