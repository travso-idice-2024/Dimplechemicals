import "../Budget/Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget } from "../../data/data";

const employeeData = [
    { id: 1, name: "Rahul Sharma", email: "rahul.sharma@example.com", status: "Active", role: "Manager", department: "Sales", project: "Ecommerce Website", progress: 85 },
    { id: 2, name: "Anjali Verma", email: "anjali.verma@example.com", status: "Inactive", role: "HR", department: "Human Resources", project: "Employee Onboarding", progress: 40 },
    { id: 3, name: "Amit Kumar", email: "amit.kumar@example.com", status: "Active", role: "Developer", department: "IT", project: "CRM System", progress: 95 },
    { id: 4, name: "Sneha Singh", email: "sneha.singh@example.com", status: "Pending", role: "Analyst", department: "Finance", project: "Budget Analysis", progress: 60 },
    { id: 5, name: "Vikas Joshi", email: "vikas.joshi@example.com", status: "Active", role: "Designer", department: "Marketing", project: "Brand Identity", progress: 75 },
  ];

const Employee = () => {
  return (
    <div className="grid-two-item grid-common grid-c4 flex flex-col justify-between mb-5"> 
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Employee Hot Leads</h3>
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
              <th className="px-4 py-2 text-textdata">Email</th>
              <th className="px-4 py-2 text-textdata">Status</th>
              <th className="px-4 py-2 text-textdata">Role</th>
              <th className="px-4 py-2 text-textdata">Department</th>
              <th className="px-4 py-2 text-textdata">Project Name</th>
              <th className="px-4 py-2 text-textdata">Completed (%)</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id} className="text-center hover:bg-[#1e1e2d78] cursor-pointer">
                <td className="px-4 py-2 text-textdata">{employee.id}</td>
                <td className="px-4 py-2 text-textdata">{employee.name}</td>
                <td className="px-4 py-2 text-textdata">{employee.email}</td>
                <td className={`px-4 py-2 text-textdata font-semibold ${
                  employee.status === "Active" ? "text-green-500" : 
                  employee.status === "Inactive" ? "text-red-500" : 
                  "text-yellow-500"}`}>
                  {employee.status}
                </td>
                <td className="px-4 py-2 text-textdata">{employee.role}</td>
                <td className="px-4 py-2 text-textdata">{employee.department}</td>
                <td className="px-4 py-2 text-textdata">{employee.project}</td>
                <td className="px-4 py-2 text-textdata">
                  <div className="w-32 bg-gray-300 rounded-full">
                    <div className="bg-green-500 text-xs font-medium text-white text-center p-1 rounded-full" style={{ width: `${employee.progress}%` }}>
                      {employee.progress}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default Employee;
