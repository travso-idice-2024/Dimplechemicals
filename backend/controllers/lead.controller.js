const { Op, Sequelize, fn ,col} = require("sequelize");
const { Lead, Customer, User } = require("../models"); // Import models
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const addLead = async (req, res) => {
  try {
    const lead_owner_id = req.user.id;
    const {
      customer_id,
      assigned_person_id,
      lead_source,
      lead_status,
      assign_date,
      lead_summary,
      lead_address,
    } = req.body;

    // Check if required fields are provided
    if (
      !customer_id ||
      !lead_owner_id ||
      !lead_source ||
      !lead_status ||
      !assigned_person_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    // Validate customer
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // Validate lead owner
    const leadOwner = await User.findByPk(lead_owner_id);
    if (!leadOwner) {
      return res
        .status(404)
        .json({ success: false, message: "Lead owner not found." });
    }

    // Validate assigned person
    const assignedPerson = await User.findByPk(assigned_person_id);
    if (!assignedPerson) {
      return res
        .status(404)
        .json({ success: false, message: "Assigned person not found." });
    }

    // ✅ Check if a lead is already assigned to the same salesperson for this customer
    const existingLead = await Lead.findOne({
      where: {
        customer_id,
        assigned_person_id,
      },
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message:
          "This customer is already assigned to the selected salesperson.",
      });
    }

    // Create the lead entry
    const newLead = await Lead.create({
      customer_id,
      lead_owner_id,
      assigned_person_id,
      lead_source,
      lead_status,
      assign_date: assign_date || new Date(),
      lead_summary,
      lead_address,
    });

    res.status(201).json({
      success: true,
      message: "Lead added successfully",
      data: newLead,
    });
  } catch (error) {
    console.error("Error adding lead:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params; // Get lead ID from URL
    const lead_owner_id = req.user.id; // Authenticated user ID
    const {
      customer_id,
      assigned_person_id,
      lead_source,
      lead_status,
      assign_date,
      lead_summary,
      last_contact,
      next_followup,
      product_service,
      product_detail,
      quantity,
      quantity_no,
      special_requirement,
      who_contact_before,
      last_communication,
      follow_up_record,
      active_status,
      budget,
      budget_status,
      lead_address,
      lead_custom_address,
    } = req.body;

    // ✅ Find the existing lead
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found." });
    }

    // ✅ Validate customer
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // ✅ Validate lead owner
    const leadOwner = await User.findByPk(lead_owner_id);
    if (!leadOwner) {
      return res
        .status(404)
        .json({ success: false, message: "Lead owner not found." });
    }

    // ✅ Validate assigned person
    const assignedPerson = await User.findByPk(assigned_person_id);
    if (!assignedPerson) {
      return res
        .status(404)
        .json({ success: false, message: "Assigned person not found." });
    }

    // ✅ Update lead details
    await lead.update({
      customer_id,
      lead_owner_id,
      assigned_person_id,
      lead_source,
      lead_status,
      assign_date,
      lead_summary,
      last_contact,
      next_followup,
      product_service,
      product_detail,
      quantity,
      quantity_no,
      special_requirement,
      who_contact_before,
      last_communication,
      follow_up_record,
      budget,
      budget_status,
      active_status,
      lead_address,
      lead_custom_address,
    });

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLeadList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", all } = req.query;

    // Base filter with default active_status
    let whereCondition = {
      active_status: "active", // ✅ Default condition applied
    };

    // Unified Search (Across multiple fields)
    if (search) {
      whereCondition[Op.or] = [
        { "$customer.company_name$": { [Op.like]: `%${search}%` } },
        { "$customer.client_name$": { [Op.like]: `%${search}%` } },
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } },
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },
        { lead_source: { [Op.like]: `%${search}%` } },
      ];
    }

    // Fetch all leads if "all=true" (no pagination)
    if (all === "true") {
      const leads = await Lead.findAll({
        where: whereCondition,
        attributes: { exclude: [] }, // Fetches all attributes
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["id", "company_name", "client_name"],
          },
          { model: User, as: "leadOwner", attributes: ["fullname"] },
          { model: User, as: "assignedPerson", attributes: ["id", "fullname"] },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({ success: true, data: leads });
    }

    // Convert page & limit to integers for pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // Fetch paginated leads
    const { count, rows } = await Lead.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      attributes: { exclude: [] }, // Fetches all attributes
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "company_name", "client_name"],
        },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["id", "fullname"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeLead = async (req, res) => {
  const { id } = req.params;
  const active_status = "deactive"; // Set to "deactive"

  try {
    // Check if the lead exists
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    // Update active_status
    lead.active_status = active_status;
    await lead.save();

    res.json({ success: true, message: "Lead removed successfully", lead });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating lead status",
        error: error.message,
      });
  }
};

//sales persion api's
const getTodaysAssignedLeadsCount = async (req, res) => {
  try {
    // ✅ Debugging
    //console.log("Logged-in User:", req.user);

    // ✅ Check if the user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const assigned_person_id = req.user.id;

    // ✅ Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];
    //console.log("Today's Date (for comparison):", todayDate);

    // ✅ Count leads where assign_date matches today's date
    const assignedLeadsCount = await Lead.count({
      where: {
        assigned_person_id,
        [Op.and]: Sequelize.where(
          Sequelize.fn("DATE", Sequelize.col("assign_date")),
          "=",
          todayDate
        ),
      },
    });

    // ✅ Send the response
    res.status(200).json({
      success: true,
      message: "Today's assigned leads count fetched successfully",
      assignedLeadsCount,
    });
  } catch (error) {
    console.error("Error fetching today's assigned leads count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching today's assigned leads count",
      error: error.message,
    });
  }
};

const getTodayLeads = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const assigned_person_id = req.user.id; // Get logged-in user's ID
    const { page = 1, limit = 10, search = "" } = req.query;

    // ✅ Convert page & limit to integers for pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // ✅ Base condition (fetch only leads assigned to the logged-in user)
    let whereCondition = { assigned_person_id };

    // ✅ Search filter (across multiple fields)
    if (search) {
      whereCondition[Op.or] = [
        { "$customer.company_name$": { [Op.like]: `%${search}%` } },
        { "$customer.client_name$": { [Op.like]: `%${search}%` } },
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } },
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },
        { lead_source: { [Op.like]: `%${search}%` } },
        { assign_date: { [Op.like]: `%${search}%` } },
        { createdAt: { [Op.like]: `%${search}%` } },
      ];
    }

    // ✅ Fetch paginated leads assigned to the logged-in user with all fields
    const { count, rows } = await Lead.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["company_name", "client_name"],
        },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["fullname"] },
      ],
      order: [["assign_date", "DESC"]], // ✅ Sort by latest assigned leads first
    });

    res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving leads",
      error: error.message,
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const { id } = req.params; // Get lead ID from request parameters

    // ✅ Fetch the lead by ID (including related data)
    const lead = await Lead.findOne({
      where: { id },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["company_name", "client_name"],
        },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["fullname"] },
      ],
    });

    // ✅ If no lead is found
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({
      success: true,
      message: "Lead retrieved successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving lead",
      error: error.message,
    });
  }
};

const getAllUsersTodaysLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // ✅ Convert page & limit to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // ✅ Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];

    // ✅ Base where condition (filtering only today's leads)
    let whereCondition = {
      [Op.and]: [Sequelize.where(fn("DATE", col("assign_date")), todayDate)],
    };

    // ✅ If search exists, apply search filter across multiple fields
    if (search) {
      whereCondition[Op.or] = [
        { "$customer.company_name$": { [Op.like]: `%${search}%` } },
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } },
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } },
        { lead_source: { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },
      ];
    }

    // ✅ Fetch paginated & filtered leads
    const { count, rows: leads } = await Lead.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["company_name","email_id","primary_contact"],
        },
        {
          model: User,
          as: "leadOwner",
          attributes: ["fullname"],
        },
        {
          model: User,
          as: "assignedPerson",
          attributes: ["fullname", "email", "phone"],
        },
      ],
      order: [["assign_date", "DESC"]],
      limit: pageSize,
      offset,
    });

    res.status(200).json({
      success: true,
      data: leads,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const exportTodaysLeadsToExcel = async (req, res) => {
  try {
   
    // ✅ Generate timestamp for file name
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    
    // ✅ Ensure export directory exists
    const exportPath = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
      console.log("📁 Export directory created:", exportPath);
    } else {
      console.log("📁 Export directory already exists:", exportPath);
    }

    // ✅ Define Excel file path
    const filePath = path.join(exportPath, `Todays_Leads_Report_${timestamp}.xlsx`);

    // ✅ Create a new workbook & worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Today's Leads Report");
   
    // ✅ Define Headers (Including Extra Fields)
    worksheet.columns = [
      { header: "Lead ID", key: "id", width: 10 },
      { header: "Company Name", key: "company_name", width: 30 },
      { header: "Lead Source", key: "lead_source", width: 20 },
      { header: "Status", key: "lead_status", width: 20 },
      { header: "Lead Owner", key: "lead_owner", width: 20 },
      { header: "Assigned Person", key: "assigned_person", width: 20 },
      { header: "Assign Date", key: "assign_date", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
    ];
    // ✅ Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];

    // ✅ Fetch Today's Leads from DB
   
    const leads = await Lead.findAll({
      where: {
        [Op.and]: [Sequelize.where(fn("DATE", col("assign_date")), todayDate)],
      },
      include: [
        { model: Customer, as: "customer", attributes: ["company_name"] },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["fullname", "email", "phone"] },
      ],
      order: [["assign_date", "DESC"]],
    });

    // ✅ Add data to Excel file//console.log("📝 Adding data to Excel...");
    leads.forEach((lead, index) => {
      worksheet.addRow({
        id: lead.id,
        company_name: lead.customer?.company_name || "N/A",
        lead_source: lead.lead_source,
        lead_status: lead.lead_status,
        lead_owner: lead.leadOwner?.fullname || "N/A",
        assigned_person: lead.assignedPerson?.fullname || "N/A",
        assign_date: lead.assign_date,
        email: lead.assignedPerson?.email || "N/A",
        phone: lead.assignedPerson?.phone || "N/A",
      });

      if (index < 5) console.log(`Sample Data Row ${index + 1}:`, lead.toJSON());
    });

    // ✅ Save Excel file
   
    await workbook.xlsx.writeFile(filePath);
   
    res.download(filePath, "Todays_Leads_Report.xlsx", (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error downloading file" });
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error exporting today's leads", error: error.message});
  }
};


const getAllLeads = async (req, res) => {
  try {
   
    const { search = "", lead_status, lead_source, start_date, end_date ,leadOwner, customer} = req.query;

    let whereCondition = {};

    if (lead_status) {
      whereCondition.lead_status = lead_status;
    }

    if (lead_source) {
      whereCondition.lead_source = lead_source;
    }

    if (start_date && end_date) {
      whereCondition.assign_date = {
        [Op.between]: [start_date, end_date], 
      };
    } else if (start_date) {
      whereCondition.assign_date = { [Op.gte]: start_date }; 
    } else if (end_date) {
      whereCondition.assign_date = { [Op.lte]: end_date }; // Less than or equal to end_date
    }

     // let leadOwnerCondition = {};
      if (leadOwner) {
        whereCondition.lead_owner_id  = leadOwner;
      }

      if (customer) {
        whereCondition.customer_id   = customer;
      }

    if (search) {
      whereCondition[Op.or] = [
        { lead_source: { [Op.like]: `%${search}%` } }, // Search by Lead Source
        { lead_status: { [Op.like]: `%${search}%` } }, // Search by Lead Status
        { "$customer.company_name$": { [Op.like]: `%${search}%` } }, // Search by Company Name
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } }, // Search by Lead Owner
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } }, // Search by Assigned Person
      ];
    }

    
    const { count, rows } = await Lead.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["company_name","address","email_id","primary_contact"],
        },
        {
          model: User,
          as: "leadOwner",
          attributes: ["fullname"],
        },
        {
          model: User,
          as: "assignedPerson",
          attributes: ["fullname"],
        },
      ],
      order: [["assign_date", "DESC"]],
    });

  
    res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: rows,
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving leads",
      error: error.message,
    });}
};


const exportLeadsToExcel = async (req, res) => {
  try {
    const { search = "", lead_status="", lead_source="", start_date="", end_date="", leadOwner="", customer="" } = req.query;

    let whereCondition = {};

    if (lead_status) {
      whereCondition.lead_status = lead_status;
    }

    if (lead_source) {
      whereCondition.lead_source = lead_source;
    }

    if (start_date && end_date) {
      whereCondition.assign_date = {
        [Op.between]: [start_date, end_date],
      };
    } else if (start_date) {
      whereCondition.assign_date = { [Op.gte]: start_date };
    } else if (end_date) {
      whereCondition.assign_date = { [Op.lte]: end_date };
    }

    if (leadOwner) {
      whereCondition.lead_owner_id  = leadOwner;
    }

    if (customer) {
      whereCondition.customer_id   = customer;
    }

    if (search) {
      whereCondition[Op.or] = [
        { lead_source: { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },
        { "$customer.company_name$": { [Op.like]: `%${search}%` } },
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } },
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } },
      ];
    }

    // Fetch leads with applied filters
    const leads = await Lead.findAll({
      where: whereCondition,
      include: [
        { model: Customer, as: "customer", attributes: ["company_name"] },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["fullname"] },
      ],
      order: [["assign_date", "DESC"]],
    });

    // Prepare file path
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const exportPath = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }
    const filePath = path.join(exportPath, `Leads_Report_${timestamp}.xlsx`);

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Leads Report");

    worksheet.columns = [
      { header: "Lead ID", key: "id", width: 10 },
      { header: "Company Name", key: "company_name", width: 30 },
      { header: "Lead Source", key: "lead_source", width: 20 },
      { header: "Status", key: "lead_status", width: 20 },
      { header: "Lead Owner", key: "lead_owner", width: 20 },
      { header: "Assigned Person", key: "assigned_person", width: 20 },
      { header: "Assign Date", key: "assign_date", width: 20 },
    ];

    leads.forEach((lead, index) => {
      worksheet.addRow({
        id: lead.id,
        company_name: lead.customer?.company_name || "N/A",
        lead_source: lead.lead_source,
        lead_status: lead.lead_status,
        lead_owner: lead.leadOwner?.fullname || "N/A",
        assigned_person: lead.assignedPerson?.fullname || "N/A",
        assign_date: lead.assign_date ? lead.assign_date.toISOString().split("T")[0] : "N/A",
      });

      if (index < 5) console.log(`Sample Data Row ${index + 1}:`, lead.toJSON());
    });

    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, `Leads_Report_${timestamp}.xlsx`, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error downloading file" });
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error exporting leads", error: error.message});
  }
};

module.exports = {
  addLead,
  getLeadList,
  removeLead,
  updateLead,
  getTodaysAssignedLeadsCount,
  getTodayLeads,
  getLeadById,
  getAllUsersTodaysLeads,
  exportTodaysLeadsToExcel,
  getAllLeads,
  exportLeadsToExcel
};
