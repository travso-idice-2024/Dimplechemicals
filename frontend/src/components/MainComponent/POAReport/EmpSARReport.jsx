import React from "react";

const EmpSARReport = ({ setpoaReportOpen, selectedPOA }) => {
  console.log("selectedPOA", selectedPOA);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1200px] rounded-lg overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center border-b border-gray-300 p-4">
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
              </tr>
            </thead>

            <tbody>
              {selectedPOA ? (
                <tr className="text-center">
                  <td className="px-4 py-2 text-textdata">1</td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.salesPerson?.fullname || "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.customer?.company_name || "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.meeting_date
                      ? new Date(selectedPOA.meeting_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.follow_up_record ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.total_hours_spent ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.approx_area_sqm ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.approx_area_cubm ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.total_material_qty ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.approx_business ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata whitespace-nowrap whitespace-pre-line">
                    {selectedPOA.documents?.length > 0
                      ? selectedPOA.documents.join("\n")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-textdata">
                    {selectedPOA.last_contact
                      ? new Date(selectedPOA.last_contact).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
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
