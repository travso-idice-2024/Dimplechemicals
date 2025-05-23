import React from "react";

const AllEmpSARReport = ({ setAllEmpSARReport, allselectedSAR }) => {
  console.log("allselectedSAR", allselectedSAR);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1200px] rounded-lg overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center border-b border-gray-300 p-4">
          <h2 className="text-red-600 font-bold text-xl">EMPLOYEE WISE SVR</h2>
          <h3 className="text-lg font-semibold mt-1">
            Summery of Sales Activity Report Format
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-4">
          <table className="w-full border border-collapse text-sm">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="border px-2 py-1">Id</th>
                <th className="border px-2 py-1">Employee Name</th>
                <th className="border px-2 py-1">Company Name</th>
                <th className="border px-2 py-1 text-red-500">Date of Visit</th>
                <th className="border px-2 py-1">No. of Visits</th>
                <th className="border px-2 py-1">Total Hrs Spend</th>
                <th className="border px-2 py-1">Approx Area SqM</th>
                <th className="border px-2 py-1">Approx Area Cub. Mtr</th>
                <th className="border px-2 py-1">Total Product Qty. in Kg</th>
                <th className="border px-2 py-1">Total Potential Amount</th>
                <th className="border px-2 py-1">Types of Documents Sent</th>
                <th className="border px-2 py-1">Last Visit Date</th>
                <th className="border px-2 py-1">Last Visit Remark</th>
                <th className="border px-2 py-1">Next Visit Plan</th>
              </tr>
            </thead>

            <tbody>
              {allselectedSAR && allselectedSAR.length > 0 ? (
                allselectedSAR.map((sar, index) => (
                    <tr key={sar.id || index} className="text-center">
                    <td className="px-4 py-2 text-textdata">{index + 1}</td>
                    <td className="px-4 py-2 text-textdata">{sar.assignedPerson?.fullname || "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.customer?.company_name || "-"}</td>
                    <td className="px-4 py-2 text-textdata">
                      {sar.assign_date ? new Date(sar.assign_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-2 text-textdata">{sar.follow_up_record ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.total_hours_spent ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.approx_area_sqm ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.approx_area_cubm ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.quantity_no ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata">{sar.budget ?? "-"}</td>
                    <td className="px-4 py-2 text-textdata whitespace-nowrap whitespace-pre-line">
                      {sar.documents?.length > 0 ? sar.documents.join("\n") : "-"}
                    </td>
                    <td className="px-4 py-2 text-textdata">
                      {sar.last_contact ? new Date(sar.last_contact).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-2 text-textdata">{sar.last_communication || "-"}</td>
                    <td className="px-4 py-2 text-textdata">
                      {sar.next_followup ? new Date(sar.next_followup).toLocaleDateString() : "-"}
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
            onClick={() => setAllEmpSARReport(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllEmpSARReport;
