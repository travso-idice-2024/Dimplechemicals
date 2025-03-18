'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
    },
    primary_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondary_contact: {
      type: DataTypes.STRING,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.STRING,
    },
    pan_no: {
      type: DataTypes.STRING,
      unique: true,
    },
    active_status: {
      type: DataTypes.ENUM("active", "deactive"),  // 👈 ENUM field
      defaultValue: "active",  // 👈 Default to "active"
    },
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: "Customers",
    timestamps: true, // Includes createdAt and updatedAt automatically
  });
  return Customer;
};