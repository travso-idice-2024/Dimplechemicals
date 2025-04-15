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
    <div
      className={`overflow-x-auto ${isSidebarOpen ? "w-full" : "w-[1180px]"}`}
    >
      <table className={`table-auto ${isSidebarOpen ? "w-full" : "w-full"} `}>
      <thead>
    <tr className="bg-[#473b33] border-t border-x border-[#ccc]">
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Id</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Employee Name</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Company Name</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Date of Visits</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">No. of Visits</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Total Hrs Spend</th>
      <th className="px-4 py-2 text-center text-bgDataNew text-textdata border border-[#ccc]" colSpan={2}>Approx Area</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Total Product Qty. in Kg</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Total Potential Amount</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Types of Documents sent</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Last Visit Date</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Last Visit Remark</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Next Visit Plan</th>
    </tr>
    <tr className="bg-[#473b33] border-x border-b border-[#ccc]">
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">SqM</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-textdata border border-[#ccc]">Cub. Mtr</th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
      <th className="px-4 py-2 border border-[#ccc]"></th>
    </tr>
  </thead>
  <tbody>
  {finalizeDealsData.map((deal, index) => (
    <tr key={deal.id || index}>
      <td className="px-4 py-2 text-textdata">{index + 1}</td>
      <td className="px-4 py-2 text-textdata cursor-pointer"  onClick={() => {
                  setSelectedSAR(deal);
                  setsarReportOpen(true);
                }}>{deal.assignedPerson?.fullname || "-"}</td>
      <td className="px-4 py-2 text-textdata">{deal.customer?.company_name || "-"}</td>
      <td className="px-4 py-2 text-textdata">
        {deal.assign_date ? new Date(deal.assign_date).toLocaleDateString() : "-"}
      </td>
      <td className="px-4 py-2 text-textdata">{deal.follow_up_record ?? "-"}</td>
      <td className="px-4 py-2 text-textdata">-</td> {/* Total Hours Spend - not available */}
      <td className="px-4 py-2 text-textdata">-</td> {/* Approx Area SqM - not available */}
      <td className="px-4 py-2 text-textdata">-</td> {/* Approx Area Cub Mtr - not available */}
      <td className="px-4 py-2 text-textdata">{deal.quantity_no ?? "-"}</td>
      <td className="px-4 py-2 text-textdata">{deal.budget ?? "-"}</td>
      <td className="px-4 py-2 text-textdata">-</td> {/* Types of documents - not available */}
      <td className="px-4 py-2 text-textdata">
        {deal.last_contact ? new Date(deal.last_contact).toLocaleDateString() : "-"}
      </td>
      <td className="px-4 py-2 text-textdata">{deal.last_communication || "-"}</td>
      <td className="px-4 py-2 text-textdata">
        {deal.next_followup ? new Date(deal.next_followup).toLocaleDateString() : "-"}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default DepartmentTable;
