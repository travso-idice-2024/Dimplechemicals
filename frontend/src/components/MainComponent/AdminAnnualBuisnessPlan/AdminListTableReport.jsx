import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const AdminListTableReport = ({setIsViewReportOpen}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <h3 className="mt-0 mb-2 text-bgDataNew font-poppins border-[#473b33] border-2 w-[260px] font-medium text-[18px] text-bgData mb-3 text-center mx-auto">
          For the Year 2024 - 2025
        </h3>
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Sr. No.
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Employee Name
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                No. of Companies
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Product Sale / Work Execution / Expected Sales
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Total Material Qty. / Total Area (in Sqm)
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Approx Business Potential
              </th>
              {/* <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                1
              </td>
              <td
                className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer"
                onClick={() => {
                  setIsViewReportOpen(true);
                }}
              >
                Pankaj
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                4
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                Chemical
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                50
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                5 Lac
              </td>
              {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap  space-x-2 text-center">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminListTableReport;
