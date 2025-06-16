import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ListTableReport = ({
  isViewAnnualReportOpen,
  setViewAnnualReportOpen,
  anualbsplan,
  selectedABP,
  setSelectedABP,
  monthWise,
  setMonthWise,
  userDeatail,
  setIsEditABPModalOpen
}) => {
  console.log("anualbsplan", anualbsplan);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
               <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Employee Name
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Customer Code
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Customer Name
              </th>
              {userDeatail?.employeeRole?.role_id === 3 && (
               <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Month
              </th>
              )}
              {/* <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
              
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Phone Number
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Technology
              </th> */}
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {anualbsplan?.map((user, index) => (
              <tr className="text-center" key={index}>
                 <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.employee?.fullname}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.customer?.cust_id}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.customer?.company_name}
                </td>
                {userDeatail?.employeeRole?.role_id === 3 && (
                 <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.for_month}
                </td>
                )}
                {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                abc@gmail.com
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                +91 9589456458
              </td>
              <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                HTML, CSS
              </td> */}
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap  space-x-2 text-center">
                  {userDeatail?.employeeRole?.role_id === 1 && (
                    <>
                      {[3, 6, 9, 12].map((month) =>
                        user?.for_month === month ? (
                          <button
                            key={month}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => {
                              setMonthWise(month);
                              setSelectedABP(user);
                              setViewAnnualReportOpen(true);
                            }}
                          >
                            {month} Month
                          </button>
                        ) : null
                      )}
                    </>
                  )}

                  {userDeatail?.employeeRole?.role_id === 3 && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => {
                          setSelectedABP(user);
                          setViewAnnualReportOpen(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                        onClick={() => {
                          setSelectedABP(user);
                          setIsEditABPModalOpen(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </>
                  )}
                  {/* 
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTableReport;
