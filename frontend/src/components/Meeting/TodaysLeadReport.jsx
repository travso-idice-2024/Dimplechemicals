import React from "react";

const TodaysLeadReport = ({ setViewLeadReportOpen, selectedLeadData }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full md:w-[1100px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Employee Activity Report Format
        </h2>

        <div className="mt-5 md:mt-5 px-4 overflow-y-auto h-fit">
          <div className="overflow-x-auto w-[1058px]">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#473b33] rounded-[8px] text-center">
                  {[
                    "Date",
                    "Visit / Phone Call",
                    "Visit Start time",
                    "Visit End time",
                    "Customer Name",
                    "Contact Person Name",
                    "Company Name",
                    "Industry Type",
                    "Location",
                    "Pincode",
                    "Customer Need",
                    "Product Proposed",
                    "Total Cost Amount",
                    "Visit Remarks",
                    "Next Visit Plan Date",
                  ].map((col, index) => (
                    <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedLeadData?.visits?.length > 0 ? (
                  selectedLeadData.visits.map((visit, index) => (
                    <tr key={index} className="text-center hover:bg-[#1e1e2d78] cursor-pointer">
                      <td className="px-4 py-2 text-textdata">
                        {visit.date}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.type}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.startTime}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.endTime}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.customerName}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.contactPerson}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.companyName}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.industryType}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.location}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.pincode}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.customerNeed}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.productProposed}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.totalCost}
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        <ol className="list-decimal list-inside">
                          {visit.remarks?.map((remark, i) => (
                            <li key={i}>{remark}</li>
                          ))}
                        </ol>
                      </td>
                      <td className="px-4 py-2 text-textdata">
                        {visit.nextVisitDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="15"
                      className="px-4 py-2 text-textdata"
                    >
                      No visit data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-end justify-end gap-2 px-4">
          <button
            className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewLeadReportOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysLeadReport;
