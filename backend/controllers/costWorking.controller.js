const { CostWorking, CostWorkingProduct, Product,Customer } = require("../models");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");
const path = require("path");
const fs =require("fs");

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

    const parsedRevisionDate = revision_date && !isNaN(new Date(revision_date)) ? new Date(revision_date):null;

    const toNullableNumber = (value) => {
      return value === '' || value === undefined ? null : Number(value);
    };
    
    // Step 1: Insert record with revision_no = 1
    const costWorking = await CostWorking.create({
      company_name,
      location,
      nature_of_work,
      technology_used,
      estimate_no,
      estimate_date,
      revision_no: 1,
      revision_date: parsedRevisionDate,
      area_to_be_coated: toNullableNumber(area_to_be_coated),
      thickness_in_mm: toNullableNumber(thickness_in_mm),
      labour_cost: toNullableNumber(labour_cost),
      cunsumable_cost: toNullableNumber(cunsumable_cost),
      transport_cost: toNullableNumber(transport_cost),
      supervision_cost: toNullableNumber(supervision_cost),
      contractor_profit: toNullableNumber(contractor_profit),
      over_head_charges: toNullableNumber(over_head_charges),
      total_application_labour_cost: toNullableNumber(total_application_labour_cost),
      total_project_cost: toNullableNumber(total_project_cost),
      total_material_cost: toNullableNumber(total_material_cost),
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


 const exportCostWorkingListToExcel = async (req, res) => {
  try {
    const { search = "", all = false } = req.query;

    const whereCondition = {
      [Op.or]: [
        { estimate_no: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } },
      ],
    };

    const records = await CostWorking.findAll({
      where: whereCondition,
      include: [
        {
          model: CostWorkingProduct,
          as: "products",
          include: [
            {
              model: Product,
              attributes: ["product_name", "HSN_code"],
            },
          ],
        },
        {
          model: Customer,
          as: "company",
          attributes: ["company_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const grouped = {};
    records.forEach((item) => {
      const cr_id = item.cr_id;
      if (!grouped[cr_id]) grouped[cr_id] = [];
      grouped[cr_id].push(item);
    });

    const latestVersions = [];
    for (const cr_id in grouped) {
      const sorted = grouped[cr_id].sort((a, b) => b.revision_no - a.revision_no);
      latestVersions.push(sorted[0]);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Cost Working Report");

 
    worksheet.columns = [
      { header: "Company Name", key: "company_name", width: 25 },
      { header: "Estimate No", key: "estimate_no", width: 20 },
      { header: "Estimate Date", key: "estimate_date ", width: 20 },
      { header: "Nature of Work", key: "nature_of_work ", width: 20 },
      { header: "Technology Used", key: "technology_used", width: 20 },
      { header: "Location", key: "location", width: 20 },
      { header: "Revision No", key: "revision_no", width: 15 },
      { header: "Revision Date", key: "revision_date ", width: 15 },
      { header: "Products", key: "products", width: 50 },
      { header: "Created Date", key: "created_at", width: 20 },
    ];

    latestVersions.forEach((item) => {
      worksheet.addRow({
        company_name: item.company?.company_name || "N/A",
        estimate_no: item.estimate_no || "N/A",
        estimate_date: item.estimate_date ? new Date(item.estimate_date).toLocaleDateString() : "N/A",
        nature_of_work: item.nature_of_work || "N/A",
        technology_used: item.technology_used || "N/A",
        revision_date: item.revision_date ? new Date(item.revision_date).toLocaleDateString() : "N/A",
        estimate_no: item.estimate_no,
        location: item.location,
        company_name: item.company?.company_name || "N/A",
        revision_no: item.revision_no,
        // products: item.products.map(p => `${p.product?.product_name} (${p.product?.HSN_code})`).join(", "),
        products: item.products
          .filter((p) => p.product && p.product.product_name)
          .map((p) => p.product.product_name)
        .join(","),
        created_at: item.createdAt.toLocaleDateString(),
      });
    });

    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const filePath = path.join(__dirname, `../exports/CostWorking_Report_${timestamp}.xlsx`);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, `CostWorking_Report_${timestamp}.xlsx`);
  } catch (error) {
    console.error("Export Error:", error);
    res.status(500).json({ success: false, message: "Failed to export", error: error.message});
  }
};


module.exports = {
  createCostWorking, getCostWorking ,updateCostWorking , exportCostWorkingListToExcel
};
