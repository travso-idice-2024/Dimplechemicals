import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "../../../../context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DepartmentTable = ({
  setEditUserModalOpen,
  finalizeDealsListData,
  setViewModalOpen,
  setSelectedLead,
  setShowFinlizeDealProduct
}) => {
  console.log("finalizeDealsListData",finalizeDealsListData);
  const dispatch = useDispatch();
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <div className={`overflow-x-auto`}>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata  whitespace-nowrap">
              Id
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata  whitespace-nowrap">
              Company Name
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata  whitespace-nowrap">
              Deal Amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata  whitespace-nowrap">
              Advance Amount
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata  whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {finalizeDealsListData?.map((user, index) => (
          <tr  key={index} className="text-center">
            <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
            <td className="px-4 py-2 text-newtextdata">{user?.company_name}</td>
            <td className="px-4 py-2 text-newtextdata">₹{user?.deal_amount}</td>
            <td className="px-4 py-2 text-newtextdata">₹{user?.advance_amount}</td>
            <td className="px-4 py-2 text-newtextdata"> <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => {
                                  setSelectedLead(user);
                                  setShowFinlizeDealProduct(true);
                                }}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button></td>
          </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
