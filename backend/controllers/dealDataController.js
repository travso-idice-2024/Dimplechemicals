const { dealData, Product } = require('../models'); // Adjust path as necessary
const { Op } = require('sequelize');

const getLeadProducts = async (req, res) => {
  try {
    const { lead_id } = req.params;

    //console.log("lead_id", lead_id);

    if (!lead_id) {
      return res.status(400).json({
        success: false,
        message: 'lead_id is required',
      });
    }

    const products = await dealData.findAll({
      where: { lead_id },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['product_name'], // Only fetch product_name
        },
      ],
      // No need to specify attributes in dealData to get all columns
    });

    const productNames = products.map(item => ({
      ...item.toJSON(), // includes all dealData fields
      product_name: item.product?.product_name || null, // append product_name
    }));
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: productNames,
    });
  } catch (error) {
    console.error('Error fetching product names:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = { getLeadProducts };
