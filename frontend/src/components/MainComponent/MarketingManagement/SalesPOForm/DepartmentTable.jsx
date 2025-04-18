import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";

const DepartmentTable = ({
  setEditUserModalOpen,
  finalizeDealsData,
  setViewModalOpen,
}) => {
  //console.log("finalizeDealsData",finalizeDealsData);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div className={`overflow-x-auto`}>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] border-t border-x border-[#844c22]">
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Date
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Product Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Area - Sq mtr / Cub Mtr
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Quantity
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Rate
            </th>
            <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Advance amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata border border-[#844c22] whitespace-nowrap">
              Deal amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="px-4 py-2 text-newtextdata">1</td>
            <td className="px-4 py-2 text-newtextdata">2025-04-18</td>
            <td className="px-4 py-2 text-newtextdata">Marble Slab</td>
            <td className="px-4 py-2 text-newtextdata">15 Sq mtr/ 18 cub mtr</td>
            <td className="px-4 py-2 text-newtextdata">10</td>
            <td className="px-4 py-2 text-newtextdata">₹1500</td>
            <td className="px-4 py-2 text-newtextdata text-center">₹15,000</td>
            <td className="px-4 py-2 text-newtextdata">₹5,000</td>
            <td className="px-4 py-2 text-newtextdata">₹20,000</td>
          </tr>
          <tr className="text-center">
            <td className="px-4 py-2 text-newtextdata">2</td>
            <td className="px-4 py-2 text-newtextdata">2025-04-17</td>
            <td className="px-4 py-2 text-newtextdata">Granite Block</td>
            <td className="px-4 py-2 text-newtextdata">8 Cub Mtr / 10 sq mtr</td>
            <td className="px-4 py-2 text-newtextdata">5</td>
            <td className="px-4 py-2 text-newtextdata">₹2500</td>
            <td className="px-4 py-2 text-newtextdata text-center">₹12,500</td>
            <td className="px-4 py-2 text-newtextdata">₹3,000</td>
            <td className="px-4 py-2 text-newtextdata">₹18,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
