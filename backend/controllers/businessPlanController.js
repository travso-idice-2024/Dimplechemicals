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

    const existingPlan = await AnnualBusinessPlan.findOne({
      where: {
        emp_id,
        customer_id,
        for_month,
      },
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message:
          "This report is already created for the selected employee and customer in the given month.",
      });
    }

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

exports.getAnnualBusinessPlanList = async (req, res) => {
  try {
    const empId = req.user.id;
    const roleId = req.user.userrole;
    const {
      page = 1,
      limit = 10,
      search = "",
      monthWise,
      anu_emp_id,
    } = req.query;
    console.log("anu_emp_id", anu_emp_id);
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (monthWise) {
      whereClause.for_month = Number(monthWise);
    }

    if (anu_emp_id) {
      whereClause.emp_id = Number(anu_emp_id);
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
                attributes: [
                  "product_name",
                  ["category_id", "technology_used"],
                ],
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

    // if (roleId === 1) {
    //   // Total unique employee count
    //   const totalGroups = await AnnualBusinessPlan.count({
    //     where: whereClause,
    //     distinct: true,
    //     col: "emp_id",
    //   });

    //   // Paginated emp_ids
    //   const groupEmpIds = await AnnualBusinessPlan.findAll({
    //     attributes: ["emp_id"],
    //     where: whereClause,
    //     group: ["emp_id"],
    //     order: [
    //       [sequelize.literal("MAX(AnnualBusinessPlan.createdAt)"), "DESC"],
    //     ],
    //     limit: parseInt(limit),
    //     offset: parseInt(offset),
    //   });

    //   if (!groupEmpIds.length) {
    //     return res.status(200).json({
    //       success: true,
    //       message: "No business plans found",
    //       currentPage: parseInt(page),
    //       totalPages: Math.ceil(totalGroups / limit),
    //       totalRecords: totalGroups,
    //       data: [],
    //     });
    //   }

    //   const data = await Promise.all(
    //     groupEmpIds.map(async (group) => {
    //       const empId = group.emp_id;

    //       // Get one latest business plan record for this emp_id (keeping old includes)
    //       const singlePlan = await AnnualBusinessPlan.findOne({
    //         where: { ...whereClause, emp_id: empId },
    //         include: [
    //           {
    //             model: User,
    //             as: "employee",
    //             attributes: ["id", "username", "email", "emp_id", "fullname"],
    //           },
    //           {
    //             model: Customer,
    //             as: "customer",
    //             attributes: ["id", "company_name", "email_id", "cust_id"],
    //           },
    //           {
    //             model: BusinessAssociate,
    //             as: "associate",
    //             attributes: [
    //               "id",
    //               "associate_name",
    //               "code",
    //               "email",
    //               "phone_no",
    //             ],
    //           },
    //           {
    //             model: CustomerContactPerson,
    //             as: "contactPerson",
    //             attributes: ["id", "name", "email", "phone_no", "designation"],
    //           },
    //           {
    //             model: BusinessPlanProduct,
    //             as: "products",
    //             include: [
    //               {
    //                 model: Product,
    //                 as: "product",
    //                 attributes: ["product_name", "category_id"],
    //               },
    //               {
    //                 model: Category,
    //                 as: "category",
    //                 attributes: ["id", "category_name"],
    //               },
    //             ],
    //           },
    //         ],
    //         order: [["createdAt", "DESC"]],
    //       });

    //       // Collect all for_month values into an array for this emp_id
    //       const allMonths = await AnnualBusinessPlan.findAll({
    //         attributes: ["for_month"],
    //         where: { ...whereClause, emp_id: empId },
    //         order: [["createdAt", "DESC"]],
    //       });

    //       const forMonths = allMonths.map((p) => p.for_month);

    //       // Inject forMonths array into singlePlan data
    //       const planData = singlePlan.toJSON();
    //       planData.for_months = forMonths;

    //       return planData;
    //     })
    //   );

    //   return res.status(200).json({
    //     success: true,
    //     message: "Business plan list retrieved successfully",
    //     currentPage: parseInt(page),
    //     totalPages: Math.ceil(totalGroups / limit),
    //     totalRecords: totalGroups,
    //     data, // same shape as before
    //   });
    // }

    if (roleId === 1) {
      // Total unique (emp_id, customer_id) count
      const totalGroupsResult = await AnnualBusinessPlan.findAll({
        attributes: [
          [sequelize.col("emp_id"), "emp_id"],
          [sequelize.col("customer_id"), "customer_id"],
        ],
        where: whereClause,
        group: ["emp_id", "customer_id"],
      });

      const totalGroups = totalGroupsResult.length;

      // Paginated (emp_id, customer_id) pairs
      const groupEmpCustIds = await AnnualBusinessPlan.findAll({
        attributes: [
          [sequelize.col("emp_id"), "emp_id"],
          [sequelize.col("customer_id"), "customer_id"],
        ],
        where: whereClause,
        group: ["emp_id", "customer_id"],
        order: [
          [sequelize.literal("MAX(AnnualBusinessPlan.createdAt)"), "DESC"],
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      if (!groupEmpCustIds.length) {
        return res.status(200).json({
          success: true,
          message: "No business plans found",
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalGroups / limit),
          totalRecords: totalGroups,
          data: [],
        });
      }

      const data = await Promise.all(
        groupEmpCustIds.map(async (group) => {
          const empId = group.emp_id;
          const custId = group.customer_id;

          // Latest business plan record for this (emp_id, customer_id) pair
          const singlePlan = await AnnualBusinessPlan.findOne({
            where: { ...whereClause, emp_id: empId, customer_id: custId },
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
                attributes: [
                  "id",
                  "associate_name",
                  "code",
                  "email",
                  "phone_no",
                ],
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
            order: [["createdAt", "DESC"]],
          });

          // Collect all for_month values for this (emp_id, customer_id)
          const allMonths = await AnnualBusinessPlan.findAll({
            attributes: ["for_month"],
            where: { ...whereClause, emp_id: empId, customer_id: custId },
            order: [["createdAt", "DESC"]],
          });

          const forMonths = allMonths.map((p) => p.for_month);

          // Attach for_months array to single plan data
          const planData = singlePlan.toJSON();
          planData.for_months = forMonths;

          return planData;
        })
      );

      return res.status(200).json({
        success: true,
        message: "Business plan list retrieved successfully",
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalGroups / limit),
        totalRecords: totalGroups,
        data, // unchanged shape
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
    res.status(500).json({ error: "Failed to update business plan" });
  }
};
