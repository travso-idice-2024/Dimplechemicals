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
  exportEmployeesLocation,
  exportEmployeesListToExcel
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
  exportCustomersToExcel,
  customerInfo,
  customerHistory,
  getBuisnessAssociates,
  updateBusinessAssociate
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
  exportLeadsToExcel,
  getTodayAssignedLeads,
  updateDealFinalised,
  getFinalisedDeals,
  addDealData,
  getDealData,
  countTotalLeads,
  getleadaftermeeting,
  addProductsToLead,
  getLeadListofAll,
  deleteProductFromLead,
  exportLeadsAfterMeetingToExcel,
  getAllPOAReports,
  getEmployeeListFromLeads,
  getPOAReportById
} = require("../controllers/lead.controller");
const {
  createLeadCommunication,
  getLeadCommunicationsByLeadId,
  getWonLeadCommunications,
  exportWonLeadCommunications,
  visistsOfMonth,
  endMeeting,
  getTodayMeetingLocation
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

const {
  getAllProducts,
  createProduct,
  updateProduct,
  toggleProductStatus,
  getProductsByCategoryId,
  exportProductsToExcel
} = require("../controllers/product.controller");

const {
  createCostWorking,
  getCostWorking,
  updateCostWorking,
  exportCostWorkingListToExcel
} = require("../controllers/costWorking.controller");

const{
  createPlan,
  getPlanOfActions,
  updateSalesPerson,
  planOfActionForaDay
}= require("../controllers/planofaction.controller");

const{
  createLeadAssignedHistory
}= require("../controllers/leadAssignedHistoryController");

const { listCategories } = require('../controllers/category.controller');
const {getLeadProducts} = require('../controllers/dealDataController');
const {getAllPincodes,getAreaByPincode,getCityByAreaname} = require('../controllers/mytable.controller');
const { addAnnualBusinessPlan , getAnnualBusinessPlanList,updateAnnualBusinessPlan } = require('../controllers/businessPlanController');


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
  "/lead-communications-list/:customer_id",
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


//router.get("/todayleads-count", authMiddleware, getTodayAssignedLeads);

//product routes
router.get("/allProducts",authMiddleware, getAllProducts);
router.post("/addProduct",authMiddleware, createProduct);       
router.put("/updateProduct/:id",authMiddleware, updateProduct);     
router.put("/deleteProduct/:id",authMiddleware, toggleProductStatus);
router.post("/addCostWorking", authMiddleware, createCostWorking);
router.get("/getcostingwork",authMiddleware, getCostWorking);
//router.get("/getcostingwork/:cr_id",authMiddleware, getCostWorking);
router.put('/cost-working/update/:id',authMiddleware, updateCostWorking);
router.put('/deal-finalised/:id', authMiddleware, updateDealFinalised);
router.get("/finalised-deal", authMiddleware, getFinalisedDeals);
// Plan of Action routes
router.post("/create-planofaction", authMiddleware, createPlan);
router.get("/getplanofaction", authMiddleware, getPlanOfActions);
router.put("/update-planofaction/:id", authMiddleware, updateSalesPerson);
router.get("/export-employee-details", authMiddleware, exportEmployeesListToExcel);
router.get("/export-customers", authMiddleware, exportCustomersToExcel);
router.get("/customer-history/:id", authMiddleware, customerHistory);
router.get("/customer-info/:id", authMiddleware, customerInfo);

router.post("/add-lead-assigned-history", authMiddleware, createLeadAssignedHistory);
router.get("/poa-for-day", authMiddleware, planOfActionForaDay);
router.post("/addDeal", authMiddleware, addDealData);
router.get("/get-Deal-data", authMiddleware, getDealData);
router.get("/total-lead-count", authMiddleware, countTotalLeads);
router.get("/total-months-visits", authMiddleware, visistsOfMonth);
router.get("/buisness-asssociates/:id", authMiddleware, getBuisnessAssociates);
router.get('/categories', authMiddleware, listCategories);
router.put(
  "/update-asssociates/:customer_id",
  authMiddleware,
  updateBusinessAssociate
);

router.post("/end-meeting", authMiddleware, endMeeting);
router.get("/get-lead-afterMeeting", authMiddleware, getleadaftermeeting);
// router.get("/get-lead-afterMeeting/:id", authMiddleware, getleadaftermeeting);
router.get('/get-lead-products/:customer_id', authMiddleware, getLeadProducts);
router.post("/add-products-to-lead", authMiddleware, addProductsToLead);
router.get("/get-todays-location", authMiddleware, getTodayMeetingLocation);
router.get("/get-product-category/:categoryId", authMiddleware, getProductsByCategoryId);
router.get("/leadListofall", authMiddleware, getLeadListofAll);
router.get('/pincodes', authMiddleware, getAllPincodes);
router.get('/pincode/:pincode', authMiddleware, getAreaByPincode);
router.get('/pincodes/:areaname', authMiddleware, getCityByAreaname);
router.post("/delete-product-from-lead", authMiddleware,deleteProductFromLead);


router.get("/products-export",authMiddleware, exportProductsToExcel);
router.get("/costworking/export",authMiddleware, exportCostWorkingListToExcel);
router.get("/export-after-meeting",authMiddleware, exportLeadsAfterMeetingToExcel);

router.post('/submit-annual-plan',authMiddleware , addAnnualBusinessPlan);
//router.get('/business-plan/:id',authMiddleware, getAnnualBusinessPlanDetails);
router.get('/business-plan',authMiddleware, getAnnualBusinessPlanList);
router.put("/update-business-plan/:id", authMiddleware, updateAnnualBusinessPlan);
router.get("/getAllPOAReport", authMiddleware, getAllPOAReports);
router.get("/getPoaEmployeeList", authMiddleware, getEmployeeListFromLeads);
router.get("/getPOAReportById/:emp_id", authMiddleware, getPOAReportById);


module.exports = router;
