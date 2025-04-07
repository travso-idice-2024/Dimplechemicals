import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";

const DepartmentTable = ({
  currentUsers,
  setEditUserModalOpen,
  setViewModalOpen,
  currentPage,
  usersPerPage,
}) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div
      className={`overflow-x-auto ${isSidebarOpen ? "w-full" : "w-[1180px]"}`}
    >
      <table className={`table-auto ${isSidebarOpen ? "w-full" : "w-max"}`}>
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              PO Number
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              PO Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Department Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Supplier Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Supplier Address
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Supplier Contact
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Supplier Email
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Product Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Category
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Quantity
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Product Code
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
            Action
          </th> */}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-textdata">
                {index + 1 + (currentPage - 1) * usersPerPage}
              </td>
              <td className="px-4 py-2 text-textdata">{user.ponumber}</td>
              <td className="px-4 py-2 text-textdata">{user.podate}</td>
              <td className="px-4 py-2 text-textdata">{user.companyname}</td>
              <td className="px-4 py-2 text-textdata">{user.departmentname}</td>
              <td className="px-4 py-2 text-textdata">{user.suppliername}</td>
              <td className="px-4 py-2 text-textdata">
                {user.supplieraddress}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.suppliercontact}
              </td>
              <td className="px-4 py-2 text-textdata">{user.supplierEmail}</td>
              <td className="px-4 py-2 text-textdata">{user.productname}</td>
              <td className="px-4 py-2 text-textdata">{user.category}</td>
              <td className="px-4 py-2 text-textdata">{user.quantity}</td>
              <td className="px-4 py-2 text-textdata">{user.amount}</td>
              <td className="px-4 py-2 text-textdata">{user.productcode}</td>
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
