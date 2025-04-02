import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  listDepartments,
  removeDepartment,
} from "../../../redux/departmentSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const EmpReportManagementTable = ({}) => {
  const navigate = useNavigate();
  const reports = [
    {
      id: 1,
      reportName: "Month and Year Report",
      description: "Employee Month and Year  wise Report",
    },
    {
      id: 2,
      reportName: "Deprtment wise Report",
      description: "Employee Deprtment wise Report",
    },
    {
      id: 3,
      reportName: "Location wise Report",
      description: "Employee Location wise Report",
    },
    {
      id: 3,
      reportName: "Check In/Check Out Report",
      description: "Employee Check In/Check Out Report",
    },
  ];

  // Mapping report names to specific routes
  const reportPathMap = {
    "Month and Year Report": "/empmonthreport",
    "Deprtment wise Report": "/empdepartmentreport",
    "Location wise Report": "/emplocationreport",
    "Check In/Check Out Report": "/empcheckincheckoutreport"
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
}
export default EmpReportManagementTable;
