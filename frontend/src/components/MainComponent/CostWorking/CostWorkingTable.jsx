import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CostWorkingTable = ({
  setEditCostWorkingModalOpen,
  CostWorkings,
  setViewCostWorkingModalOpen,
  setSelectedCostWorking,
  selectedCostWorking,
  deleteFlashMessage,
  deleteFlashMsgType,
  handleDeleteFlashMessage,
  handleDelete,
}) => {
  //console.log("CostWorkings", CostWorkings);
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {deleteFlashMessage && deleteFlashMsgType === "success" && (
          <SuccessMessage message={deleteFlashMessage} />
        )}
        {deleteFlashMessage && deleteFlashMsgType === "error" && (
          <ErrorMessage message={deleteFlashMessage} />
        )}
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px] text-center">
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Id
              </th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Comapny Name
              </th>
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">Location</th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Nature of Work{" "}
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Technology used
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Estimate no
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Estimate date
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Revision no
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Revision date
              </th>

              <th className="px-4 py-2 text-left text-bgDataNew text-textdata whitespace-nowrap ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {CostWorkings?.map((user, index) => (
              <tr key={index} className="text-center">
                {/* <td className="px-4 py-2 text-newtextdata">{index + 1}</td> */}
                <td className="px-4 py-2 text-newtextdata">
                  {user?.company?.company_name}
                </td>
                {/* <td className="px-4 py-2 text-newtextdata">{user?.location}</td> */}
                <td className="px-4 py-2 text-newtextdata">
                  {user?.nature_of_work}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.technology_used}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.estimate_no}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.estimate_date.split("T")[0]}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.revision_no}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  {user?.revision_date.split("T")[0]}
                </td>

                <td className="px-4 py-2 text-newtextdata whitespace-nowrap flex items-center space-x-2 text-center">
                  
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedCostWorking(user);
                      setViewCostWorkingModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this lead?"
                        )
                      ) {
                        handleDelete(user.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {user?.edit === true && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => {
                        setSelectedCostWorking(user);
                        setEditCostWorkingModalOpen(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CostWorkingTable;
