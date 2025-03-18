import React from "react";

const DepartmentTable = ({
  currentUsers,
  setEditUserModalOpen,
  setViewModalOpen,
  currentPage,
  usersPerPage,
}) => {
  return (
    <div className="overflow-x-auto w-[1115px]">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew">Id</th>
            <th className="px-4 py-2 text-left text-bgDataNew">PO Number</th>
            <th className="px-4 py-2 text-left text-bgDataNew">PO Date</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Company Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Department Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Supplier Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Supplier Address
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Supplier Contact
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Supplier Email
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">Product Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Category</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Quantity</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Amount</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Product Code</th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew">
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
              <td className="px-4 py-2">{user.ponumber}</td>
              <td className="px-4 py-2">{user.podate}</td>
              <td className="px-4 py-2">{user.companyname}</td>
              <td className="px-4 py-2">{user.departmentname}</td>
              <td className="px-4 py-2">{user.suppliername}</td>
              <td className="px-4 py-2">{user.supplieraddress}</td>
              <td className="px-4 py-2">{user.suppliercontact}</td>
              <td className="px-4 py-2">{user.supplierEmail}</td>
              <td className="px-4 py-2">{user.productname}</td>
              <td className="px-4 py-2">{user.category}</td>
              <td className="px-4 py-2">{user.quantity}</td>
              <td className="px-4 py-2">{user.amount}</td>
              <td className="px-4 py-2">{user.productcode}</td>
              {/* <td className="px-4 py-2 space-x-2">
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
