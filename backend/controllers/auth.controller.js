const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {
  User,
  EmployeeRole,
  Role,
  Department,
  JobDetail,
  BankDetail,
  Document,
  sequelize,
} = require("../models");
const { generateToken } = require("../config/jwt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//userList
exports.listEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", all, roleId  } = req.query;

    // Convert page & limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * pageSize;

    // Search filter (checks `fullname`, `email`, and `phone`)
    const whereCondition = search
      ? {
          [Op.or]: [
            { fullname: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

     // 🔹 Apply role filter dynamically
     if (roleId) {
      whereCondition["$employeeRole.role_id$"] = roleId;
    }


    // Common query options
    const queryOptions = {
      where: whereCondition,
      order: [["id", "DESC"]], // Sorting by ID (latest first)
      include: [
        {
          model: EmployeeRole,
          as: "employeeRole",
          include: [{ model: Role, as: "role", attributes: ["role_name"] }],
        },
        {
          model: JobDetail,
          as: "jobDetail",
          include: [
            {
              model: Department,
              as: "department",
              attributes: ["department_name"],
            },
            {
              model: User, // Fetch reporting manager
              as: "reportingManager",
              attributes: ["id", "fullname"], // Only fetch name & ID
            },
          ],
        },
        {
          model: BankDetail, // Fetch bank details
          as: "bankDetail",
          attributes: ["bank_name", "account_number", "ifsc_code", "branch_name", "account_type"], // Select necessary fields
        },
      ],
      //attributes: ["id", "fullname", "email", "phone", "status", "emp_id"], // Select necessary fields
      attributes: { exclude: [] }, // Fetch all fields
    };

    // Fetch all employees if 'all' is set to true
    if (all === "true") {
      const users = await User.findAll(queryOptions);
      return res.status(200).json({ success: true, data: users });
    }

    // Fetch paginated & filtered employees
    const { count, rows } = await User.findAndCountAll({
      ...queryOptions,
      limit: pageSize,
      offset,
    });

    res.status(200).json({
      success: true,
      data: rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// exports.listEmployees = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = "", all } = req.query;

//     // Convert page & limit to integers
//     const pageNumber = parseInt(page, 10) || 1;
//     const pageSize = parseInt(limit, 10) || 10;
//     const offset = (pageNumber - 1) * pageSize;

//     // Search filter (checks `fullname`, `email`, and `phone`)
//     const whereCondition = search
//       ? {
//           [Op.or]: [
//             { fullname: { [Op.like]: `%${search}%` } },
//             { email: { [Op.like]: `%${search}%` } },
//             { phone: { [Op.like]: `%${search}%` } },
//           ],
//         }
//       : {};

//     // Common query options
//     const queryOptions = {
//       where: whereCondition,
//       order: [["id", "DESC"]], // Sorting by fullname
//       include: [
//         {
//           model: EmployeeRole,
//           as: "employeeRole",
//           include: [{ model: Role, as: "role", attributes: ["role_name"] }],
//         },
//         {
//           model: JobDetail,
//           as: "jobDetail",
//           include: [
//             {
//               model: Department,
//               as: "department",
//               attributes: ["department_name"],
//             },
//           ],
//         },
//       ],
//       attributes: ["id", "fullname", "email", "phone", "status","emp_id"], // Fetch required user fields
//     };

//     // Fetch all employees if 'all' is set to true
//     if (all === "true") {
//       const users = await User.findAll(queryOptions);
//       return res.status(200).json({ success: true, data: users });
//     }

//     // Fetch paginated & filtered employees
//     const { count, rows } = await User.findAndCountAll({
//       ...queryOptions,
//       limit: pageSize,
//       offset,
//     });

//     res.status(200).json({
//       success: true,
//       data: rows,
//       currentPage: pageNumber,
//       totalPages: Math.ceil(count / pageSize),
//       totalItems: count,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

//addEmployee
// exports.addEmployee = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   console.log("Received body:", req.body);
//   console.log("Received file:", req.file);
//   console.log("Received documents:", req.files?.documents);

//   try {
//     const {
//       username,
//       email,
//       password,
//       phone,
//       emergency_contact,
//       date_of_birth,
//       gender,
//       fullname,
//       address,
//       status,
//       role_id,
//       department_id,
//       job_title,
//       employment_type,
//       date_of_joining,
//       currently_working,
//       salary,
//       work_location,
//       reporting_manager_id,
//       offer_letter_date,
//       date_of_exit,
//       bank_name,
//       account_number,
//       ifsc_code,
//       branch_name,
//       account_type,
//       aadhar_no,
//       pan_no,
//       remarks,
//       digital_signature
//     } = req.body;

//     // Get uploaded profile image path
//     // const profile_image = req.file ? req.file.path.replace(/\\/g, "/") : null;
//     const profile_image = req.files?.profile_image
//       ? req.files.profile_image[0].path.replace(/\\/g, "/")
//       : null;

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       phone,
//       emergency_contact,
//       date_of_birth,
//       gender,
//       profile_image,
//       fullname,
//       address,
//       status,
//       aadhar_no,
//       pan_no,
//       remarks,
//       digital_signature
//     }, { transaction });

//     // Assign Role
//     await EmployeeRole.create({
//       employee_id: user.id,
//       role_id
//     }, { transaction });

//     // Add Job Details
//     await JobDetail.create({
//       employee_id: user.id,
//       department_id,
//       job_title,
//       employment_type,
//       date_of_joining,
//       currently_working,
//       salary,
//       work_location,
//       reporting_manager_id,
//       offer_letter_date,
//       date_of_exit
//     }, { transaction });

//     // Add Bank Details
//     await BankDetail.create({
//       employee_id: user.id,
//       bank_name,
//       account_number,
//       ifsc_code,
//       branch_name,
//       account_type
//     }, { transaction });

//     // Add Documents
//     if (req.files && req.files.documents) {
//       const documents = req.files?.documents?.map((file) => ({
//         employee_id: user.id,
//         documents: file.path.replace(/\\/g, "/"),
//       })) || [];

//       await Document.bulkCreate(documentRecords, { transaction });
//     }

//     // Commit the transaction
//     await transaction.commit();

//     res.status(201).json({ message: "Employee added successfully", user });

//   } catch (error) {
//     await transaction.rollback();

//     return res.status(500).json({
//       status: "error",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// exports.addEmployee = async (req, res) => {
//   console.log("Received body:", req.body);
//   console.log("Received file:", req.file);
//   console.log("Received documents:", req.files?.documents);

//   try {
//     const {
//       username,
//       email,
//       password,
//       phone,
//       emergency_contact,
//       date_of_birth,
//       gender,
//       fullname,
//       address,
//       status,
//       role_id,
//       department_id,
//       job_title,
//       employment_type,
//       date_of_joining,
//       currently_working,
//       salary,
//       work_location,
//       reporting_manager_id,
//       offer_letter_date,
//       date_of_exit,
//       bank_name,
//       account_number,
//       ifsc_code,
//       branch_name,
//       account_type,
//       aadhar_no,
//       pan_no,
//       remarks,
//       digital_signature
//     } = req.body;

//     // ✅ Fix: Handle profile image properly
//     const profile_image = req.file ? req.file.path.replace(/\\/g, "/") : null;

//     // ✅ Fix: Use `findOrCreate` to avoid race conditions
//     const [user, created] = await User.findOrCreate({
//       where: { email },
//       defaults: {
//         username,
//         email,
//         password: await bcrypt.hash(password, 10),
//         phone,
//         emergency_contact,
//         date_of_birth,
//         gender,
//         profile_image,
//         fullname,
//         address,
//         status,
//         aadhar_no,
//         pan_no,
//         remarks,
//         digital_signature
//       }
//     });

//     if (!created) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Reduce lock contention by using multiple smaller transactions
//     await sequelize.transaction(async (transaction) => {
//       // Assign Role
//       await EmployeeRole.create(
//         {
//           employee_id: user.id,
//           role_id
//         },
//         { transaction }
//       );

//       // Add Job Details
//       await JobDetail.create(
//         {
//           employee_id: user.id,
//           department_id,
//           job_title,
//           employment_type,
//           date_of_joining,
//           currently_working,
//           salary,
//           work_location,
//           reporting_manager_id,
//           offer_letter_date,
//           date_of_exit
//         },
//         { transaction }
//       );

//       // Add Bank Details
//       await BankDetail.create(
//         {
//           employee_id: user.id,
//           bank_name,
//           account_number,
//           ifsc_code,
//           branch_name,
//           account_type
//         },
//         { transaction }
//       );
//     });

//     // ✅ Fix: Handle document uploads properly
//     if (req.files?.documents) {
//       const documentRecords = req.files.documents.map((file) => ({
//         employee_id: user.id,
//         documents: file.path.replace(/\\/g, "/"),
//       }));

//       // Perform bulk insert in a separate transaction
//       await Document.bulkCreate(documentRecords);
//     }

//     return res.status(201).json({ message: "Employee added successfully", user });

//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

exports.addEmployee = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      emergency_contact,
      date_of_birth,
      gender,
      fullname,
      address,
      status,
      role_id,
      department_id,
      job_title,
      employment_type,
      date_of_joining,
      currently_working,
      salary,
      work_location,
      reporting_manager_id,
      offer_letter_date,
      date_of_exit,
      bank_name,
      account_number,
      ifsc_code,
      branch_name,
      account_type,
      aadhar_no,
      pan_no,
      remarks,
      digital_signature,
    } = req.body;

    const profile_image = req.files?.profile_image?.[0]?.path
      ? req.files.profile_image[0].path.replace(/\\/g, "/")
      : null;

    // ✅ Insert user with related tables in one query
    const user = await User.create(
      {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        emergency_contact,
        date_of_birth,
        gender,
        profile_image,
        fullname,
        address,
        status,
        aadhar_no,
        pan_no,
        remarks,
        digital_signature,
        employeeRole: { role_id }, // Relation
        jobDetail: {
          department_id,
          job_title,
          employment_type,
          date_of_joining,
          currently_working,
          salary,
          work_location,
          reporting_manager_id,
          offer_letter_date,
          date_of_exit,
        }, // Relation
        bankDetail: {
          bank_name,
          account_number,
          ifsc_code,
          branch_name,
          account_type,
        }, // Relation
      },
      {
        include: [
          { model: EmployeeRole, as: "employeeRole" }, // ✅ Use correct alias
          { model: JobDetail, as: "jobDetail" }, // ✅ Use correct alias
          { model: BankDetail, as: "bankDetail" }, // ✅ Use correct alias
        ],
      }
    );

    // ✅ Bulk insert documents separately if uploaded
    if (req.files?.documents) {
      const documentRecords = req.files.documents.map((file) => ({
        employee_id: user.id,
        documents: file.path.replace(/\\/g, "/"),
      }));
      await Document.bulkCreate(documentRecords);
    }

    return res
      .status(201)
      .json({ message: "Employee added successfully", user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { id } = req.params; // Employee ID to update
    
    const {
      username,
      email,
      phone,
      emergency_contact,
      date_of_birth,
      gender,
      fullname,
      address,
      status,
      role_id,
      department_id,
      job_title,
      employment_type,
      date_of_joining,
      currently_working,
      salary,
      work_location,
      reporting_manager_id,
      offer_letter_date,
      date_of_exit,
      bank_name,
      account_number,
      ifsc_code,
      branch_name,
      account_type,
      aadhar_no,
      pan_no,
      remarks,
      digital_signature,
    } = req.body;

    const profile_image = req.files?.profile_image?.[0]?.path
      ? req.files.profile_image[0].path.replace(/\\/g, "/")
      : null;
    
    // Check if user exists
    const user = await User.findByPk(id, {
      include: [
        { model: EmployeeRole, as: "employeeRole" },
        { model: JobDetail, as: "jobDetail" },
        { model: BankDetail, as: "bankDetail" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update user details
    await user.update({
      username,
      email,
      phone,
      emergency_contact,
      date_of_birth,
      gender,
      fullname,
      address,
      status,
      aadhar_no,
      pan_no,
      remarks,
      digital_signature,
      profile_image: profile_image || user.profile_image,
    });

    // Update related tables
    if (role_id) await user.employeeRole.update({ role_id });
    if (department_id || job_title || employment_type) {
      await user.jobDetail.update({
        department_id,
        job_title,
        employment_type,
        date_of_joining,
        currently_working,
        salary,
        work_location,
        reporting_manager_id,
        offer_letter_date,
        date_of_exit,
      });
    }
    if (bank_name || account_number || ifsc_code) {
      await user.bankDetail.update({
        bank_name,
        account_number,
        ifsc_code,
        branch_name,
        account_type,
      });
    }

    // Update documents if uploaded
    if (req.files?.documents) {
      await Document.destroy({ where: { employee_id: id } }); // Delete old records
      const documentRecords = req.files.documents.map((file) => ({
        employee_id: id,
        documents: file.path.replace(/\\/g, "/"),
      }));
      await Document.bulkCreate(documentRecords);
    }

    return res.status(200).json({ message: "Employee updated successfully", user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ success: false, message: "Employee ID is required." });
      }

      // ✅ Check if the employee exists
      const employee = await User.findByPk(id);
      if (!employee) {
          return res.status(404).json({ success: false, message: "Employee not found." });
      }

      // ✅ Delete related data only if it exists
      await Promise.all([
          Document.destroy({ where: { employee_id: id } }),
          BankDetail.destroy({ where: { employee_id: id } }),
          EmployeeRole.destroy({ where: { employee_id: id } }),
          JobDetail.destroy({ where: { employee_id: id } }),
      ]);

      // ✅ Handle JobDetail separately to prevent foreign key constraint issues
      await JobDetail.update({ reporting_manager_id: null }, { where: { reporting_manager_id: id } });

      // ✅ Finally, delete the Employee record
      await employee.destroy();

      return res.status(200).json({ success: true, message: "Employee and related data deleted successfully." });

  } catch (error) {
      return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    // The user is already attached to `req.user` via authentication middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user details (excluding password)
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};












