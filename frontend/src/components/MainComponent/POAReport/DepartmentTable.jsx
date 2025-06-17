import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";

const DepartmentTable = ({
  setEditUserModalOpen,
  poaList,
  setViewModalOpen,
  selectedPOA,
  setSelectedPOA,
  isLeadAssignPopup,
  setIsLeadAssignPopup,
  setSelectedPOAId,
  selectedPOAId,
  poaReportOpen,
  setpoaReportOpen,
  getPOAReportBYId
}) => {
  //console.log("poaList", poaList);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);
  return (
    <div className={`overflow-x-auto`}>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Emp ID
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Email
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Phone
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {poaList.map((user, index) => (
            <tr key={index}>
              <td
                className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer"
                onClick={() => {
                  setSelectedPOA(user);
                  setpoaReportOpen(true);
                }}
              >
                {user.emp_id || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.fullname || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.email || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.phone || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => {
                    setSelectedPOA(user);
                    setpoaReportOpen(true);
                    getPOAReportBYId(user.id);
                  }}
                >
                  EMP POA Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
