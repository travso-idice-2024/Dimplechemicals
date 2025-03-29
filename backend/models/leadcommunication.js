module.exports = (sequelize, DataTypes) => {
  const LeadCommunication = sequelize.define('LeadCommunication', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    lead_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    sales_persion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lead_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lead_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lead_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'leads', // The referenced table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'leadcommunications',
    timestamps: true,
  });

  LeadCommunication.associate = (models) => {
    LeadCommunication.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    //LeadCommunication.belongsTo(models.User, { foreignKey: 'lead_owner_id',  });
    LeadCommunication.belongsTo(models.User, { foreignKey: 'lead_owner_id',as: 'leadOwner' });
    LeadCommunication.belongsTo(models.User, { foreignKey: 'sales_persion_id', as: 'salesPerson' });
  };

  return LeadCommunication;
};
