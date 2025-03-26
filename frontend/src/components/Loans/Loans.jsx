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
        <p className="text-[#fe6c00] text-start mb-2 text-[11px]">
          <b>Today's Date</b> : &nbsp;&nbsp;{formattedDate}
        </p>
       
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full rounded-[8px] border-none">
            <thead className="bg-[#1e1e2d78]">
              <tr className="">
                <th className="px-4 py-2 text-textdata">ID</th>
                <th className="px-4 py-2 text-textdata">Name</th>
                <th className="px-4 py-2 text-textdata">Today's Meetings</th>
                <th className="px-4 py-2 text-textdata">Achieved for the day</th>
              </tr>
            </thead>
            <tbody>
              {mettingsschedule.map((metting) => (
                <tr
                  key={metting.id}
                  className="text-center hover:bg-[#1e1e2d78] cursor-pointer"
                >
                  <td className="px-4 py-2 text-textdata">{metting.id}</td>
                  <td className="px-4 py-2 text-textdata">{metting.name}</td>
                  <td className="px-4 py-2 text-textdata">{metting.todaymeeting}</td>
                  <td className="px-4 py-2 text-textdata">{metting.archeieveday}</td>
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
