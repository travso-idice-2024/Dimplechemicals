const { Op } = require("sequelize");
const { Customer, Lead, User } = require("../models");
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');


const listCustomers = async (req, res) => {
    console.log("check data",req.query);
    try {
        const { page = 1, limit = 10, search = "", all } = req.query;

        // Base filter: Only fetch active customers
        let whereCondition = { active_status: "active" };

        // Add search filter if provided
        if (search) {
            whereCondition.company_name = { [Op.like]: `%${search}%` };
        }

        // Fetch all active customers if "all" query param is true
        if (all === "true") {
            const customers = await Customer.findAll({
                where: whereCondition,
                order: [["company_name", "ASC"]],
            });
            return res.status(200).json({ success: true, data: customers });
        }

        // Convert page & limit to integers
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const offset = (pageNumber - 1) * pageSize;

        // Fetch paginated & filtered customers
        const { count, rows } = await Customer.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset,
            order: [["company_name", "ASC"]],
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

const addCustomer = async (req, res) => {
    try {
        const {
            company_name,
            client_name,
            designation,
            primary_contact,
            secondary_contact,
            email_id,
            address,
            address_2,
            address_3,
            address_4,
            location,
            pincode,
            pan_no
        } = req.body;

        // Validation
        if (!company_name || !client_name || !email_id) {
            return res.status(400).json({ success: false, message: "Company name, client name, and email are required." });
        }

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ where: { email_id } });
        if (existingCustomer) {
            return res.status(400).json({ success: false, message: "Customer with this email already exists." });
        }

        // Create new customer
        const newCustomer = await Customer.create({
            company_name,
            client_name,
            designation,
            primary_contact,
            secondary_contact,
            email_id,
            address,
            location,
            pincode,
            pan_no,
            address_2,
            address_3,
            address_4,
        });

        res.status(201).json({
            success: true,
            message: "Customer added successfully",
            data: newCustomer
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
}
};


// ✅ Update a customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_name, client_name, designation, primary_contact, secondary_contact, email_id, address, location, pincode, pan_no, address_2, address_3, address_4 } = req.body;

        if (!id) return res.status(400).json({ success: false, message: "Customer ID is required." });

        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found." });

        await customer.update({ company_name, client_name, designation, primary_contact, secondary_contact, email_id, address, location, pincode, pan_no, address_2, address_3, address_4 });
        res.status(200).json({ success: true, message: "Customer updated successfully", data: customer });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
}
};

// ✅ Remove a customer
const removeCustomer = async (req, res) => {
    // try {
    //     const { id } = req.params;

    //     if (!id) return res.status(400).json({ success: false, message: "Customer ID is required." });

    //     const customer = await Customer.findByPk(id);
    //     if (!customer) return res.status(404).json({ success: false, message: "Customer not found." });

    //     await customer.destroy();
    //     res.status(200).json({ success: true, message: "Customer removed successfully" });

    // } catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }
    const { id } = req.params;
    const active_status = "deactive"; // "active" or "deactive"

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.active_status = active_status;
    await customer.save();

    res.json({ message: "Customer removed successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer status", error });
  }
};  

const getCustomerAddresses = async (req, res) => {
    try {
        const { id } = req.params; // Get customer_id from request parameters
        console.log("req.params", req.params);

        // Find customer by ID
        const customer = await Customer.findOne({
            where: { id: id },
            attributes: [
                "company_name", // ✅ Include company_name
                "address",
                "address_2",
                "address_3",
                "address_4"
            ], 
        });

        // If customer not found
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found." });
        }

        // Return customer address details
        console.log("customer", customer);
        res.status(200).json({
            success: true,
            message: "Customer addresses retrieved successfully",
            data: {
                id: id,
                company_name: customer.company_name, // ✅ Ensured it's defined
                addresses: [
                  customer.address,
                  customer.address_2,
                  customer.address_3,
                  customer.address_4,
                ].filter((address) => address !== undefined && address !== ""), // Filter out empty/undefined addresses
              },
        });
    } catch (error) {
        console.error("Error fetching customer addresses:", error);
        res.status(500).json({ success: false, message: "Error retrieving addresses", error: error.message });
    }
};


const exportCustomersToExcel = async (req, res) => {
    try {
      const { search = "" } = req.query;
  
      // Search condition
      let whereCondition = {};
      if (search) {
        whereCondition = {
          [Op.or]: [
            { company_name: { [Op.like]: `%${search}%` } },
            { client_name: { [Op.like]: `%${search}%` } },
            { email_id: { [Op.like]: `%${search}%` } },
            { cust_id: { [Op.like]: `%${search}%` } },
            { pan_no: { [Op.like]: `%${search}%` } },
            { primary_contact: { [Op.like]: `%${search}%` } },
          ]
        };
      }
  
      const customers = await Customer.findAll({
        where: whereCondition,
        order: [['id', 'ASC']],
      });
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Customers Report");
  
      worksheet.columns = [
        { header: "Customer ID", key: "cust_id", width: 15 },
        { header: "Company Name", key: "company_name", width: 25 },
        { header: "Client Name", key: "client_name", width: 20 },
        { header: "Designation", key: "designation", width: 15 },
        { header: "Primary Contact", key: "primary_contact", width: 20 },
        { header: "Secondary Contact", key: "secondary_contact", width: 20 },
        { header: "Email", key: "email_id", width: 25 },
        { header: "Address", key: "address", width: 30 },
        { header: "Address 2", key: "address_2", width: 30 },
        { header: "Address 3", key: "address_3", width: 30 },
        { header: "Address 4", key: "address_4", width: 30 },
        { header: "Location", key: "location", width: 20 },
        { header: "Pincode", key: "pincode", width: 15 },
        { header: "PAN No", key: "pan_no", width: 20 },
        { header: "Status", key: "active_status", width: 15 }
      ];
  
      customers.forEach(customer => {
        worksheet.addRow({
          cust_id: customer.cust_id,
          company_name: customer.company_name,
          client_name: customer.client_name,
          designation: customer.designation,
          primary_contact: customer.primary_contact,
          secondary_contact: customer.secondary_contact,
          email_id: customer.email_id,
          address: customer.address,
          address_2: customer.address_2,
          address_3: customer.address_3,
          address_4: customer.address_4,
          location: customer.location,
          pincode: customer.pincode,
          pan_no: customer.pan_no,
          active_status: customer.active_status
        });
      });
  
      const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
      const filePath = path.join(__dirname, `../exports/Customers_Report_${timestamp}.xlsx`);
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      await workbook.xlsx.writeFile(filePath);
      return res.download(filePath, "Customers_Report.xlsx");
  
    } catch (error) {
      console.error("Export Error:", error);
      res.status(500).json({ success: false, message: error.message});
    }
};


const customerInfo = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 🔍 If customer ID is provided
      if (id) {
        const customer = await Customer.findOne({
          where: { id, active_status: "active" },
          include: [
            {
              model: Lead,
              as: "leads",
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
              ],
              order: [["assign_date", "DESC"]],
            },
          ],
        });
  
        if (!customer) {
          return res.status(404).json({ success: false, message: "Customer not found" });
        }
  
        return res.status(200).json({ success: true, data: customer });
      }
  
      // 🔁 If no ID provided, list with pagination or all
      const { page = 1, limit = 10, search = "", all } = req.query;
      let whereCondition = { active_status: "active" };
  
      if (search) {
        whereCondition.company_name = { [Op.like]: `%${search}%` };
      }
  
      if (all === "true") {
        const customers = await Customer.findAll({
          where: whereCondition,
          order: [["company_name", "ASC"]],
        });
        return res.status(200).json({ success: true, data: customers });
      }
  
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const offset = (pageNumber - 1) * pageSize;
  
      const { count, rows } = await Customer.findAndCountAll({
        where: whereCondition,
        limit: pageSize,
        offset,
        order: [["company_name", "ASC"]],
      });
  
      res.status(200).json({
        success: true,
        data: rows,
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
        totalItems: count,
      });
    } catch (error) {
      console.error("Error in customerInfo:", error);
      res.status(500).json({ success: false, message: error.message});
    }
 };

 const customerHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 If customer ID is provided
    if (id) {
      const customer = await Customer.findOne({
        where: { id, active_status: "active" },
        include: [
          {
            model: Lead,
            as: "leads",
            include: [
              {
                model: User,
                as: "assignedPerson",
                attributes: ["id", "fullname", "email","phone","emergency_contact"],
              },
              {
                model: User,
                as: "leadOwner",
                attributes: ["id", "fullname", "email","phone","emergency_contact"],
              },
            ],
            order: [["assign_date", "DESC"]],
          },
        ],
      });

      if (!customer) {
        return res.status(404).json({ success: false, message: "Customer not found" });
      }

      return res.status(200).json({ success: true, data: customer });
    }

    // 🔁 If no ID provided, list with pagination or all
    const { page = 1, limit = 10, search = "", all } = req.query;
    let whereCondition = { active_status: "active" };

    if (search) {
      whereCondition.company_name = { [Op.like]: `%${search}%` };
    }

    if (all === "true") {
      const customers = await Customer.findAll({
        where: whereCondition,
        order: [["company_name", "ASC"]],
      });
      return res.status(200).json({ success: true, data: customers });
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    const { count, rows } = await Customer.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      order: [["company_name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    console.error("Error in customerInfo:", error);
    res.status(500).json({ success: false, message: error.message});
  }
 };

module.exports = { addCustomer,listCustomers,updateCustomer, removeCustomer ,getCustomerAddresses,exportCustomersToExcel,customerInfo,customerHistory};
