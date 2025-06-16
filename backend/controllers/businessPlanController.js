const {
  AnnualBusinessPlan,
  BusinessPlanProduct,
  CustomerContactPerson,
  BusinessAssociate,
  User,
  Product,
  Customer,
  Category,
  sequelize,
} = require("../models");

exports.addAnnualBusinessPlan = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      emp_id,
      customer_id,
      associate_id,
      contact_person_id,
      project_name,
      area_mtr2,
      buisness_potential,
      for_month,
      location,
      products, // array of product objects
    } = req.body;

    const plan = await AnnualBusinessPlan.create(
      {
        emp_id,
        customer_id,
        associate_id,
        contact_person_id,
        project_name,
        area_mtr2,
        buisness_potential,
        location,
        for_month,
      },
      { transaction: t }
    );

    for (const p of products) {
      await BusinessPlanProduct.create(
        {
          business_plan_id: plan.id,
          product_id: p.product_id,
          technology_used: p.technology_used,
          qty: p.qty,
          rate: p.rate,
          value_in_rs: p.value_in_rs,
          gst_amt: p.gst_amt,
          gross_sale_include_gst: p.gross_sale_include_gst,
          commission: p.commission,
          net_sale: p.net_sale,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(201).json({
      success: true,
      message: "Business plan and products added successfully",
      planId: plan.id,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: "Failed to submit business plan" });
  }
};

// exports.getAnnualBusinessPlanDetails = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const plan = await AnnualBusinessPlan.findOne({
//       where: { id },
//       include: [
//         {
//           model: User,
//           as: "employee",
//           attributes: ["id", "username", "email"], // adjust as needed
//         },
//         {
//           model: User,
//           as: "customer",
//           attributes: ["id", "username", "email"],
//         },
//         {
//           model: BusinessAssociate,
//           as: "associate",
//           attributes: ["id", "associate_name","code", "email", "phone_no"],
//         },
//         {
//           model: CustomerContactPerson,
//           as: "contactPerson",
//           attributes: ["id", "name", "email", "phone_no","designation"],
//         },
//         {
//           model: BusinessPlanProduct,
//           as: "products",
//           include: [
//             {
//               model: Product,
//               as: 'product',
//               attributes: [],
//             },
//           ],
//         },
//       ],
//     });

//     if (!plan) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Business plan not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Business plan retrieved successfully",
//       data: plan,
//     });
//   } catch (error) {
//     console.error("Error fetching plan details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve business plan",
//       error: error.message,
//     });
//   }
// };

// exports.getAnnualBusinessPlanList = async (req, res) => {
//   try {
//     const empId = req.user.id; // assuming user is authenticated and you store their ID in req.user
//     const { page = 1, limit = 20, search = "", monthWise } = req.query;

//     const offset = (page - 1) * limit;

//     const whereClause = {
//       //emp_id: empId,
//     };

//      if (monthWise) {
//        whereClause.emp_id = empId,
//        whereClause.for_month = Number(monthWise);
//      }

//     // Apply search to project_name, location, or customer name
//     if (search) {
//       whereClause[sequelize.Op.or] = [
//         { project_name: { [sequelize.Op.like]: `%${search}%` } },
//         { location: { [sequelize.Op.like]: `%${search}%` } },
//       ];
//     }

   

//     const { count, rows } = await AnnualBusinessPlan.findAndCountAll({
//       where: whereClause,
//       limit: parseInt(limit),
//       offset: parseInt(offset),
//       order: [["createdAt", "DESC"]],
//       include: [
//         {
//           model: User,
//           as: "employee",
//           attributes: ["id", "username", "email", "emp_id", "fullname"],
//         },
//         {
//           model: Customer,
//           as: "customer",
//           attributes: ["id", "company_name", "email_id", "cust_id"],
//         },
//         {
//           model: BusinessAssociate,
//           as: "associate",
//           attributes: ["id", "associate_name", "code", "email", "phone_no"],
//         },
//         {
//           model: CustomerContactPerson,
//           as: "contactPerson",
//           attributes: ["id", "name", "email", "phone_no", "designation"],
//         },

//         {
//           model: BusinessPlanProduct,
//           as: "products",
//           include: [
//             {
//               model: Product,
//               as: "product",
//               attributes: ["product_name", "category_id"],
//             },
//             {
//               model: Category,
//               as: "category",
//               attributes: ["id", "category_name"],
//             },
//           ],
//         },
//       ],
//     });

//     res.status(200).json({
//       success: true,
//       message: "Business plan list retrieved successfully",
//       currentPage: parseInt(page),
//       totalPages: Math.ceil(count / limit),
//       totalRecords: count,
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Error fetching business plans:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve business plan list",
//       error: error.message,
//     });
//   }
// };


exports.getAnnualBusinessPlanList = async (req, res) => {
  try {
    const empId = req.user.id;
    const roleId = req.user.userrole;
    const { page = 1, limit = 10, search = "", monthWise } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (monthWise) {
      whereClause.for_month = Number(monthWise);
    }

    if (roleId === 3) {
      whereClause.emp_id = empId;
    }

    if (search) {
      whereClause[Op.or] = [
        { project_name: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
      ];
    }

    // Employee view (no group)
    if (roleId === 3) {
      const { count, rows } = await AnnualBusinessPlan.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "employee",
            attributes: ["id", "username", "email", "emp_id", "fullname"],
          },
          {
            model: Customer,
            as: "customer",
            attributes: ["id", "company_name", "email_id", "cust_id"],
          },
          {
            model: BusinessAssociate,
            as: "associate",
            attributes: ["id", "associate_name", "code", "email", "phone_no"],
          },
          {
            model: CustomerContactPerson,
            as: "contactPerson",
            attributes: ["id", "name", "email", "phone_no", "designation"],
          },
          {
            model: BusinessPlanProduct,
            as: "products",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["product_name",  ["category_id", "technology_used"]  ],
              },
              {
                model: Category,
                as: "category",
                attributes: ["id", "category_name"],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        message: "Business plan list retrieved successfully",
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalRecords: count,
        data: rows,
      });
    }

    // Admin view (group by emp_id with pagination)
    if (roleId === 1) {
      // Total group count (for pagination)
      const groupCount = await AnnualBusinessPlan.findAll({
        attributes: ['emp_id'],
        where: whereClause,
        group: ['emp_id'],
      });

      const totalGroups = groupCount.length;

      // Now fetch paginated group data
      const result = await AnnualBusinessPlan.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["createdAt", "DESC"]],
        group: ['emp_id'],
        include: [
          {
            model: User,
            as: "employee",
            attributes: ["id", "username", "email", "emp_id", "fullname"],
          },
          {
            model: Customer,
            as: "customer",
            attributes: ["id", "company_name", "email_id", "cust_id"],
          },
          {
            model: BusinessAssociate,
            as: "associate",
            attributes: ["id", "associate_name", "code", "email", "phone_no"],
          },
          {
            model: CustomerContactPerson,
            as: "contactPerson",
            attributes: ["id", "name", "email", "phone_no", "designation"],
          },
          {
            model: BusinessPlanProduct,
            as: "products",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["product_name", "category_id"],
              },
              {
                model: Category,
                as: "category",
                attributes: ["id", "category_name"],
              },
            ],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        message: "Business plan list retrieved successfully",
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalGroups / limit),
        totalRecords: totalGroups,
        data: result.rows,
      });
    }

  } catch (error) {
    console.error("Error fetching business plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve business plan list",
      error: error.message,
    });
  }
};

exports.updateAnnualBusinessPlan = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params; // ID from URL
    const {
      emp_id,
      customer_id,
      associate_id,
      contact_person_id,
      project_name,
      area_mtr2,
      buisness_potential,
      for_month,
      location,
      products, // array of product objects
    } = req.body;

    // Check if the business plan exists
    const existingPlan = await AnnualBusinessPlan.findByPk(id);
    if (!existingPlan) {
      return res.status(404).json({ error: "Business plan not found" });
    }

    // Update the main plan details
    await existingPlan.update(
      {
        emp_id,
        customer_id,
        associate_id,
        contact_person_id,
        project_name,
        area_mtr2,
        buisness_potential,
        for_month,
        location,
      },
      { transaction: t }
    );

    // Delete all existing products linked to this business plan
    await BusinessPlanProduct.destroy({
      where: { business_plan_id: id },
      transaction: t,
    });

    // Create new product entries
    for (const p of products) {
      await BusinessPlanProduct.create(
        {
          business_plan_id: id,
          product_id: p.product_id,
          technology_used: p.technology_used,
          qty: p.qty,
          rate: p.rate,
          value_in_rs: p.value_in_rs,
          gst_amt: p.gst_amt,
          gross_sale_include_gst: p.gross_sale_include_gst,
          commission: p.commission,
          net_sale: p.net_sale,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(200).json({
      success: true,
      message: "Business plan updated successfully",
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: "Failed to update business plan"});
}
};

