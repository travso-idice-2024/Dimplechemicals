const express = require('express');
const { register, login,listEmployees,addEmployee,updateEmployee,deleteEmployee,getCurrentUser} = require('../controllers/auth.controller');
const {listRoles, addRole, removeRole, updateRole} = require('../controllers/role.controller');
const {listDepartments, addDepartment,updateDepartment, removeDepartment}  = require('../controllers/department.controller');
const {addCustomer,listCustomers, updateCustomer,removeCustomer} = require('../controllers/customer.controller');
const {addLead, getLeadList} = require('../controllers/lead.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const {upload}  = require('../middlewares/upload.middleware');


const router = express.Router();

// User Registration Route
router.post('/register', register);

// User Login Route
router.post('/login', login);
router.get ("/currentLoginuser", authMiddleware, getCurrentUser);

//role routes
router.get("/roleList", authMiddleware, listRoles);
router.post("/addRole", authMiddleware, addRole);
router.put("/updateRole/:id", authMiddleware, updateRole);  // Pass `id` in the URL
router.delete("/removeRole/:id", authMiddleware, removeRole);  // Pass `id` in the URL

//department routes
router.get("/departmentList", authMiddleware, listDepartments);
router.post("/departmentAdd", authMiddleware, addDepartment);
router.put("/departmentUpdate/:id", authMiddleware, updateDepartment);  // Pass `id` in the URL
router.delete("/departmentRemove/:id", authMiddleware, removeDepartment);  // Pass `id` in the URL


//employee routes
router.get("/employeeList", authMiddleware, listEmployees);
router.post("/employeeAdd", authMiddleware, upload, addEmployee);
router.put("/employeeUpdate/:id", authMiddleware, upload, updateEmployee);
router.delete("/employeeDelete/:id", authMiddleware, deleteEmployee);


//customer routes
router.get("/customerList", authMiddleware, listCustomers);
router.post("/addCustomer", authMiddleware, addCustomer);
router.put("/updateCustomer/:id", authMiddleware, updateCustomer);
router.delete("/removeCustomer/:id", authMiddleware, removeCustomer);


//lead routes
router.post("/leadAdd", authMiddleware, addLead);
router.get("/leadList", authMiddleware, getLeadList);

module.exports = router;
