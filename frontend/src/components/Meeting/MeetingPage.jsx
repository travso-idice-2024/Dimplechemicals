import "../Loans/Loans.css";
import { iconsImgs } from "../../utils/images";

const mettingsschedule = [
  {
    id: 1,
    name: "Rahul Sharma",
    todaymeeting: "Client Call",
    archeieveday: "1",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    todaymeeting: "Team Sync",
    archeieveday: "1",
  },
  {
    id: 3,
    name: "Amit Verma",
    todaymeeting: "Demo Presentation",
    archeieveday: "0",
  },
  {
    id: 4,
    name: "Priya Mehra",
    todaymeeting: "Project Review",
    archeieveday: "1",
  },
  {
    id: 5,
    name: "Karan Singh",
    todaymeeting: "Follow-up Meeting",
    archeieveday: "0",
  },
];


const MeetingPage = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");

  return (
    <div className="grid-two-item grid-common heightfitdata grid-c4 flex flex-col gap-3">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Plan of Action</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
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
                <td className="px-4 py-2 text-textdata">
                  {metting.todaymeeting}
                </td>
                <td className="px-4 py-2 text-textdata">
                  {metting.archeieveday}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingPage;
