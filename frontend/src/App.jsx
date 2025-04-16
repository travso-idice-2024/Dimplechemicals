import React, { useEffect, useState, useContext } from "react";
import './App.css';
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import UserManage from './layout/UserManagement/UserManage';
import CustomerRequire from './layout/CustomerRequirement/CustomerRequire';
import LeadGenerate from './layout/LeadGeneration/LeadGenerate';
import DocumentManage from './layout/DocumentManagement/DocumentManage';
import Demo from './Demo';
import SettingPage from './layout/Setting/SettingPage';
import QuotationManage from './layout/QuotationManagement/QuotationManage';
import QuotationData from './layout/QuotationDetail/QuotationData';
import AgreementSign from './layout/AgreementSigning/AgreementSign';
import AuditManage from './layout/AuditManagement/AuditManage';
import RoleManage from './layout/MainlayoutComponent/RoleManagement/RoleManage';
import DepartmentManage from './layout/MainlayoutComponent/DepartmentManagement/DepartmentManage';
import EmployeeManage from './layout/MainlayoutComponent/EmployeeManagement/EmployeeManage';
import MarketingManage from './layout/MainlayoutComponent/MarketingManagement/MarketingManage';
import SalesPersonAssign from './components/MainComponent/MarketingManagement/SalesPersonAssignment/SalesPersonAssign';
import SalesPersonFollowUp from './components/MainComponent/MarketingManagement/SalesFolllowUpForm/SalesPersonFollowUp';
import SalePOForm from './components/MainComponent/MarketingManagement/SalesPOForm/SalesPOForm';
import LoginPage from './mainPages/LoginPage';
import Attandance from './components/MainComponent/HRManagement/AttendanceManagement/Attandance';
import LeaveManage from './components/MainComponent/HRManagement/LeaveManagement/LeaveManage';
import RecruiterHiring from './components/MainComponent/HRManagement/RecruitmentHiring/RecruiterHiring';
import PerformaceandAppraises from './components/MainComponent/HRManagement/PerformaceandAppraises/Performance';
import SalaryManage from './components/MainComponent/HRManagement/SalaryManagement/SalaryManage';
import DocumentCompletion from './components/MainComponent/HRManagement/DocumentCompletion/DocumentCompletion';
import CustomerManageData from './components/MainComponent/CustomerManagement/CustomerManageData';
import ProductManageData from './components/MainComponent/ProductManagement/ProductManageData';
import CostWorking from './components/MainComponent/CostWorking/CostWorkingManageData';

import SalesProgressMange from './components/MainComponent/SalesProgressLeadManageData/SalesProgressMange';
import SalesViewLeadData from './components/MainComponent/SalesProgressLeadManageData/SalesViewLeadData';
import PrivateRoute from './PrivateRoute';
import { LeadFollowList } from './components/MainComponent/MarketingManagement/LeadFollowList';
import LeadReportManageData from './components/MainComponent/LeadReportManagement/ReportManageData';
import EmpReportManageData from './components/MainComponent/EmployeeReportManagement/EmpReportManageData';

import TodaysLeadReport from './components/MainComponent/LeadReportManagement/TodaysLeadReport';
import LeadByStatusReport from './components/MainComponent/LeadReportManagement/LeadByStatusReport';
import LeadBySourceReport from './components/MainComponent/LeadReportManagement/LeadBySourceReport';
import LeadByOwnershipReport from './components/MainComponent/LeadReportManagement/LeadByOwnershipReport';
import AttendanceSheetData from './components/MainComponent/HRManagement/AttendanceSheet/AttendanceSheetData';
import MarketingManageData from './components/MainComponent/MarketingManagement/MarketingManageData';
import LeadByIndustryReport from './components/MainComponent/LeadReportManagement/LeadByIndustryReport';
import ConvertedLeadReport from './components/MainComponent/LeadReportManagement/ConvertedLeadReport';
import LeadviaSourceData from './components/MainComponent/MarketingManagement/LeadViaSource/LeadviaSourceData';
import BudgetAnalysisData from './components/MainComponent/MarketingManagement/BudgetAnalysis/BudgetAnalysisData';
import FlyersData from './components/MainComponent/MarketingManagement/FlyersPage/FlyersData';
import NewsAdsData from './components/MainComponent/MarketingManagement/NewsPaperAds/NewsAdsData';
import EmpByMonthAndYearReport from './components/MainComponent/EmployeeReportManagement/EmpByMonthAndYearReport';
import EmpByDepartmentReport from './components/MainComponent/EmployeeReportManagement/EmpByDepartmentReport';
import EmployeeLocationWiseReport from './components/MainComponent/EmployeeReportManagement/EmployeeLocationWiseReport';
import EmpCheckInCheckoutReport from './components/MainComponent/EmployeeReportManagement/EmpCheckInCheckoutReport';
import POAReport from './components/MainComponent/POAReport/SalesPersonFollowUp';
import SalesVisitReport from './components/MainComponent/SalesVisitReport/SalesPOForm';
import CustomerHistoryCard from './components/MainComponent/CustomerHistoryCard/CustomerManageData';
import CustomerInfoForm from './components/MainComponent/CustomerInfoForm/CustomerManageData';
import { SidebarContext } from './context/sidebarContext';


function App() {
  const location = useLocation(); // ✅ Get current route
  const hideSidebarRoutes = ["/"]; // ✅ Sidebar will be hidden on Login Page
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div className='app'>
      {shouldShowSidebar && <Sidebar />} {/* ✅ Sidebar hidden on "/" */}
      <div className={`${location.pathname === "/" ? "contentData" : isSidebarOpen ? "contentData" : "content"}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Protect private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Content />} />
          <Route path="/marketing-management/lead-management" element={<MarketingManage />} />
          <Route path="/lead-management" element={<MarketingManage />} />
          <Route path="/sale-management/leads/assignment" element={<SalesPersonAssign />} />
          <Route path="/sale-management/plan-of-action-for-day" element={<SalesPersonFollowUp />} />
          <Route path="/sale-management/leads/po-form" element={<SalePOForm />} />
          <Route path="/employee-management" element={<EmployeeManage />} />
          <Route path="/hr/attandance" element={<Attandance/>} /> 
          <Route path="/hr/leave" element={<LeaveManage/>} /> 
          <Route path="/hr/recruitment" element={<RecruiterHiring/>} />
          <Route path="/hr/performance" element={<PerformaceandAppraises/>
          } />
          <Route path="/hr/employee-details" element={<EmployeeManage />} />
          <Route path="/hr/attandance-sheet" element={<AttendanceSheetData />} />
          <Route path="/hr/salary" element={<SalaryManage/> } />
          <Route path="/hr/document" element={<DocumentCompletion/>}/>
          <Route path="/role-management" element={<RoleManage />} />
          <Route path="/report-management/lead-report" element={<LeadReportManageData />} />
          <Route path="/report-management/employee-report" element={<EmpReportManageData />} />
          <Route path="/todayleadreport" element={<TodaysLeadReport />} />
          <Route path="/statusleadreport" element={<LeadByStatusReport/>}/>
          <Route path="/sourceleadreport" element={<LeadBySourceReport/>} />
          <Route path="/ownershipleadreport" element={<LeadByOwnershipReport />} />
          <Route path="/industryleadreport" element= {<LeadByIndustryReport/>} />
          <Route path="/convertedleadreport" element={<ConvertedLeadReport/>} />

          <Route path="/empmonthreport" element={<EmpByMonthAndYearReport/>} />
          <Route path='/empdepartmentreport' element={<EmpByDepartmentReport/>} />
          <Route path='/emplocationreport' element={<EmployeeLocationWiseReport/>}/>
          <Route path='/empcheckincheckoutreport' element={<EmpCheckInCheckoutReport/>}/>
          
          <Route path="/department-management" element={<DepartmentManage />} />
          <Route path="/customer-management" element={<CustomerManageData/>}/>
          <Route path="/product-management" element={<ProductManageData/>}/>
          <Route path="/cost-management" element={<CostWorking/>}/>

          <Route path="/marketing-management" element={<MarketingManageData/>}/>
          <Route path="/marketing-management/lead-via-source" element={<LeadviaSourceData />}/>
          <Route path="/marketing-management/budget-analysis" element={<BudgetAnalysisData/>}/>
          <Route path="/marketing-management/other-like/newspaper-ad" element={<NewsAdsData/>}/>
          <Route path="/marketing-management/other-like/flyers" element={<FlyersData/>}/>

          <Route path="/user-management" element={<UserManage />} />
          <Route path="/document-management" element={<DocumentManage />} />
          <Route path="/customer-requirement" element={<CustomerRequire />} />
          <Route path="/lead-sales" element={<SalesProgressMange />} />
          <Route path="/lead-sales/lead/:leadId" element={<SalesViewLeadData/>}/>
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/audit-management" element={<AuditManage />} />
          <Route path="/quotation-creation" element={<QuotationManage />} />
          <Route path="/quotation-creation/quotation-details/agreement-signing" element={<AgreementSign />} />
          <Route path="/quotation-creation/quotation-details" element={<QuotationData />} />
          <Route path="/customer-requirement/lead-generate" element={<LeadGenerate />} />
          <Route path="/demo" element={<Demo />} />
          <Route path='/lead-followups/:leadId' element={<LeadFollowList/>} />
          <Route path="/report-management/plan-of-action-for-day"  element={<POAReport/>}/>
          <Route path='/report-management/sales-activity-report' element={<SalesVisitReport/>}/>
          <Route path='/report-management/customer-history-card' element={<CustomerHistoryCard/>}/>
          <Route path='/report-management/customer-info-form' element={<CustomerInfoForm/>}/>

          {/* Add more protected routes here */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
