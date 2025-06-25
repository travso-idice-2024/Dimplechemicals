import React from "react";

const EmpSARReport = ({ setpoaReportOpen, selectedPOA, getPoaByEmpIdData }) => {
  //console.log("getPoaByEmpIdData", getPoaByEmpIdData);
  const formatTime = (seconds) => {
  if (!seconds || seconds <= 0) return "-";
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let result = "";
  if (hrs) result += `${hrs} hr `;
  if (mins) result += `${mins} minute `;
  if (secs) result += `${secs} second`;

  return result.trim();
};
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1300px] rounded-lg overflow-auto ">
         <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Summery of Sales Activity Report Format
          </h2>
        {/* Header */}
        {/* <div className="text-center border-b border-gray-300 p-4">
          <h3 className="text-lg font-semibold mt-1">
            Summery of Sales Activity Report Format
          </h3>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto p-4 max-h-[calc(100vh-200px)]"> 
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#473b33] rounded-[8px]">
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Id</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Employee Name</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Company Name</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap text-red-500">Date of Visit</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">No. of Visits</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Total Hrs Spend</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Approx Area SqM</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Approx Area Cub. Mtr</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Total Product Qty. in Kg</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Total Potential Amount</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Types of Documents Sent</th>
                <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">Next Visit Date</th>
              </tr>
            </thead>

            <tbody>
              {getPoaByEmpIdData && getPoaByEmpIdData.length > 0 ? (
                getPoaByEmpIdData.map((selectedPOA, index) => (
                  <tr className="text-center" key={selectedPOA.id || index}>
                    <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA?.employee_fullname || "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata w-[400px] whitespace-normal">
                      {selectedPOA.customer?.company_name || "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.assign_date
                        ? new Date(selectedPOA.assign_date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.communications?.[0]?.lead_status
                        ? selectedPOA.communications[0].lead_status.split("->")
                            .length
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.communications?.[0]?.total_hrs_spent ?? "-"}
                      {/* {formatTime(selectedPOA.communications?.[0]?.total_hrs_spent)} */}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.project_name ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.approx_area_cubm ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.total_material_qty ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.approx_business ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata whitespace-nowrap whitespace-pre-line">
                      {selectedPOA.documents?.length > 0
                        ? selectedPOA.documents.join("\n")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-newtextdata">
                      {selectedPOA.next_followup
                        ? new Date(
                            selectedPOA.next_followup
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="13"
                    className="border px-4 py-4 text-center text-gray-500"
                  >
                    No Sales Activity Report data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setpoaReportOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpSARReport;
