const { Op, Sequelize, fn, col } = require("sequelize");
const { LeadAssignedHistory, Lead, User } = require("../models");

const createLeadAssignedHistory = async (req, res) => {
    try {
      const { lead_id, new_assigned_person_id } = req.body;
  
      // Basic validation
      if (!lead_id || !new_assigned_person_id) {
        return res.status(400).json({
          success: false,
          message: "lead_id and new_assigned_person_id are required"
        });
      }
      const leadExists = await Lead.findByPk(lead_id);
      if (!leadExists) {
        return res.status(404).json({
          success: false,
          message: "Lead not found"
        });
      }
  
      // 3. Check if user exists
      const userExists = await User.findByPk(new_assigned_person_id);
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "Assigned person (user) not found"
        });
      }
  
      // Create the record
      const newEntry = await LeadAssignedHistory.create({
        lead_id,
        new_assigned_person_id
      });
  //console.log("New lead assignment history entry created:", newEntry);
      return res.status(201).json({
        success: true,
        message: 'Lead assigned successfully',
        data: newEntry
      });
    } catch (err) {
      //console.error("Error creating lead assignment history:", err);
      return res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };
  

module.exports = {
    createLeadAssignedHistory,
};
