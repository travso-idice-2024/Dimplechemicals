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
          Meeting Scheduled by Sales Executive
        </h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c7-content pt-2">
        <p className="text-[#fe6c00] text-start">
          <b>Today's Date</b> : &nbsp;&nbsp;{formattedDate}
        </p>
        {/* <div className="progress-bar">
                <div className="percent">
                    <svg>
                        <circle cx="105" cy="105" r="50"></circle>
                    </svg>
                    <div className="number">
                        <h3>50<span>%</span></h3>
                    </div>
                </div>
            </div>
            <ul className="data-list">
                <li className="data-item text-silver-v1">
                    <span className="data-item-text">Savings Target</span>
                    <span className="data-item-value">₹ 500,000</span>
                </li>
                <li className="data-item text-silver-v1">
                    <span className="data-item-text">Target Reached</span>
                    <span className="data-item-value">₹ 250,000</span>
                </li>
            </ul> */}
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full rounded-[8px] border-none">
            <thead className="bg-[#1e1e2d78]">
              <tr className="">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Today's Meetings</th>
                <th className="px-4 py-2">Achieved for the day</th>
              </tr>
            </thead>
            <tbody>
              {mettingsschedule.map((metting) => (
                <tr
                  key={metting.id}
                  className="text-center hover:bg-[#1e1e2d78] cursor-pointer"
                >
                  <td className="px-4 py-2">{metting.id}</td>
                  <td className="px-4 py-2">{metting.name}</td>
                  <td className="px-4 py-2">{metting.todaymeeting}</td>
                  <td className="px-4 py-2">{metting.archeieveday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loans;
