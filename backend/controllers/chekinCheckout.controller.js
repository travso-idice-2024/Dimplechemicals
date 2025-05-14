
const { CheckinCheckout,User } = require("../models");
const { fn, col, literal, Op,Sequelize, DataTypes } = require("sequelize");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const checkIn = async (req, res) => {
    try {
      const { emp_id, latitude, longitude,checkin_location, data } = req.body;
  
      // Insert check-in details
      const checkInRecord = await CheckinCheckout.create({
        emp_id,
        latitude,
        longitude,
        checkin_location,
        check_in_time: new Date(),
        data,
      });
  
      res.status(201).json({ message: "Check-in successful!", checkInRecord });
    } catch (error) {
      console.error("Check-in error:", error);
      res.status(500).json({ error: "Database error" });
    }
  };

  const checkOut = async (req, res) => {
    try {
      const { emp_id, latitude, longitude, checkout_location, data } = req.body;
  
      // Validate required fields
      if (!emp_id || !latitude || !longitude || !checkout_location) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Check if employee exists
      const employee = await User.findByPk(emp_id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      // Insert a new record for check-out
      const checkOutRecord = await CheckinCheckout.create({
        emp_id,
        latitude,
        longitude,
        checkout_location,
        check_out_time: new Date(), // Insert current timestamp
        data,
      });
  
      res.status(201).json({ message: "Check-out successful!", checkOutRecord });
    } catch (error) {
      console.error("Check-out error:", error);
      res.status(500).json({ error: "Database error" });
  }
};

const getCheckinCheckoutReport = async (req, res) => {
  try {
      const { month, day, emp_id } = req.query;
      let whereClause = {};

      // If emp_id is provided, filter by employee ID
      if (emp_id) {
          const employee = await User.findByPk(emp_id);
          if (!employee) {
              return res.status(404).json({ message: "Employee not found" });
          }
          whereClause.emp_id = emp_id;
      }

      // If month is provided, filter by month
      if (month) {
          const currentYear = new Date().getFullYear();
          const startDate = new Date( `${currentYear}-${month}-01T00:00:00.000Z` );
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1); // Get next month's start to filter correctly

          whereClause.data = { [Op.between]: [startDate, endDate] };

          // If day is also provided, filter by exact date
          if (day) {
              const exactDate = new Date(`${currentYear}-${month}-${day}T00:00:00.000Z`);
              const nextDay = new Date(exactDate);
              nextDay.setDate(nextDay.getDate() + 1);

              whereClause.data = { [Op.between]: [exactDate, nextDay] };
          }
      }

      // Fetch records along with fullname from Users table
      // const records = await CheckinCheckout.findAll({
      //     where: whereClause,
      //     include: [
      //         {
      //             model: User,
      //             attributes: ["fullname"],
      //             required: true,
      //         },
      //     ],
      //     order: [["createdAt", "ASC"]],
      // });

      const records = await CheckinCheckout.findAll({
        attributes: [
          'emp_id',
          [col('User.fullname'), 'fullname'],
          'data',
          [fn('MAX', col('check_in_time')), 'check_in_time'],
          [fn('MAX', col('check_out_time')), 'check_out_time'],
          [fn('MAX', col('checkin_location')), 'checkin_location'],
          [fn('MAX', col('checkout_location')), 'checkout_location'],
        ],
        include: [
          {
            model: User,
            attributes: []
          }
        ],
        where: {
          [Op.or]: [
            { check_in_time: { [Op.ne]: null } },
            { check_out_time: { [Op.ne]: null } }
          ]
        },
        group: ['emp_id', 'data'],
        order: [['data', 'DESC']]
      });

      return res.status(200).json({
          message: "Check-in/Check-out report fetched successfully",
          records,
      });
  } catch (error) {
      console.error("Report fetch error:", error);
      return res.status(500).json({ message: "Server error", error});
  }
};

const exportCheckinCheckoutReport = async (req, res) => {
  try {
    const { month, day, emp_id } = req.query;
    let whereClause = {};

    // If emp_id is provided, filter by employee ID
    if (emp_id) {
      const employee = await User.findByPk(emp_id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      whereClause.emp_id = emp_id;
    }

    // If month is provided, filter by month
    if (month) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date(`${currentYear}-${month}-01T00:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1); // Get next month's start to filter correctly

      whereClause.data = { [Op.between]: [startDate, endDate] };

      // If day is also provided, filter by exact date
      if (day) {
        const exactDate = new Date(`${currentYear}-${month}-${day}T00:00:00.000Z`);
        const nextDay = new Date(exactDate);
        nextDay.setDate(nextDay.getDate() + 1);

        whereClause.data = { [Op.between]: [exactDate, nextDay] };
      }
    }

    // Fetch records along with fullname from Users table
    const records = await CheckinCheckout.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ["fullname"],
          required: true,
        },
      ],
      order: [["check_in_time", "ASC"]],
    });

    // Generate Excel File
    const workbook = new ExcelJS.Workbook();
    
    // Remove any invalid characters in the worksheet name
    const sheetName = "Check-in_Check-out_Report".replace(/[\/:*?"<>|]/g, "_");

    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
      { header: "Check-in ID", key: "id", width: 10 },
      { header: "Employee Name", key: "fullname", width: 30 },
      { header: "Check-in Location", key: "checkin_location", width: 30 },
      // { header: "Latitude", key: "latitude", width: 20 },
      // { header: "Longitude", key: "longitude", width: 20 },
      { header: "Check-in Time", key: "check_in_time", width: 30 },
      { header: "Check-out Time", key: "check_out_time", width: 30 },
      // { header: "Working Hours", key: "working_hours", width: 15 },
      { header: "Check-out Location", key: "checkout_location", width: 30 },
      { header: "Date", key: "data", width: 30 },
    ];

    records.forEach((record) => {
      worksheet.addRow({
        id: record.id,
        fullname: record.User?.fullname || "N/A",
        checkin_location: record.checkin_location || "N/A",
      //   latitude: record.latitude || "N/A",
      //   longitude: record.longitude || "N/A",
        check_in_time: record.check_in_time,
        check_out_time: record.check_out_time || "N/A",
      //   working_hours: record.working_hours || "N/A",
        checkout_location: record.checkout_location || "N/A",
        data: record.data || "N/A",
      });
    });

    // Save File
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const exportPath = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }

    const filePath = path.join(exportPath, `checkin_checkout_report_${timestamp}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    // Send File to Client and delete after download
    res.download(filePath, `checkin_checkout_report_${timestamp}.xlsx`, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error downloading file" });
      }
      
      // Delete the file after successful download
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });

  } catch (error) {
    console.error("Error exporting check-in/check-out report:", error);
    res.status(500).json({ success: false, message: "Error exporting report", error: error.message});
  }
  };
  
  
  const getDailyWorkingHours = async (req, res) => {
    try {
        const { emp_id, day, month } = req.query;

        // if (!day || !month) {
        //     return res.status(400).json({ message: "day and month are required" });
        // }

        const currentYear = moment().year();
        const date = moment(`${currentYear}-${month}-${day}`, "YYYY-MM-DD");

        if (!date.isValid()) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        let whereCondition = {
            createdAt: {
                [Op.between]: [date.startOf("day").toDate(), date.endOf("day").toDate()]
            }
        };
        if (emp_id) {
            whereCondition.emp_id = emp_id;
        }

        // Fetch attendance records
        const records = await CheckinCheckout.findAll({
            where: whereCondition,
            order: [["createdAt", "ASC"]]
        });

        if (records.length === 0) {
            return res.json({
                emp_id: emp_id || "ALL EMPLOYEES",
                date: date.format("YYYY-MM-DD"),
                total_working_hours: "00 hours, 00 minutes"
            });
        }

        let totalWorkingSeconds = 0;
        let checkInTime = null;

        records.forEach((record) => {
            let checkIn = record.check_in_time && record.check_in_time !== "0000-00-00 00:00:00"
                ? moment(record.check_in_time)
                : null;
            let checkOut = record.check_out_time && record.check_out_time !== "0000-00-00 00:00:00"
                ? moment(record.check_out_time)
                : null;

            if (checkIn && !checkOut) {
                checkInTime = checkIn;
            }

            if (checkInTime && checkOut && checkOut.isValid()) {
                let difference = checkOut.diff(checkInTime, "seconds");
                totalWorkingSeconds += difference;
                checkInTime = null; // Reset for next check-in
            }
        });

        const totalHours = Math.floor(totalWorkingSeconds / 3600);
        const totalMinutes = Math.floor((totalWorkingSeconds % 3600) / 60);

        return res.json({
            emp_id: emp_id || "ALL EMPLOYEES",
            date: date.format("YYYY-MM-DD"),
            total_working_hours: `${totalHours} hours, ${totalMinutes} minutes`
        });

    } catch (error) {
        console.error("Error in getDailyWorkingHours:", error);
        return res.status(500).json({ message: "Internal Server Error" });
}
};

  module.exports = { checkIn, checkOut, getCheckinCheckoutReport,exportCheckinCheckoutReport ,getDailyWorkingHours};
