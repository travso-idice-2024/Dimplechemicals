const express = require("express");
const {
  register,
  login,
  listEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getCurrentUser,
  getAllEmployees,
  exportEmployeesToExcel,
  getDepartmentWise,
  exportEmployeesDepartment,
  getExitedEmployees,
  exportExitedEmployees,
  getEmployeesLocation,
  exportEmployeesLocation
} = require("../controllers/auth.controller");
const {
  listRoles,
  addRole,
  removeRole,
  updateRole,
} = require("../controllers/role.controller");
const {
  listDepartments,
  addDepartment,
  updateDepartment,
  removeDepartment,
} = require("../controllers/department.controller");
const {
  addCustomer,
  listCustomers,
  updateCustomer,
  removeCustomer,
  getCustomerAddresses,
} = require("../controllers/customer.controller");
const {
  addLead,
  getLeadList,
  updateLead,
  removeLead,
  getTodaysAssignedLeadsCount,
  getTodayLeads,
  getLeadById,
  getAllUsersTodaysLeads,
  exportTodaysLeadsToExcel,
  getAllLeads,
  exportLeadsToExcel
} = require("../controllers/lead.controller");
const {
  createLeadCommunication,
  getLeadCommunicationsByLeadId,
  getWonLeadCommunications,
  exportWonLeadCommunications
} = require("../controllers/leadCommunicationController");

const {
  getAllLeaveData,
  updateMultipleLeaves,
}= require("../controllers/leave.controller");
const {
  checkIn,
  checkOut,
  getCheckinCheckoutReport,
  exportCheckinCheckoutReport,
  getDailyWorkingHours
} = require("../controllers/chekinCheckout.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload.middleware");

const router = express.Router();

// User Registration Route
router.post("/register", register);

// User Login Route
router.post("/login", login);
router.get("/currentLoginuser", authMiddleware, getCurrentUser);

//role routes
router.get("/roleList", authMiddleware, listRoles);
router.post("/addRole", authMiddleware, addRole);
router.put("/updateRole/:id", authMiddleware, updateRole); // Pass `id` in the URL
router.delete("/removeRole/:id", authMiddleware, removeRole); // Pass `id` in the URL

//department routes
router.get("/departmentList", authMiddleware, listDepartments);
router.post("/departmentAdd", authMiddleware, addDepartment);
router.put("/departmentUpdate/:id", authMiddleware, updateDepartment); // Pass `id` in the URL
router.delete("/departmentRemove/:id", authMiddleware, removeDepartment); // Pass `id` in the URL

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
router.get("/leads/addresses/:id", authMiddleware, getCustomerAddresses);

//lead routes
router.post("/leadAdd", authMiddleware, addLead);
router.get("/leadList", authMiddleware, getLeadList);
router.put("/leadUpdate/:id", authMiddleware, updateLead);
router.put("/leadRemove/:id", authMiddleware, removeLead);

//sales lead routes
router.get(
  "/todaysAssignedLeadsCount",
  authMiddleware,
  getTodaysAssignedLeadsCount
);
router.get("/todaysLead", authMiddleware, getTodayLeads);
router.get("/getLeadById/:id", authMiddleware, getLeadById);
router.get("/users-todays-leads", authMiddleware, getAllUsersTodaysLeads);
router.get("/export-todays-leads", authMiddleware, exportTodaysLeadsToExcel);
router.get("/all-leads", authMiddleware, getAllLeads);
router.get("/export-leads", authMiddleware, exportLeadsToExcel);

//lead communication
router.post("/lead-communication", authMiddleware, createLeadCommunication);
router.get(
  "/lead-communications-list/:lead_id",
  authMiddleware,
  getLeadCommunicationsByLeadId
);
router.get("/won-lead-communications", authMiddleware, getWonLeadCommunications);
router.get("/export-won-Lead", authMiddleware, exportWonLeadCommunications);


//employee reports 

router.get("/allEmployeeData", authMiddleware, getAllEmployees);
router.get("/export-employee", authMiddleware, exportEmployeesToExcel);
router.get("/employee-department", authMiddleware, getDepartmentWise);
router.get("/export-employee-department",authMiddleware,exportEmployeesDepartment);
router.get("/employee-location", authMiddleware, getEmployeesLocation);
router.get("/export-employee-location",authMiddleware,exportEmployeesLocation);

router.get("/leave", authMiddleware, getAllLeaveData);
router.post("/update-leave", authMiddleware, updateMultipleLeaves);

//checkin checkout routes
router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/checkin-checkout-report",authMiddleware ,getCheckinCheckoutReport);
router.get("/export-checkin-checkout",authMiddleware ,exportCheckinCheckoutReport);
router.get("/calculate-workhours",authMiddleware ,getDailyWorkingHours);

module.exports = router;
