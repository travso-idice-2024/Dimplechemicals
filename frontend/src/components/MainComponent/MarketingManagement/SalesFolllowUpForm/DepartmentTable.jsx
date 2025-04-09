import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
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
  setpoaReportOpen

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
          <th className="px-4 py-2 text-left text-bgDataNew text-textdata"></th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Contact Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Salse Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Meeting Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Meeting Type
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Meeting Summary
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Project Name / Application Area
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Location
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Product Sale / Work Execution
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Total Material Qty. / Total Area (in Sqm)
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Approx Business Potential
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
            Action
          </th> */}
          </tr>
        </thead>
        <tbody>
          {poaList.map((user, index) => (
            <tr key={index}>
               <td className="px-4 py-2 text-newtextdata">
                 
                   <input
        type="checkbox"
        className="w-4 h-4 accent-orange-500"
        checked={selectedPOAId === user.id}
        onChange={() => {
          setSelectedPOAId(user.id);
          setSelectedPOA(user);
          setIsLeadAssignPopup(true);
        }}
      />
                </td>
              <td className="px-4 py-2">{index + 1}</td>
              <td
                className="px-4 py-2 text-textdata cursor-pointer"
                onClick={() => {
                  setSelectedPOA(user);
                  setpoaReportOpen(true);
                }}
              >
                {user.customer?.company_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.contact_persion_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.salesPerson?.fullname || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.meeting_date || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.meeting_type || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata w-[450px] text-justify">
                {user.meeting_summary || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.project_name || "N/A"}
              </td>
              {/* <td className="px-4 py-2 text-textdata">
                {user.location || "N/A"}
              </td> */}
              <td className="px-4 py-2 text-textdata">
                {user.product_sale || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.total_material_qty || "N/A"}
              </td>
              <td className="px-4 py-2 text-textdata">
                {user.approx_business || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
