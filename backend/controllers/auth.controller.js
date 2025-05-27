const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");
const path = require("path");
const fs =require("fs");
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
    const user = await User.findOne({ where: { username },include: [
      {
        model: EmployeeRole,
        as: "employeeRole",
        attributes: ["role_id"] // Only fetch role_id
      }
    ] });
    if (!user) {
      return res.json({ success: false,message: "Invalid username." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ success: true, message: "Login successful", token, user:user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//userList
exports.listEmployees = async (req, res) => {
  try {
    console.log("req.query" , req.query);
    const { page = 1, limit = 6, search = "", all, roleId  } = req.query;

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
            // {
            //   model: Department,
            //   as: "department",
            //   attributes: ["department_name"],
            // },
            {
              model: User, // Fetch reporting manager
              as: "reportingManager",
              attributes: ["id", "fullname"], // Only fetch name & ID
            },
          ],
        },
        // {
        //   model: BankDetail, // Fetch bank details
        //   as: "bankDetail",
        //   attributes: ["bank_name", "account_number", "ifsc_code", "branch_name", "account_type"], // Select necessary fields
        // },
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
      //date_of_birth,
      //gender,
      fullname,
      address,
      //status,
      role_id,
      //department_id,
      //job_title,
      employment_type,
      date_of_joining,
      //currently_working,
      //salary,
      work_location,
      reporting_manager_id,
      //offer_letter_date,
      //date_of_exit,
      // bank_name,
      // account_number,
      // ifsc_code,
      // branch_name,
      // account_type,
      aadhar_no,
      pan_no,
      // remarks,
      // digital_signature,
    } = req.body;

    // const profile_image = req.files?.profile_image?.[0]?.path
    //   ? req.files.profile_image[0].path.replace(/\\/g, "/")
    //   : null;

    // ✅ Insert user with related tables in one query
    const user = await User.create(
      {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        emergency_contact,
        //date_of_birth,
        //gender,
        //profile_image,
        fullname,
        address,
        //status,
        aadhar_no,
        pan_no,
        //remarks,
        //digital_signature,
        employeeRole: { role_id }, // Relation
        jobDetail: {
          //department_id,
          //job_title,
          employment_type,
          date_of_joining,
          //currently_working,
          //salary,
          work_location,
          reporting_manager_id,
          //offer_letter_date,
         // date_of_exit,
        }, // Relation
        // bankDetail: {
        //   bank_name,
        //   account_number,
        //   ifsc_code,
        //   branch_name,
        //   account_type,
        // }, // Relation
      },
      {
        include: [
          { model: EmployeeRole, as: "employeeRole" }, // ✅ Use correct alias
          { model: JobDetail, as: "jobDetail" }, // ✅ Use correct alias
          //{ model: BankDetail, as: "bankDetail" }, // ✅ Use correct alias
        ],
      }
    );

    // ✅ Bulk insert documents separately if uploaded
    // if (req.files?.documents) {
    //   const documentRecords = req.files.documents.map((file) => ({
    //     employee_id: user.id,
    //     documents: file.path.replace(/\\/g, "/"),
    //   }));
    //   await Document.bulkCreate(documentRecords);
    // }

    return res
      .status(201)
      .json({ success: true, message: "Employee added successfully", user });
  } catch (error) {
     // ✅ Check if the error is a Sequelize Validation Error
     if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Validation Error",
        errors: validationErrors,
      });
    }

    // ✅ Handle Unique Constraint Error
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        status: "error",
        message: "Duplicate entry detected",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }
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
      //username,
      email,
      phone,
      emergency_contact,
      //date_of_birth,
      //gender,
      fullname,
      address,
      //status,
      role_id,
      //department_id,
      //job_title,
      employment_type,
      date_of_joining,
      //currently_working,
      //salary,
      work_location,
      reporting_manager_id,
      //offer_letter_date,
      date_of_exit,
      // bank_name,
      // account_number,
      // ifsc_code,
      // branch_name,
      // account_type,
      aadhar_no,
      pan_no,
      // remarks,
      // digital_signature,
    } = req.body;

    // const profile_image = req.files?.profile_image?.[0]?.path
    //   ? req.files.profile_image[0].path.replace(/\\/g, "/")
    //   : null;
    
    // Check if user exists
    const user = await User.findByPk(id, {
      include: [
        { model: EmployeeRole, as: "employeeRole" },
        { model: JobDetail, as: "jobDetail" },
        //{ model: BankDetail, as: "bankDetail" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update user details
    await user.update({
      //username,
      email,
      phone,
      emergency_contact,
      //date_of_birth,
      //gender,
      fullname,
      address,
      //status,
      aadhar_no,
      pan_no,
      //remarks,
      //digital_signature,
      //profile_image: profile_image || user.profile_image,
    });

    // Update related tables
    if (role_id) await user.employeeRole.update({ role_id });
    if (employment_type) {
      await user.jobDetail.update({
        //department_id,
        //job_title,
        employment_type,
        date_of_joining,
        //currently_working,
        //salary,
        work_location,
        reporting_manager_id,
        //offer_letter_date,
        date_of_exit,
      });
    }
    // if (bank_name || account_number || ifsc_code) {
    //   await user.bankDetail.update({
    //     bank_name,
    //     account_number,
    //     ifsc_code,
    //     branch_name,
    //     account_type,
    //   });
    // }

    // Update documents if uploaded
    // if (req.files?.documents) {
    //   await Document.destroy({ where: { employee_id: id } }); // Delete old records
    //   const documentRecords = req.files.documents.map((file) => ({
    //     employee_id: id,
    //     documents: file.path.replace(/\\/g, "/"),
    //   }));
    //   await Document.bulkCreate(documentRecords);
    // }

    return res.status(200).json({ success: true, message: "Employee updated successfully", user });
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
      include: [
        {
          model: EmployeeRole,
          as: "employeeRole",
          attributes: ["role_id"] // only fetch role_id
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const { month, year } = req.query;

    let whereCondition = {};

    if (year) {
      whereCondition["$jobDetail.date_of_joining$"] = {
        [Op.gte]: new Date(year, 0, 1),
        [Op.lte]: new Date(year, 11, 31),
      };
    }

    if (month && year) {
      whereCondition["$jobDetail.date_of_joining$"] = {
        [Op.gte]: new Date(year, month - 1, 1),
        [Op.lte]: new Date(year, month, 0),
      };
    }

    const employees = await User.findAll({
      where: whereCondition,
      include: [
        { model: EmployeeRole, as: "employeeRole" },
        { model: JobDetail, as: "jobDetail" },
        //{ model: BankDetail, as: "bankDetail" },
      ],
    });

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

exports.exportEmployeesToExcel = async (req, res) => {
  try {
    const { month, year } = req.query;

    let whereCondition = {};

    if (year) {
      whereCondition["$jobDetail.date_of_joining$"] = {
        [Op.gte]: new Date(year, 0, 1),
        [Op.lte]: new Date(year, 11, 31),
      };
    }

    if (month && year) {
      whereCondition["$jobDetail.date_of_joining$"] = {
        [Op.gte]: new Date(year, month - 1, 1),
        [Op.lte]: new Date(year, month, 0),
      };
    }

    const employees = await User.findAll({
      where: whereCondition,
      include: [
        { model: EmployeeRole, as: "employeeRole" },
        { model: JobDetail, as: "jobDetail" },
        { model: BankDetail, as: "bankDetail" },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees Report");

    worksheet.columns = [
      { header: "Employee ID", key: "emp_id", width: 15 },
      { header: "Full Name", key: "fullname", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Status", key: "status", width: 10 },
      { header: "Joining Date", key: "date_of_joining", width: 20 },
    ];

    employees.forEach((emp) => {
      worksheet.addRow({
        emp_id: emp.emp_id,
        fullname: emp.fullname,
        email: emp.email,
        phone: emp.phone,
        status: emp.status,
        date_of_joining: emp.jobDetail?.date_of_joining || "N/A",
      });
    });

    // const filePath = path.join(__dirname, ../exports/Employees_Report.xlsx);
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
        const filePath = path.join(__dirname, `../exports/Employees_Report_${timestamp}.xlsx`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, "Employees_Report.xlsx");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};


exports.getDepartmentWise = async (req, res) => {
  try {
    const { department_id, search = "" } = req.query;

    let whereCondition = {};

    if (department_id) {
      whereCondition.department_id = department_id;
    }

    let searchCondition = {};
    if (search) {
      searchCondition[Op.or] = [
        { "$employee.fullname$": { [Op.like]: `%${search}%` } },
        { "$employee.email$": { [Op.like]: `%${search}%` } },
        { "$employee.phone$": { [Op.like]: `%${search}%` } },
      ];
    }

    const employees = await JobDetail.findAll({
      where: { ...whereCondition, ...searchCondition },
      include: [
        { model: User, as: "employee", attributes: ["fullname", "email", "phone"] },
        { model: Department, as: "department", attributes: ["department_name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.exportEmployeesDepartment = async (req, res) => {
  try {
    const { department_id } = req.query;

    let whereCondition = {};
    if (department_id) {
      whereCondition.department_id = department_id;
    }

    const employees = await JobDetail.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "employee",
          attributes: ["fullname", "email", "phone"],
          include: [
            // { model: EmployeeRole, as: "employeeRole", attributes: ["role_name"] }, // ✅ Fix Role linking
          ],
        },
        { model: Department, as: "department", attributes: ["department_name"] },
        // { model: BankDetail, as: "bankDetail" },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees Report");

    worksheet.columns = [
      { header: "Employee Name", key: "fullname", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Department", key: "department", width: 20 },
      // { header: "Role", key: "role", width: 20 },
      { header: "Job Title", key: "job_title", width: 20 },
      { header: "Employment Type", key: "employment_type", width: 20 },
      { header: "Joining Date", key: "date_of_joining", width: 20 },
    ];

    employees.forEach((emp) => {
      worksheet.addRow({
        fullname: emp.employee?.fullname || "N/A",
        email: emp.employee?.email || "N/A",
        phone: emp.employee?.phone || "N/A",
        department: emp.department?.department_name || "N/A",
        // role: emp.employee?.employeeRole?.role_name || "N/A",
        job_title: emp.job_title,
        employment_type: emp.employment_type,
        date_of_joining: emp.date_of_joining,
      });
    });
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const filePath = path.join(__dirname, `../exports/Employees_Report_${timestamp}.xlsx`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, `Employees_Report_${timestamp}.xlsx`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

exports.getEmployeesLocation = async (req, res) => {
  try {
    const { search } = req.query;

    let userWhereCondition = {};
    let jobDetailWhereCondition = {};

    // 🔍 Apply search filter (optional)
    if (search) {
      userWhereCondition = {
        [Op.or]: [
          { fullname: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    // 📍 Apply location filter only if provided
    // if (location) {
    //   jobDetailWhereCondition.work_location = { [Op.like]: `%${location}%` };
    // }

    const employees = await User.findAll({
      where: userWhereCondition, // Apply search filter
      include: [
        {
          model: JobDetail,
          as: "jobDetail",
          where: search ? jobDetailWhereCondition : undefined, // Apply only if location is given
          //required: !!location, // If location is provided, it must match
        },
        {
          model: EmployeeRole,
          as: "employeeRole",
          required: false,
        },
        {
          model: BankDetail,
          as: "bankDetail",
          required: false,
        },
        {
          model: Document,
          as: "documents",
          required: false,
        },
      ],
    });

    return res.status(200).json({ employees });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
   });
 }
};

exports.exportEmployeesLocation = async (req, res) => {
  try {
    const { search } = req.query;

    // Validate location filter
    let whereCondition = {};
    if (search) {
      whereCondition["$jobDetail.work_location$"] = { [Op.like]: `%${search}%` };
    }

    // Fetch employees
    const employees = await User.findAll({
      where: whereCondition,
      include: [
        { model: EmployeeRole, as: "employeeRole" },
        { model: JobDetail, as: "jobDetail" },
        { model: BankDetail, as: "bankDetail" },
      ],
    });

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found for this location" });
    }

    // Create Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees Location Report");

    // Define Excel Columns
    worksheet.columns = [
      { header: "Employee ID", key: "emp_id", width: 15 },
      { header: "Full Name", key: "fullname", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Work Location", key: "work_location", width: 20 },
      //{ header: "Department", key: "department", width: 20 },
      { header: "Joining Date", key: "date_of_joining", width: 20 },
    ];

    // Insert Data Rows
    employees.forEach((emp) => {
      worksheet.addRow({
        emp_id: emp.emp_id,
        fullname: emp.fullname,
        email: emp.email,
        phone: emp.phone,
        work_location: emp.jobDetail?.work_location || "N/A",
        //department: emp.jobDetail?.department_id || "N/A",
        date_of_joining: emp.jobDetail?.date_of_joining || "N/A",
      });
    });

    const exportDir = path.join(__dirname, "../exports");

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const fileName = `Employees_Location_Report_${timestamp}.xlsx`;
    const filePath = path.join(exportDir, fileName);

    // Remove existing file if already exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Save Excel file
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, fileName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

exports.exportEmployeesListToExcel = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", roleId, all } = req.query;

    // Convert page & limit to integers
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * pageSize;

    // Search filter (checks fullname, email, and phone)
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
      attributes: { exclude: [] }, // Fetch all fields
    };

    // Fetch all employees if 'all' is set to true
    const employees = all === "true"
      ? await User.findAll(queryOptions)
      : await User.findAll({
          ...queryOptions,
          limit: pageSize,
          offset,
        });

    // Initialize Excel Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees Data Report");

    // Dynamically create columns based on employee data
    worksheet.columns = [
      { header: "Employee ID", key: "emp_id", width: 15 },
      { header: "Full Name", key: "fullname", width: 25 },
      { header: "Date of Birth", key: "date_of_birth", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Status", key: "status", width: 10 },
      { header: "Date of Joining", key: "date_of_joining", width: 20 },
      { header: "Role", key: "role", width: 20 },
      { header: "Department", key: "department", width: 20 },
      { header: "Aadhar No", key: "aadhar_no", width: 20 },
      { header: "PanCard No", key: "pan_no", width: 20 },
      { header: "Reporting Manager", key: "reporting_manager", width: 20 },
      { header: "Bank Name", key: "bank_name", width: 20 },
      { header: "Account Number", key: "account_number", width: 20 },
      { header: "IFSC Code", key: "ifsc_code", width: 15 },
      { header: "Address", key: "address", width: 15 },
      // Add more columns as needed
    ];

    // Add rows for each employee
    employees.forEach((emp) => {
      worksheet.addRow({
        emp_id: emp.emp_id,
        date_of_birth: emp.date_of_birth,
        fullname: emp.fullname,
        email: emp.email,
        phone: emp.phone,
        status: emp.status,
        date_of_joining: emp.jobDetail?.date_of_joining || "N/A",
        role: emp.employeeRole?.role?.role_name || "N/A",
        aadhar_no: emp.aadhar_no,
        pan_no: emp.pan_no,
        department: emp.jobDetail?.department?.department_name || "N/A",
        reporting_manager: emp.jobDetail?.reportingManager?.fullname || "N/A",
        bank_name: emp.bankDetail?.bank_name || "N/A",
        account_number: emp.bankDetail?.account_number || "N/A",
        ifsc_code: emp.bankDetail?.ifsc_code || "N/A",
        address: emp.address,
      });
    });

    // Generate file path with timestamp
    const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
    const filePath = path.join(__dirname, `../exports/Employees_List_Report_${timestamp}.xlsx`);

    // Delete existing file if present
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Write workbook to file
    await workbook.xlsx.writeFile(filePath);

    // Send the file for download
    res.download(filePath, `Employees_List_Report_${timestamp}.xlsx`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};












