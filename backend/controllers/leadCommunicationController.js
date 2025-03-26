const { Op } = require("sequelize");
const { LeadCommunication, Customer, Lead } = require("../models"); // Import the model

// Insert a new lead communication record
const createLeadCommunication = async (req, res) => {
  try {
    const {
      customer_id,
      lead_owner_id,
      client_name,
      lead_text,
      lead_status,
      lead_date,
      lead_id,
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
      !lead_owner_id ||
      !client_name ||
      !lead_text ||
      !lead_status ||
      !lead_date ||
      !lead_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Insert record
    const newLead = await LeadCommunication.create({
      customer_id,
      lead_owner_id,
      sales_persion_id, // Automatically set from logged-in user
      client_name,
      lead_text,
      lead_status,
      lead_date,
      lead_id,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Lead communication created successfully",
        data: newLead,
      });
  } catch (error) {
    console.error("Error inserting lead communication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

    // Validate lead_id
    if (!lead_id) {
      return res
        .status(400)
        .json({ success: false, message: "lead_id is required" });
    }

    // Base filter
    let whereCondition = { lead_id };

    // Unified Search (Across multiple fields)
    if (search) {
      whereCondition[Op.or] = [
        { client_name: { [Op.like]: `%${search}%` } },
        { lead_text: { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } }, // Searching inside lead_status
        { "$Customer.company_name$": { [Op.like]: `%${search}%` } }, // Search in related Customer table
      ];
    }

    // Direct Filtering by lead_status
    if (lead_status) {
      whereCondition.lead_status = { [Op.like]: `%${lead_status}%` }; // Case-insensitive search
    }

    // Proper lead_date filtering
    if (lead_date) {
      const startDate = new Date(lead_date);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999); // Include the whole day

      whereCondition.lead_date = { [Op.between]: [startDate, endDate] };
    }

    // Convert page & limit to integers for pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    // Fetch paginated lead communications
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
      ],
      include: [
        {
          model: Customer,
          attributes: ["company_name"], // Fetch only company_name
        },
      ],
      order: [["id", "DESC"]], // Order by id in descending order
    });

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    console.error("Error fetching lead communications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createLeadCommunication, getLeadCommunicationsByLeadId };
