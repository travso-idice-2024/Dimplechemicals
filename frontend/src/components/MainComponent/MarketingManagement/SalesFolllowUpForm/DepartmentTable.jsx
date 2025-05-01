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
      className={`overflow-x-auto w-full`}
    >
      <table className="table-auto min-w-[1200px] w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
          <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata"><input type="checkbox" disabled className="w-4 h-4 accent-orange-500" /></th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Contact Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Salse Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Meeting Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Meeting Type
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Meeting Summary
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Project Name / Application Area
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Location
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap"> 
              Product Sale / Work Execution
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Total Material Qty. / Total Area (in Sqm)
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
              Approx Business Potential
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
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
                className="px-4 py-2 text-newtextdata cursor-pointer"
                onClick={() => {
                  setSelectedPOA(user);
                  setpoaReportOpen(true);
                }}
              >
                {user.customer?.company_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.contact_person_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.assignedPerson?.fullname || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
              {user?.assign_date?.split("T")[0]}
              </td>
              <td className="px-4 py-2 text-newtextdata">
              {user?.meeting_time}
              </td>
              <td className="px-4 py-2 text-newtextdata w-[450px] ">
              {user?.lead_summary}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.project_name || "N/A"}
              </td>
              {/* <td className="px-4 py-2 text-newtextdata">
                {user.location || "N/A"}
              </td> */}
              <td className="px-4 py-2 text-newtextdata">
                {user.product_sale || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.total_material_qty || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
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
