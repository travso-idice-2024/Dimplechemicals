import React from "react";

const ViewCustomerHistoryCardReport = ({
  setViewModalOpen,
  selectedCustomer,
}) => {
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full w-full md:w-[1300px] overflow-y-auto pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[18px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer History Card Report
        </h2>

        <div className="mt-5 px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-400 rounded-[8px] ">
                  <th className="px-4 py-2 text-center text-gray-800  whitespace-nowrap ">
                    Required Fields
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 whitespace-nowrap ">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 whitespace-nowrap ">
                    Sample Data
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="px-4 py-2 text-center text-newtextdata whitespace-nowrap">
                    1
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Name of Customer with address
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    ABC Corp, NY
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    2
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    DCPSL employee name
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    John Doe
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    3
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Business Associate code
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    BA1234
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    4
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    <strong className="text-[15px]">Activity List:</strong>
                    <div className="mt-2">
                     <b> a. Visit index having details of</b>
                      <br />
                      - date of Visit
                      <br />
                      - Visit Remark
                      <br />
                      - Next Visit Plan
                      <br />
                      - Location mapping Tag
                      <br />
                     <b> b. Email Index having details</b>
                      <br />
                      - Date of Email
                      <br />
                      - Email sent / received
                      <br />
                      - Customer Email ID
                      <br />
                      - Subject of email
                      <br />
                      <b>c. Document index with server hyperlink</b>
                      <br />
                      - Date of Document Sent
                      <br />
                      - Document sent through
                      <br />
                      - Server Location
                      <br />
                      - Document file name
                      <br />
                      <b>d. Phone call index</b>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-newtextdata ">
                    Includes visit & communication history
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    5
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Total Business Potential
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    $10,000
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    6
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Till date achieved Business
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    $4,000
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    7
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Reason for shortage / excess
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Delayed shipment
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    8
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Reason for customer lost
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Better pricing elsewhere
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    9
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Corrective action / future plan
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Improve delivery speed
                  </td>
                </tr>
                <tr className="border">
                  <td className="px-4 text-center py-2 text-newtextdata whitespace-nowrap">
                    10
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Lead / customer refered by, who is not a business associates
                  </td>
                  <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                    Jane Smith
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-end justify-end gap-2 px-4">
          <button
            className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerHistoryCardReport;
