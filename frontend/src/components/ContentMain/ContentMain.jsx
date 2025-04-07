import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";
import Employee from "../Employee/Employee";
import MeetingPage from "../Meeting/MeetingPage";

const ContentMain = () => {
  return (
    <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Cards />
        {/* <Transactions /> */}
        <Financial />
        <Budget />
        <Report />
        <Loans /> 
        {/* <Financial /> */}
        <Transactions />
      </div>
      <MeetingPage/>
      <Employee />
    </div>
  );
};

export default ContentMain;