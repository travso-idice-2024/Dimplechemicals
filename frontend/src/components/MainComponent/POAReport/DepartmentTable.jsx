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
  setpoaReportOpen

}) => {
  
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);
  return (
    <div
      className={`overflow-x-auto`}
    >
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Contact Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Salse Person Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Type
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Meeting Summary
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Project Name / Application Area
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Location
            </th> */}
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Product Sale / Work Execution
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Total Material Qty. / Total Area (in Sqm)
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
              Approx Business Potential
            </th>
            {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap ">
            Action
          </th> */}
          </tr>
        </thead>
        <tbody>
          {poaList.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index + 1}</td>
              <td
                className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer"
                onClick={() => {
                  setSelectedPOA(user);
                  setpoaReportOpen(true);
                }}
              >
                {user.customer?.company_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.contact_persion_name || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.salesPerson?.fullname || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.meeting_date || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {user.meeting_type || "N/A"}
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap w-[450px] ">
                {user.meeting_summary || "N/A"}
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
