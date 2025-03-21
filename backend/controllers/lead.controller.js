const { Op } = require("sequelize");
const { Lead, Customer, User } = require("../models"); // Import models

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
      return res
        .status(409)
        .json({
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

    res
      .status(201)
      .json({
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

    res
      .status(200)
      .json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
      });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    // Update active_status
    lead.active_status = active_status;
    await lead.save();

    res.json({ success: true, message: "Lead removed successfully", lead });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ success: false, message: "Error updating lead status", error: error.message });
}
};

module.exports = { addLead, getLeadList,removeLead ,updateLead};
