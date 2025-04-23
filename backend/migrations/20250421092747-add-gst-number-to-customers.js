'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Customers', 'gst_number', {
      type: Sequelize.STRING(15),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Customers', 'gst_number');
  }
};
