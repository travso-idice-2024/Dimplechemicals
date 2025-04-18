import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";

const DepartmentTable = ({
  setEditUserModalOpen,
  finalizeDealsListData,
  setViewModalOpen,
}) => {
  console.log("finalizeDealsListData",finalizeDealsListData);
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
        {finalizeDealsListData?.map((user, index) => (
          <tr  key={index} className="text-center">
            <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
            <td className="px-4 py-2 text-newtextdata">{user?.date}</td>
            <td className="px-4 py-2 text-newtextdata">{user?.product?.product_name}</td>
            <td className="px-4 py-2 text-newtextdata">{user?.area} Sq mtr/cub mtr</td>
            <td className="px-4 py-2 text-newtextdata">{user?.quantity}</td>
            <td className="px-4 py-2 text-newtextdata">₹{user?.rate}</td>
            <td className="px-4 py-2 text-newtextdata text-center">₹{user?.amount}</td>
            <td className="px-4 py-2 text-newtextdata">₹{user?.deal_amount}</td>
            <td className="px-4 py-2 text-newtextdata">₹{user?.advance_amount}</td>
          </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
