import React from "react";

const DepartmentTable = ({
  currentUsers,
  setEditUserModalOpen,
  setViewModalOpen,
  currentPage,
  usersPerPage,
}) => {
  return (
    <div className="overflow-x-auto w-[1140px]">
      <table className="w-max table-auto">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Id</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Lead Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              SalesPerson Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Meeting Date</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Meeting Type</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Client Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">Company Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Meeting Summary
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
            Action
          </th> */}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                {index + 1 + (currentPage - 1) * usersPerPage}
              </td>
              <td className="px-4 py-2 text-textdata">{user.leadname}</td>
              <td className="px-4 py-2 text-textdata">{user.salespersonname}</td>
              <td className="px-4 py-2 text-textdata">{user.meetdate}</td>
              <td className="px-4 py-2 text-textdata">{user.meettype}</td>
              <td className="px-4 py-2 text-textdata">{user.clientname}</td>
              <td className="px-4 py-2 text-textdata">{user.companyname}</td>
              <td className="px-4 py-2 text-textdata w-[450px] text-justify">{user.meetingSummary}</td>
              {/* <td className="px-4 py-2 text-textdata space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  setViewModalOpen(true);
                }}
              >
                View
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => {
                  setEditUserModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
