const { op } = require("sequelize");
const { LeaveData } = require("../models");

// GET API to fetch all leave data
const getAllLeaveData = async (req, res) => {
  try {
    const leaveData = await LeaveData.findAll();
    res.status(200).json({ success: true, data: leaveData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMultipleLeaves = async (req, res) => {
  try {
    const updates = req.body.leaves;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data format" });
    }
    await Promise.all(
      updates.map(async (leave) => {
        const { id, ...updateFields } = leave;
        await LeaveData.update(updateFields, { where: { id } });
      })
    );

    res
      .status(200)
      .json({ success: true, message: "Leaves updated successfully" });
  } catch (error) {
    console.error("Error updating leave data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  };
}

module.exports = { getAllLeaveData, updateMultipleLeaves };
