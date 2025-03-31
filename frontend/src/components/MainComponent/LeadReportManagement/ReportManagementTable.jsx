import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listDepartments,
  removeDepartment,
} from "../../../redux/departmentSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const ReportManagementTable = ({}) => {
  const navigate = useNavigate();
  const reports = [
    {
      id: 1,
      reportName: "Todays Leads",
      description: "Leads obtained today",
    },
    {
      id: 2,
      reportName: "Leads by Status",
      description: "Leads and their statuses",
    },
    {
      id: 3,
      reportName: "Leads by Source",
      description: "Leads from various sources",
    },
    {
      id: 4,
      reportName: "Leads by Ownership",
      description: "Leads by Owner",
    },
    {
      id: 5,
      reportName: "Leads by Industry",
      description: "Leads by industry",
    },
    {
      id: 6,
      reportName: "Converted Leads",
      description: "Leads converted to Account / Deal / Contact.",
    },
  ];

  // Mapping report names to specific routes
  const reportPathMap = {
    "Todays Leads": "/todayleadreport",
    "Leads by Status": "/statusleadreport",
    "Leads by Source": "/sourceleadreport",
    "Leads by Ownership": "/ownershipleadreport",
    "Leads by Industry": "/industryleadreport",
    "Converted Leads": "/convertedleadreport",
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {/* {deleteFlashMessage && deleteFlashMsgType  === "success" && <SuccessMessage message={deleteFlashMessage} />}
    {deleteFlashMessage && deleteFlashMsgType  === "error" && <ErrorMessage message={deleteFlashMessage} />} */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Report Name
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-textdata">{index + 1}</td>
                <td
                  className="px-4 py-2 text-textdata cursor-pointer"
                  onClick={() =>
                    navigate(
                      reportPathMap[report?.reportName] || "/"
                    )
                  }
                >
                  {report?.reportName}
                </td>
                <td className="px-4 py-2 text-textdata">
                  {report?.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportManagementTable;
