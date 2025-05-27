const { CostWorking, CostWorkingProduct, Product,Customer } = require("../models");
const { Op } = require("sequelize");

const createCostWorking = async (req, res) => {
  const {
    company_name,
    location,
    nature_of_work,
    technology_used,
    estimate_no,
    estimate_date,
    revision_date,
    area_to_be_coated,
    thickness_in_mm,
    labour_cost,
    cunsumable_cost,
    transport_cost,
    supervision_cost,
    contractor_profit,
    over_head_charges,
    total_application_labour_cost,
    total_project_cost,
    total_material_cost,
    products,
  } = req.body;

  try {
    // Step 1: Insert record with revision_no = 1
    const costWorking = await CostWorking.create({
      company_name,
      location,
      nature_of_work,
      technology_used,
      estimate_no,
      estimate_date,
      revision_no: 1, // 👈 Hardcoded to 1 for first record
      revision_date,
      area_to_be_coated,
      thickness_in_mm,
      labour_cost,
      cunsumable_cost,
      transport_cost,
      supervision_cost,
      contractor_profit,
      over_head_charges,
      total_application_labour_cost,
      total_project_cost,
      total_material_cost,
    });

    const cost_working_id = costWorking.id;

    // Step 2: Update cr_id = own id
    await costWorking.update({ cr_id: cost_working_id });

    // Step 3: Insert products
    if (products && Array.isArray(products)) {
      const productRecords = products.map((product) => ({
        cost_working_id,
        category_id:product.category_id,
        product_id: product.product_id,
        unit: product.unit,
        qty_for: product.qty_for,
        std_pak: product.std_pak,
        std_basic_rate: product.std_basic_rate,
        basic_amount: product.basic_amount,
      }));

      await CostWorkingProduct.bulkCreate(productRecords);
    }

    res.status(201).json({
      success: true,
      message: "Cost Working and Products added successfully",
      cost_working_id,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, message: "Server error", error});
  }
};

const getCostWorking = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await CostWorking.findAndCountAll({
      where: {
        [Op.or]: [
          { estimate_no: { [Op.like]: `%${search}%` } },
          { location: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: CostWorkingProduct,
          as: "products",
          include: [
            {
              model: Product, // Include product details here
              attributes: ["id", "product_name","HSN_code"], // Adjust attributes as needed
            },
          ],
        },
        {
          model: Customer,
          as: "company",
          attributes: ["id", "company_name"],
        },
      ],
      offset: parseInt(offset),
      limit: parseInt(limit),
      distinct: true,
      order: [["createdAt", "DESC"]],
    });

    // Group by cr_id and mark last one as editable
    const grouped = {};
    rows.forEach((item) => {
      const cr_id = item.cr_id;
      if (!grouped[cr_id]) {
        grouped[cr_id] = [];
      }
      grouped[cr_id].push(item);
    });

    const modifiedRows = [];

    for (const cr_id in grouped) {
      const versions = grouped[cr_id];
      const sortedVersions = versions.sort((a, b) => b.revision_no - a.revision_no);
      sortedVersions.forEach((version, index) => {
        const data = version.toJSON();
        data.edit = index === 0; // only latest version editable
        modifiedRows.push(data);
      });
    }

    res.status(200).json({
      success: true,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      data: modifiedRows,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Server error", error});
  }
};

const updateCostWorking = async (req, res) => {
  const id = req.params.id;
  const {
    company_name,
    location,
    nature_of_work,
    technology_used,
    estimate_no,
    estimate_date,
    revision_date,
    area_to_be_coated,
    thickness_in_mm,
    labour_cost,
    cunsumable_cost,
    transport_cost,
    supervision_cost,
    contractor_profit,
    over_head_charges,
    total_application_labour_cost,
    total_project_cost,
    total_material_cost,
    products,
  } = req.body;

  try {
    const previousVersion = await CostWorking.findByPk(id);
    if (!previousVersion) {
      return res.status(404).json({ success: false, message: "Cost working not found" });
    }

    const cr_id = previousVersion.cr_id;
    const latestRevision = await CostWorking.findOne({
      where: { cr_id },
      order: [['revision_no', 'DESC']],
    });

    const newRevisionNo = (latestRevision?.revision_no || 1) + 1;

    // Create new version
    const newCostWorking = await CostWorking.create({
      cr_id,
      company_name,
      location,
      nature_of_work,
      technology_used,
      estimate_no,
      estimate_date,
      revision_no: newRevisionNo,
      revision_date,
      area_to_be_coated,
      thickness_in_mm,
      labour_cost,
      cunsumable_cost,
      transport_cost,
      supervision_cost,
      contractor_profit,
      over_head_charges,
      total_application_labour_cost,
      total_project_cost,
      total_material_cost,
    });

    const cost_working_id = newCostWorking.id;

    if (products && Array.isArray(products)) {
      const productRecords = products.map((product) => ({
        cost_working_id,
        category_id:product.category_id,
        product_id: product.product_id,
        unit: product.unit,
        qty_for: product.qty_for,
        std_pak: product.std_pak,
        std_basic_rate: product.std_basic_rate,
        basic_amount: product.basic_amount,
      }));

      await CostWorkingProduct.bulkCreate(productRecords);
    }

    res.status(201).json({
      success: true,
      message: "New version created successfully",
      cost_working_id,
      revision_no: newRevisionNo,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ success: false, message: "Server error", error});
  }
 };


module.exports = {
  createCostWorking, getCostWorking ,updateCostWorking
};
