import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";

const DepartmentTable = ({
  setEditUserModalOpen,
  finalizeDealsData,
  setViewModalOpen,
  setSelectedSAR,
  setsarReportOpen,
}) => {
  //console.log("finalizeDealsData",finalizeDealsData);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] border-t border-x border-[#844c22]">
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] ">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Employee Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Date of Visits
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              No. of Visits
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Total Hrs Spend
            </th>
            <th
              className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap "
              colSpan={2}
            >
              Approx Area
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Total Product Qty. in Kg
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Total Potential Amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Types of Documents sent
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Last Visit Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Last Visit Remark
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Next Visit Plan
            </th>
          </tr>
          <tr className="bg-[#473b33] border-x border-b border-[#844c22]">
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              SqM
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap border border-[#844c22] whitespace-nowrap ">
              Cub. Mtr
            </th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
            <th className="px-4 py-2 border border-[#844c22]"></th>
          </tr>
        </thead>
        <tbody>
          {finalizeDealsData.map((deal, index) => (
            <tr key={deal.id || index}>
              <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
              <td
                className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer"
                onClick={() => {
                  setSelectedSAR(deal);
                  setsarReportOpen(true);
                }}
              >
                {deal.assignedPerson?.fullname || "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.customer?.company_name || "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.assign_date
                  ? new Date(deal.assign_date).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.VisitCount ?? "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">-</td>{" "}
              {/* Total Hours Spend - not available */}
              <td className="px-4 py-2 text-newtextdata">-</td>{" "}
              {/* Approx Area SqM - not available */}
              <td className="px-4 py-2 text-newtextdata">-</td>{" "}
              {/* Approx Area Cub Mtr - not available */}
              <td className="px-4 py-2 text-newtextdata">
                {deal.quantity_no ?? "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.budget ?? "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">-</td>{" "}
              {/* Types of documents - not available */}
              <td className="px-4 py-2 text-newtextdata">
                {deal.last_contact
                  ? new Date(deal.last_contact).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.last_communication || "-"}
              </td>
              <td className="px-4 py-2 text-newtextdata">
                {deal.next_followup
                  ? new Date(deal.next_followup).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
