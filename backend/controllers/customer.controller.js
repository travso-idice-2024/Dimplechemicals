const { Op } = require("sequelize");
const { Customer } = require("../models");


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

module.exports = { addCustomer,listCustomers,updateCustomer, removeCustomer ,getCustomerAddresses};
