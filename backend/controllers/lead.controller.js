const { Op, Sequelize, fn ,col,literal} = require("sequelize");
const { Lead, Customer, User, sequelize, CheckinCheckout, CostWorking, Product, CostWorkingProduct,LeadAssignedHistory,dealData,LeadCommunication,CustomerContactPerson } = require("../models");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const moment = require("moment"); 


// const addLead = async (req, res) => {
//   try {
//     const lead_owner_id = req.user.id;
//     const {
//       customer_id,
//       assigned_person_id,
//       lead_source,
//       lead_status,
//       assign_date,
//       lead_summary,
//       last_contact,
//       next_followup,
//       product_service,
//       product_detail,
//       quantity,
//       quantity_no,
//       special_requirement,
//       who_contact_before,
//       last_communication,
//       follow_up_record,
//       budget,
//       lead_address,
//       reference_name,
//     } = req.body;

//     // Check if required fields are provided
//     if (
//       !customer_id ||
//       !lead_owner_id ||
//       !lead_source ||
//       !lead_status ||
//       !assigned_person_id
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields." });
//     }

//     // Validate customer
//     const customer = await Customer.findByPk(customer_id);
//     if (!customer) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Customer not found." });
//     }

//     // Validate lead owner
//     const leadOwner = await User.findByPk(lead_owner_id);
//     if (!leadOwner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Lead owner not found." });
//     }

//     // Validate assigned person
//     const assignedPerson = await User.findByPk(assigned_person_id);
//     if (!assignedPerson) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Assigned person not found." });
//     }

//     // ✅ Check if a lead is already assigned to the same salesperson for this customer
//     const existingLead = await Lead.findOne({
//       where: {
//         customer_id,
//         assigned_person_id,
//       },
//     });

//     if (existingLead) {
//       return res.status(409).json({
//         success: false,
//         message:
//           "This customer is already assigned to the selected salesperson.",
//       });
//     }

//     // Create the lead entry
//     const newLead = await Lead.create({
//       customer_id,
//       lead_owner_id,
//       assigned_person_id,
//       lead_source,
//       lead_status,
//       assign_date: assign_date || new Date(),
//       lead_summary,
//       last_contact,
//       next_followup,
//       product_service,
//       product_detail,
//       quantity,
//       quantity_no,
//       special_requirement,
//       who_contact_before,
//       last_communication,
//       follow_up_record,
//       budget,
//       lead_address,
//       reference_name
//     });

//     res.status(201).json({
//       success: true,
//       message: "Lead added successfully",
//       data: newLead,
//     });
//   } catch (error) {
//     console.error("Error adding lead:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const addLead = async (req, res) => {
  try {
    const lead_owner_id = req.user.id;
    const {
      customer_id,
      assigned_person_id,
      assign_date,
      lead_summary,
      lead_source,
      lead_status,
      reference_name,
      meeting_type,
      meeting_time,
      lead_address,
      contact_person_name,
      product_ids,
    } = req.body;

    // Validate required fields
    if (!customer_id || !assigned_person_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Validate customer
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // Validate assigned person
    const assignedPerson = await User.findByPk(assigned_person_id);
    if (!assignedPerson) {
      return res
        .status(404)
        .json({ success: false, message: "Assigned person not found." });
    }

    // Optional: Prevent duplicate leads
    // const existingLead = await Lead.findOne({
    //   where: { customer_id, assigned_person_id },
    // });
    // if (existingLead) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "This customer is already assigned to the selected salesperson.",
    //   });
    // }

    const newLead = await Lead.create({
      customer_id,
      assigned_person_id,
      lead_owner_id,
      assign_date: assign_date || new Date(),
      lead_source,
      lead_status,
      reference_name,
      lead_summary,
      meeting_type,
      meeting_time,
      lead_address,
      contact_person_name,
    });

    if (Array.isArray(product_ids) && product_ids.length > 0) {
      const dealDataPayload = product_ids.map((product_id) => ({
        lead_id: newLead.id,
        product_id,
      }));
      await dealData.bulkCreate(dealDataPayload);
    }

    res.status(201).json({
      success: true,
      message: "Record added successfully",
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
      reference_name,
    } = req.body;

    // ✅ Find the existing lead
    const lead = await Lead.findByPk(id)
;
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
      reference_name,
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
    //console.log("userrole",req.user.userrole);
    const { page = 1, limit = 5, search = "", all } = req.query;

    const userId = req.user?.id;
    const userRole = req.user?.userrole;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized"});
    } 

    // Base filter with default active_status
    let whereCondition = {
      //assigned_person_id: userId,
      active_status: "active", // ✅ Default condition applied
    };

     // Non-admin users see only their assigned leads
     if (userRole !== 1) {
      whereCondition.assigned_person_id = userId;
    }

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
           // attributes: ["id", "company_name", "client_name"],
          },
          { model: User, as: "leadOwner", attributes: ["fullname"] },
          { model: User, as: "assignedPerson", attributes: ["id", "fullname"] },
          {
            model: CustomerContactPerson,
            as: "contactPerson",
            attributes: ["name"],
          },
          {
            model: LeadAssignedHistory,
            as: "assignmentHistory", // ✅ Use the alias you defined in association
            include: [
              {
                model: User,
                as: "assignedPerson", // Same alias as in the association above
                attributes: ["fullname"],
              },
          ],
        },
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
          //attributes: ["id", "company_name", "client_name"],
        },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["id", "fullname"] },
        {
          model: CustomerContactPerson,
          as: "contactPerson",
          attributes: ["name"],
        },
        {
          model: LeadAssignedHistory,
          as: "assignmentHistory", // ✅ Use the alias you defined in association
          include: [
            {
              model: User,
              as: "assignedPerson", // Same alias as in the association above
              attributes: ["fullname"],
            },
         ],
        },
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

const getleadaftermeeting = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    const assigned_person_id = req.user.id;
    const customerId = req.params.id;

    const userId = req.user.id;

    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const leads = await Lead.findAndCountAll({
      where: {
        customer_id: customerId,
        ...(userId !== 33 && { assigned_person_id: userId }),
        active_status: "active",   // ✅ added this condition here
        ...(search && {
          [Op.or]: [
            { assign_date: { [Op.like]: `%${search}%` } },
            { lead_status: { [Op.like]: `%${search}%` } },
          ],
        }),
      },
      include: [
        {
          model: Customer,
          as: "customer",
        },
        { model: User, as: "assignedPerson", attributes: ["fullname"] },
        {
          model: CustomerContactPerson,
          as: "contactPerson",
          attributes: ["name"],
        },
        {
          model: LeadAssignedHistory,
          as: "assignmentHistory",
          include: [
            {
              model: User,
              as: "assignedPerson",
              attributes: ["fullname"],
            },
          ],
        },
        {
          model: LeadCommunication,
          as: "communications",
          where: {
            end_meeting_time: { [Op.ne]: null },
          },
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: leads.rows,
      total: leads.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(leads.count / limit),
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

const getTodayAssignedLeads = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const leads = await Lead.findAll({
      where: {
        assign_date: { [Op.gte]: today },
      },
      include: [
        {
          model: User,
          as: "assignedPerson",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: User,
          as: "leadOwner",
        },
        {
          model: CostWorking,
          as: "costWorking",
          separate: true,
          attributes: [
            "id",
            "total_application_labour_cost",
            "total_project_cost",
            "total_material_cost"
          ],
          limit: 1,
          order: [["createdAt", "DESC"]],
          required: false,
          include: [
            {
              model: CostWorkingProduct,
              as: "costWorkingProducts",
              include: [
                {
                  model: Product,
                  as: "product",
                  attributes: ["product_name"], // only fetch name
                },
              ],
            },
          ],
        },
        {
          model: CheckinCheckout,
          as: "checkinCheckouts",
          where: {
            data: {
              [Op.gte]: today,
            },
          },
          required: false,
        },
        {
          model: Customer,
          as: "customer",
        },
      ],
      order: [["assign_date", "DESC"]],
    });

    // Group by assigned person
    const grouped = {};

    leads.forEach((lead) => {
      const assignedId = lead.assigned_person_id;
    
      if (!grouped[assignedId]) {
        grouped[assignedId] = {
          assigned_person: lead.assignedPerson,
          lead_count: 0,
          leads: [],
        };
      }
      const costWorkings = lead.costWorking || [];

      costWorkings.forEach((cw) => {
        const {
          total_application_labour_cost = 0,
          total_project_cost = 0,
          total_material_cost = 0,
        } = cw;
      
        cw.dataValues.total_cost_amount =
          total_application_labour_cost +
          total_project_cost +
          total_material_cost;
      
        // 🛠 Flatten product_name into each product
        cw.costWorkingProducts?.forEach((cwp) => {
          cwp.dataValues.product_name = cwp.product?.product_name || null;
          delete cwp.dataValues.product; // optional: remove nested object
        });
      });
      
      const costWorking = lead.costWorking?.[0];
      if (costWorking) {
        const {
          total_application_labour_cost = 0,
          total_project_cost = 0,
          total_material_cost = 0,
        } = costWorking;
    
        // ✅ Add total_cost_amount as a new field, not replacing the model instance
        costWorking.dataValues.total_cost_amount =
          total_application_labour_cost +
          total_project_cost +
          total_material_cost;
      }
      // ✅ Extract check_in_time from first and check_out_time from second
  const checkins = lead.checkinCheckouts;
  const firstCheckIn = checkins?.[0]?.check_in_time || null;
  const secondCheckOut = checkins?.[1]?.check_out_time || null;

  // 🧪 Add only those two as final output
  lead.dataValues.first_check_in_time = firstCheckIn;
  lead.dataValues.second_check_out_time = secondCheckOut;

  // Optional: remove full checkinCheckouts array if you don't need it
  delete lead.dataValues.checkinCheckouts;
    
      grouped[assignedId].lead_count += 1;
      grouped[assignedId].leads.push(lead);
    });
    

    const result = Object.values(grouped);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching assigned leads:", error);
    res.status(500).json({ message: "Server Error"});
}
};

const updateDealFinalised = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    lead.deal_finalised = true; // or 1
    await lead.save();

    res.json({
      success: true,
      message: "Deal finalised successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating deal_finalised:", error);
    res.status(500).json({ success: false, message: "Server error"});
  }
};

const getFinalisedDeals = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {
      deal_finalised: 1,
    };

    // Apply search if provided
    if (search) {
      whereClause[Op.or] = [
        { '$customer.name$': { [Op.like]: `%${search}%` } },
        { '$assignedPerson.fullname$': { [Op.like]: `%${search}%` } },
        { '$leadOwner.fullname$': { [Op.like]: `%${search}%` } }
      ];
    }

    const { rows: leads, count: total } = await Lead.findAndCountAll({
      where: whereClause,
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
 
              FROM leadcommunications AS lc 
              WHERE lc.lead_id = Lead.id
            )`),
            'VisitCount'
          ]
        ]
      },
      include: [
        {
          model: User,
          as: "assignedPerson",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: User,
          as: "leadOwner",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: Customer,
          as: "customer",
        },
      ],
      order: [["updatedAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: parseInt(page)
,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching finalised deals:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const addDealData = async (req, res) => {
  try {
    const { lead_id , deals } = req.body;

    //console.log("deals", deals);
    
    if (!lead_id || !Array.isArray(deals) || deals.length === 0) {
      return res.status(400).json({
        success: false,
        message: "lead_id and at least one deal item are required.",
      });
    }

    const leadExists = await Lead.findByPk(lead_id);
    if (!leadExists) {
      return res.status(404).json({
        success: false,
        message: "Invalid lead_id: Lead not found",
      });
    }

    const updatedDeals = [];

    for (const deal of deals) {
      const [existingDeal, created] = await dealData.findOrCreate({
        where: { lead_id, product_id: deal.product_id },
        defaults: {
          date: deal?.date || null,
          area: deal.area,
          quantity: deal?.quantity || null,
          rate: deal?.rate || null,
          amount: deal?.amount || null,
          advance_amount: deal.advance_amount || null
        },
      });

      if (!created) {
        // If deal already exists, update it
        await existingDeal.update({
          date: deal?.date || null,
          area: deal.area,
          quantity: deal?.quantity || null,
          rate: deal.rate || null,
          amount: deal.amount || null,
          advance_amount: deal.advance_amount || null
        });
      }

      updatedDeals.push(existingDeal);
    }

    res.status(200).json({
      success: true,
      message: "Deal data updated successfully",
      data: updatedDeals,
    });
  } catch (error) {
    console.error("Error updating deal data:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// const getDealData = async (req, res) => {
//   try {
//     const leads = await Lead.findAll({
//       include: [
//         {
//           model: Customer,
//           as: 'customer',
//           attributes: ['company_name'],
//         },
//         {
//           model: dealData,
//           as: 'deals',
//           attributes: [
//             'id',
//             'lead_id',
//             'product_id',
//             'area',
//             'quantity',
//             'rate',
//             'amount',
//             'advance_amount',
//             'deal_amount',
//             'deal_code',
//             'date',
//           ],
//           include: [
//             {
//               model: Product,
//               as: 'product',
//               attributes: ['product_name'],
//             },
//           ],
//         },
//       ],
//     });

//     const result = leads.map((lead) => {
//       const firstDeal = lead.deals[0] || {};
//       return {
//         lead_id: lead.id,
//         company_name: lead.customer?.company_name || null,
//         advance_amount: firstDeal.advance_amount || null,
//         deal_amount: firstDeal.deal_amount || null,
//         product_name: firstDeal.product?.product_name || null,
//         deals: lead.deals.map((deal) => ({
//           ...deal.toJSON(),
//           product_name: deal.product?.product_name || null,
//         })),
//       };
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Grouped deal data fetched successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.error('Error fetching grouped deal data:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//     });
//   }
// };


const getDealData = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['company_name'],
        },
        {
          model: dealData,
          as: 'deals',
          attributes: [
            'id',
            'lead_id',
            'product_id',
            'area',
            'quantity',
            'rate',
            'amount',
            'advance_amount',
            'deal_amount',
            'deal_code',
            'date',
          ],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['product_name'],
            },
          ],
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    const result = leads.map((lead) => {
      // Sum total deal_amount and advance_amount for this lead's deals
      const total_deal_amount = lead.deals.reduce((sum, deal) => sum + (deal.amount || 0), 0);
      const total_advance_amount = lead.deals.reduce((sum, deal) => sum + (deal.advance_amount || 0), 0);

      return {
        lead_id: lead.id,
        company_name: lead.customer?.company_name || null,
        total_deal_amount,
        total_advance_amount,
        deals: lead.deals.map((deal) => ({
          ...deal.toJSON(),
          product_name: deal.product?.product_name || null,
        })),
      };
    });

    res.status(200).json({
      success: true,
      message: 'Grouped deal data fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error fetching grouped deal data:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


const countTotalLeads = async (req, res) => {
  try {
    const totalLeads = await Lead.count();
    res.json({
      success: true,
      totalLeads,
    });
  } catch (error) {
    console.error("Error counting total leads:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const addProductsToLead = async (req, res) => {
  try {
    const { lead_id, product_ids } = req.body;

    if (!lead_id || !Array.isArray(product_ids) || product_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "lead_id and product_ids[] are required.",
      });
    }

    const lead = await Lead.findByPk(lead_id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    const existing = await dealData.findAll({
      where: { lead_id },
      attributes: ['product_id'],
    });

    const existingProductIds = existing.map((item) => item.product_id);
    const newProductIds = product_ids.filter(
      (id) => !existingProductIds.includes(id)
    );

    if (newProductIds.length === 0) {
      return res.status(409).json({
        success: false,
        message: "All provided products already exist for this lead.",
      });
    }

    const dealDataPayload = newProductIds.map((product_id) => ({
      lead_id,
      product_id,
    }));

    await dealData.bulkCreate(dealDataPayload);

    res.status(201).json({
      success: true,
      message: "Products added to lead successfully.",
      data: dealDataPayload,
    });
  } catch (error) {
    console.error("Error adding products to lead:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLeadListofAll = async (req, res) => {
  try {
    // Get today's date range (00:00 to 23:59)
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const leads = await Lead.findAll({
      where: {
        assign_date: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
      attributes: [
        "id",
        "lead_source",
        "lead_status",
        "assign_date",
        "createdAt",
      ],
      include: [
        {
          model: Customer,
          as: "customer",
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
        {
          model: LeadAssignedHistory,
          as: "assignmentHistory",
          include: [
            {
              model: User,
              as: "assignedPerson",
              attributes: ["fullname"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: leads,
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
  exportLeadsToExcel,
  getTodayAssignedLeads,
  updateDealFinalised,
  getFinalisedDeals,
  addDealData,
  getDealData,
  countTotalLeads,
  getleadaftermeeting,
  addProductsToLead,
  getLeadListofAll
};
