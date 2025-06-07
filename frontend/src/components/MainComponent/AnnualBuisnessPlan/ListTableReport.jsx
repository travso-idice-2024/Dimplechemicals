import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ListTableReport = ({ setIsAnnualListTable }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Id
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Employee Name
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Email Id
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Phone Number
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Technology
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                1
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                ABC. Software
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                abc@gmail.com
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                +91 9589456458
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                HTML, CSS
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap  space-x-2 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={()=> setIsAnnualListTable(true)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {/* <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTableReport;
