import { iconsImgs } from "../../utils/images";
import "./Loans.css";

const mettingsschedule = [
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "rahul.sharma@example.com",
    archeieveday: "Active",
  },
];

const Loans = () => {
  const today = new Date(); 
  const formattedDate = today.toLocaleDateString("en-GB");
  return (
    <div className="subgrid-two-item grid-common grid-c7">
      <div className="grid-c-title pb-8">
        <h3 className="grid-c-title-text">
        Check In/Out Data
        </h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c7-content pt-2">
        
      </div>
    </div>
  );
};

export default Loans;
