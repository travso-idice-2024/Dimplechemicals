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
import SalesProgressMange from './components/MainComponent/SalesProgressLeadManageData/SalesProgressMange';
import SalesViewLeadData from './components/MainComponent/SalesProgressLeadManageData/SalesViewLeadData';
import PrivateRoute from './PrivateRoute';
import { LeadFollowList } from './components/MainComponent/MarketingManagement/LeadFollowList';
import SalesManageData from './components/MainComponent/SalesManagement/SalesManageData';
import ReportManageData from './components/MainComponent/ReportManagement/ReportManageData';
import TodaysLeadReport from './components/MainComponent/ReportManagement/TodaysLeadReport';
import LeadByStatusReport from './components/MainComponent/ReportManagement/LeadByStatusReport';

function App() {
  const location = useLocation(); // ✅ Get current route
  const hideSidebarRoutes = ["/"]; // ✅ Sidebar will be hidden on Login Page
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className='app'>
      {shouldShowSidebar && <Sidebar />} {/* ✅ Sidebar hidden on "/" */}
      <div className='content'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Protect private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Content />} />
          {/* <Route path="/marketing-management/leads" element={<MarketingManage />} /> */}
          <Route path="/lead-management" element={<MarketingManage />} />
          <Route path="/marketing-management/assignment" element={<SalesPersonAssign />} />
          <Route path="/marketing-management/follow-up-form" element={<SalesPersonFollowUp />} />
          <Route path="/marketing-management/po-form" element={<SalePOForm />} />
          <Route path="/employee-management" element={<EmployeeManage />} />
          <Route path="/hr/attandance" element={<Attandance/>} /> 
          <Route path="/hr/leave" element={<LeaveManage/>} /> 
          <Route path="/hr/recruitment" element={<RecruiterHiring/>} />
          <Route path="/hr/performance" element={<PerformaceandAppraises/>
          } />
          <Route path="/hr/salary" element={<SalaryManage/> } />
          <Route path="/hr/document" element={<DocumentCompletion/>}/>
          <Route path="/role-management" element={<RoleManage />} />
          <Route path="/report-management" element={<ReportManageData />} />
          <Route path="/todayleadreport" element={<TodaysLeadReport />} />
          <Route path="/statusleadreport" element={<LeadByStatusReport/>}/>
          <Route path="/department-management" element={<DepartmentManage />} />
          <Route path="/customer-management" element={<CustomerManageData/>}/>
          <Route path="/sale-management" element={<SalesManageData/>}/>
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
