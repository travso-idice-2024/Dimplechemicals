
const { Op } = require("sequelize");
const { Lead, Customer, User } = require('../models'); // Import models

const addLead = async (req, res) => {
  try {
      const lead_owner_id = req.user.id;
      const { customer_id, assigned_person_id, lead_source, lead_status, assign_date, lead_summary } = req.body;

      // Check if required fields are provided
      if (!customer_id || !lead_owner_id || !lead_source || !lead_status || !assigned_person_id) {
          return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      // Validate customer
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
          return res.status(404).json({ success: false, message: "Customer not found." });
      }

      // Validate lead owner
      const leadOwner = await User.findByPk(lead_owner_id);
      if (!leadOwner) {
          return res.status(404).json({ success: false, message: "Lead owner not found." });
      }

      // Validate assigned person
      const assignedPerson = await User.findByPk(assigned_person_id);
      if (!assignedPerson) {
          return res.status(404).json({ success: false, message: "Assigned person not found." });
      }

      // ✅ Check if a lead is already assigned to the same salesperson for this customer
      const existingLead = await Lead.findOne({ 
          where: { 
              customer_id, 
              assigned_person_id 
          } 
      });

      if (existingLead) {
          return res.status(409).json({ success: false, message: "This customer is already assigned to the selected salesperson." });
      }

      // Create the lead entry
      const newLead = await Lead.create({
          customer_id,
          lead_owner_id,
          assigned_person_id,
          lead_source,
          lead_status,
          assign_date: assign_date || new Date(),
          lead_summary
      });

      res.status(201).json({ success: true, message: "Lead added successfully", data: newLead });

  } catch (error) {
      console.error("Error adding lead:", error);
      res.status(500).json({ success: false, message: error.message });
  }
};


const getLeadList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", all } = req.query;

    // Base filter
    let whereCondition = {};

    // Unified Search (Across multiple fields)
    if (search) {
      whereCondition[Op.or] = [
        { "$customer.company_name$": { [Op.like]: `%${search}%` } },
        { "$customer.client_name$": { [Op.like]: `%${search}%` } },
        { "$leadOwner.fullname$": { [Op.like]: `%${search}%` } },
        { "$assignedPerson.fullname$": { [Op.like]: `%${search}%` } },
        { lead_status: { [Op.like]: `%${search}%` } },  // Now included in search
        { lead_source: { [Op.like]: `%${search}%` } },  // Now included in search
      ];
    }

    // Fetch all leads if "all=true" (no pagination)
    if (all === "true") {
      const leads = await Lead.findAll({
        where: whereCondition,
        attributes: ["id", "lead_source", "lead_status", "assign_date", "createdAt"],
        include: [
          { model: Customer, as: "customer", attributes: ["company_name", "client_name"] },
          { model: User, as: "leadOwner", attributes: ["fullname"] },
          { model: User, as: "assignedPerson", attributes: ["fullname"] },
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
      attributes: ["id", "lead_source", "lead_status", "assign_date", "createdAt"],
      include: [
        { model: Customer, as: "customer", attributes: ["company_name", "client_name"] },
        { model: User, as: "leadOwner", attributes: ["fullname"] },
        { model: User, as: "assignedPerson", attributes: ["fullname"] },
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


module.exports = { addLead ,getLeadList};
