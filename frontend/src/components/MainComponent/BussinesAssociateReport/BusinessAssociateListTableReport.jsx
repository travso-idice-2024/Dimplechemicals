import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const BusinessAssociateListTableReport = ({ BAdata }) => {
  //console.log("anualbsplanReportdata",anualbsplanReportdata);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Code
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Name
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Email
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Contact
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Company name
              </th>
              <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata ">
                Location
              </th>
              {/* <th className="px-4 py-2 text-center text-bgDataNew text-newtextdata whitespace-nowrap ">
                Action
              </th> */}
            </tr>
          </thead>

          <tbody>
            {BAdata?.map((user, index) => (
              <tr className="text-center" key={index}>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.code}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.associate_name}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.email}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.phone_no}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user?.customers?.company_name}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap cursor-pointer">
                  {user.customers?.addresses?.length > 0
                    ? user?.customers?.addresses?.map((address, index) => (
                        <span key={index}>
                          {address.location}, {address.city} 
                          <br />
                        </span>
                      ))
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BusinessAssociateListTableReport;
