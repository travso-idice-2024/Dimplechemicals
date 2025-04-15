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
    <tr className="bg-[#473b33] border-t border-x border-[#844c22]">
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Id</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Employee Name</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Company Name</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Date of Visits</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">No. of Visits</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Total Hrs Spend</th>
      <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata border border-[#844c22]" colSpan={2}>Approx Area</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Total Product Qty. in Kg</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Total Potential Amount</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Types of Documents sent</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Last Visit Date</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Last Visit Remark</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Next Visit Plan</th>
    </tr>
    <tr className="bg-[#473b33] border-x border-b border-[#844c22]">
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 border border-[#844c22]"></th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">SqM</th>
      <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22]">Cub. Mtr</th>
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
      <td className="px-4 py-2 text-newtextdata cursor-pointer"  onClick={() => {
                  setSelectedSAR(deal);
                  setsarReportOpen(true);
                }}>{deal.assignedPerson?.fullname || "-"}</td>
      <td className="px-4 py-2 text-newtextdata">{deal.customer?.company_name || "-"}</td>
      <td className="px-4 py-2 text-newtextdata">
        {deal.assign_date ? new Date(deal.assign_date).toLocaleDateString() : "-"}
      </td>
      <td className="px-4 py-2 text-newtextdata">{deal.follow_up_record ?? "-"}</td>
      <td className="px-4 py-2 text-newtextdata">-</td> {/* Total Hours Spend - not available */}
      <td className="px-4 py-2 text-newtextdata">-</td> {/* Approx Area SqM - not available */}
      <td className="px-4 py-2 text-newtextdata">-</td> {/* Approx Area Cub Mtr - not available */}
      <td className="px-4 py-2 text-newtextdata">{deal.quantity_no ?? "-"}</td>
      <td className="px-4 py-2 text-newtextdata">{deal.budget ?? "-"}</td>
      <td className="px-4 py-2 text-newtextdata">-</td> {/* Types of documents - not available */}
      <td className="px-4 py-2 text-newtextdata">
        {deal.last_contact ? new Date(deal.last_contact).toLocaleDateString() : "-"}
      </td>
      <td className="px-4 py-2 text-newtextdata">{deal.last_communication || "-"}</td>
      <td className="px-4 py-2 text-newtextdata">
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
