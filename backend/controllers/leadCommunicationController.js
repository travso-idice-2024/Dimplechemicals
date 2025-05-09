const { Op } = require("sequelize");
const { LeadCommunication, Customer, Lead, User } = require("../models"); // Import the model
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

// Insert a new lead communication record
// const createLeadCommunication = async (req, res) => {
//   try {
//     const {
//       customer_id,
//       lead_owner_id,
//       client_name,
//       lead_text,
//       lead_status,
//       lead_date,
//       lead_id,
//       start_meeting_time,
//       end_meeting_time,
//       next_meeting_time,
//     } = req.body;

//     // Ensure user is authenticated
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Assign logged-in user ID to sales_persion_id
//     const sales_persion_id = req.user.id;

//     // Validate required fields
//     if (
//       !customer_id ||
//       !lead_owner_id ||
//       !client_name ||
//       !lead_text ||
//       !lead_status ||
//       !lead_date ||
//       !lead_id
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Insert record
//     const newLead = await LeadCommunication.create({
//       customer_id,
//       lead_owner_id,
//       sales_persion_id, // Automatically set from logged-in user
//       client_name,
//       lead_text,
//       lead_status,
//       lead_date,
//       lead_id,
//       start_meeting_time,
//       end_meeting_time,
//       start_meeting_time,
//       next_meeting_time,
//     });

//     res
//       .status(201)
//       .json({
//         success: true,
//         message: "Lead communication created successfully",
//         data: newLead,
//       });
//   } catch (error) {
//     console.error("Error inserting lead communication:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const createLeadCommunication = async (req, res) => {
  try {
    const {
      customer_id,
      lead_date,
      lead_id,
      start_meeting_time,
      start_location,
      lead_text,
      lead_status, 
      client_name,
      latitude,
      longitude,
      type
    } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Assign logged-in user ID to sales_persion_id
    const sales_persion_id = req.user.id;

    // Validate required fields
    if (
      !customer_id ||
      !lead_date ||
      !lead_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert record
    const newLead = await LeadCommunication.create({
      customer_id,
      sales_persion_id, // Automatically set from logged-in user
      lead_date,
      lead_id,
      start_meeting_time,
      start_location,
      lead_text,
      lead_status,
      client_name,
      latitude,
      longitude,
      type 
    });

    res
      .status(201)
      .json({
        success:true,
        message: "Meeting Started successfully",
        data: newLead,
      });
  } catch (error) {
    console.error("Error inserting lead communication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const endMeeting = async (req, res) => {
  try {
    const {
      customer_id,
      lead_date,
      lead_id,
      end_meeting_time,
      end_location,
      latitude,
      longitude, 
      type
    } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Assign logged-in user ID to sales_persion_id
    const sales_persion_id = req.user.id;

    // Validate required fields
    if (
      !customer_id ||
      !lead_date ||
      !lead_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert record
    const newLead = await LeadCommunication.create({
      customer_id,
      sales_persion_id, // Automatically set from logged-in user
      lead_date,
      lead_id,
      end_meeting_time,
      end_location,
      latitude,
      longitude,
      type
    });

    res
      .status(201)
      .json({
        success:true,
        message: "Meeting End Successfully",
        data: newLead,
      });
  } catch (error) {
    console.error("Error inserting lead communication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getLeadCommunicationsByLeadId = async (req, res) => {
//   try {
//     const { lead_id } = req.params;
//     const {
//       page = 1,
//       limit = 5,
//       search = "",
//       lead_status,
//       lead_date,
//     } = req.query;

//     // Validate lead_id
//     if (!lead_id) {
//       return res
//         .status(400)
//         .json({ success: false, message: "lead_id is required" });
//     }

//     // Base filter
//     let whereCondition = { lead_id };

//     // Unified Search (Across multiple fields)
//     if (search) {
//       whereCondition[Op.or] = [
//         { client_name: { [Op.like]: `%${search}%` } },
//         { lead_text: { [Op.like]: `%${search}%` } },
//         { lead_status: { [Op.like]: `%${search}%` } }, // Searching inside lead_status
//         { "$Customer.company_name$": { [Op.like]: `%${search}%` } }, // Search in related Customer table
//       ];
//     }

//     // Direct Filtering by lead_status
//     if (lead_status) {
//       whereCondition.lead_status = { [Op.like]: `%${lead_status}%` }; // Case-insensitive search
//     }

//     // Proper lead_date filtering
//     if (lead_date) {
//       const startDate = new Date(lead_date);
//       const endDate = new Date(startDate);
//       endDate.setHours(23, 59, 59, 999); // Include the whole day

//       whereCondition.lead_date = { [Op.between]: [startDate, endDate] };
//     }

//     // Convert page & limit to integers for pagination
//     const pageNumber = parseInt(page, 10);
//     const pageSize = parseInt(limit, 10);
//     const offset = (pageNumber - 1) * pageSize;

//     // Fetch paginated lead communications
//     const { count, rows } = await LeadCommunication.findAndCountAll({
//       where: whereCondition,
//       limit: pageSize,
//       offset,
//       attributes: [
//         "id",
//         "customer_id",
//         "lead_owner_id",
//         "sales_persion_id",
//         "lead_id",
//         "client_name",
//         "lead_text",
//         "lead_status",
//         "lead_date",
//         "next_meeting_time",
//         "createdAt",
//         "start_meeting_time",
//         "end_meeting_time",
//       ],
//       include: [
//         {
//           model: Customer,
//           attributes: ["company_name"], // Fetch only company_name
//         },
//       ],
//       order: [["id", "ASC"]], // Order by id in descending order
//     });

//     res.status(200).json({
//       success: true,
//       data: rows,
//       currentPage: pageNumber,
//       totalPages: Math.ceil(count / pageSize),
//       totalItems: count,
//     });
//   } catch (error) {
//     console.error("Error fetching lead communications:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


const getLeadCommunicationsByLeadId = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const {
      page = 1,
      limit = 5,
      search = "",
      lead_status,
      lead_date,
    } = req.query;

    if (!lead_id) {
      return res
        .status(400)
        .json({ success: false, message: "lead_id is required" });
    }

    let whereCondition = { lead_id };

    if (search) {
      whereCondition[Op.or] = [
        { client_name: { [Op.like]: `%${search}%` } },
        { lead_text: { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },
        { "$Customer.company_name$": { [Op.like]: `%${search}%` } },
      ];
    }

    if (lead_status) {
      whereCondition.lead_status = { [Op.like]: `%${lead_status}%` };
    }

    if (lead_date) {
      const startDate = new Date(lead_date);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      whereCondition.lead_date = { [Op.between]: [startDate, endDate] };
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    const { count, rows } = await LeadCommunication.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      attributes: [
        "id",
        "customer_id",
        "lead_owner_id",
        "sales_persion_id",
        "lead_id",
        "client_name",
        "lead_text",
        "lead_status",
        "lead_date",
        "createdAt",
        "start_meeting_time",
        "end_meeting_time",
      ],
      include: [
        {
          model: Customer,
          attributes: ["company_name"],
        },
      ],
      order: [["id", "ASC"]],
    });

    // 🔄 Merge records with same lead_id, sales_persion_id, customer_id, and lead_date
    const mergedMap = new Map();
    rows.forEach(item => {
      const key = `${item.lead_id}-${item.sales_persion_id}-${item.customer_id}-${item.lead_date.toISOString().split('T')[0]}`;
      if (!mergedMap.has(key)) {
        mergedMap.set(key, {
          ...item.toJSON(),
          start_meeting_time: item.start_meeting_time || null,
          end_meeting_time: item.end_meeting_time || null,
        });
      } else {
        const existing = mergedMap.get(key);
        if (item.start_meeting_time) existing.start_meeting_time = item.start_meeting_time;
        if (item.end_meeting_time) existing.end_meeting_time = item.end_meeting_time;
      }
    });

    const mergedData = Array.from(mergedMap.values());

    res.status(200).json({
      success: true,
      data: mergedData,
      currentPage: pageNumber,
      totalPages: Math.ceil(mergedData.length / pageSize),
      totalItems: mergedData.length,
    });
  } catch (error) {
    console.error("Error fetching lead communications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error"});
  }
};



const getWonLeadCommunications = async (req, res) => {
  try {
    const wonLeadCommunications = await LeadCommunication.findAll({
      where: { lead_status: "won" },
      include: [
        {
          model: Customer,
          attributes: ["id", "company_name", "email_id", "primary_contact"],
        }, // Include Customer details
        {
          model: User,
          as: "leadOwner",
          attributes: ["id", "username", "email", "fullname"],
        }, // Include Lead Owner details
        {
          model: User,
          as: "salesPerson",
          attributes: ["id", "username", "email", "fullname"],
        }, // Include Sales Person details
      ],
    });

    res.status(200).json({
      success: true,
      data: wonLeadCommunications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching won lead communications",
      error: error.message,
    });
  }
};

const exportWonLeadCommunications = async (req, res) => {
  try {
    const wonLeadCommunications = await LeadCommunication.findAll({
      where: { lead_status: "won" },
      include: [
        { model: Customer, attributes: ["id", "company_name", "email_id"] },
        {
          model: User,
          as: "leadOwner",
          attributes: ["id", "username", "email"],
        },
        {
          model: User,
          as: "salesPerson",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Won Lead Communications");

    worksheet.columns = [
      { header: "Lead ID", key: "id", width: 10 },
      { header: "Customer Name", key: "company_name", width: 30 },
      { header: "Customer Email", key: "customer_email", width: 25 },
      { header: "Lead Owner", key: "lead_owner", width: 20 },
      { header: "Lead Owner Email", key: "lead_owner_email", width: 25 },
      { header: "Sales Person", key: "sales_person", width: 20 },
      { header: "Sales Person Email", key: "sales_person_email", width: 25 },
      { header: "Status", key: "lead_status", width: 15 },
    ];

    wonLeadCommunications.forEach((lead) => {
      worksheet.addRow({
        id: lead.id,
        company_name: lead.Customer?.company_name || "N/A",
        customer_email: lead.Customer?.email_id || "N/A",
        lead_owner: lead.leadOwner?.username || "N/A",
        lead_owner_email: lead.leadOwner?.email || "N/A",
        sales_person: lead.salesPerson?.username || "N/A",
        sales_person_email: lead.salesPerson?.email || "N/A",
        lead_status: lead.lead_status,
      });
    });

    const exportPath = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }
    const timestamp = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const filePath = path.join(
      exportPath,
      `Won_Lead_Communications_${timestamp}.xlsx`
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, `Won_Lead_Communications_${timestamp}.xlsx`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error exporting won lead communications",
      error: error.message,
    });
  }
};

const visistsOfMonth = async (req, res) => {
  try {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed
    const year = today.getFullYear();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // Last day of current month

    const totalVisits = await LeadCommunication.count({
      where: {
        lead_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Total visits of the current month fetched successfully",
      totalVisits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching total visits of the month",
      error: error.message,
    });
  }
};

const getTodayMeetingLocation = async (req, res) => {
  try {
    // Get the logged-in user's ID from authentication middleware
    const salesPersionId = req.user?.id;

    if (!salesPersionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user logged in.",
      });
    }

    // Define the start and end of the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch today's communications for the logged-in sales person
    const communications = await LeadCommunication.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
        sales_persion_id: salesPersionId,
      },
      order: [['createdAt', 'DESC']],
    });

    // Format the response for frontend consumption
    const locations = communications.map(comm => ({
      id: comm.id,
      lat: parseFloat(comm.latitude),
      lng: parseFloat(comm.longitude),
      type: comm.type,
      address: comm.start_location || comm.end_location || "N/A",
    }));

    res.status(200).json({
      success: true,
      message: "Today's meeting locations for current user fetched successfully.",
      data: locations,
    });
  } catch (error) {
    console.error("Error fetching today's lead communications:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  createLeadCommunication,
  getLeadCommunicationsByLeadId,
  getWonLeadCommunications,
  exportWonLeadCommunications,
  visistsOfMonth,
  endMeeting,
  getTodayMeetingLocation
};
