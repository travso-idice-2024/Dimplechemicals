import React from "react";

const TodaysLeadReport = ({ setViewLeadReportOpen, selectedLeadData }) => {
  return (
    <div className="p-6 bg-white shadow rounded-lg relative z-50">
      {/* Close Button */}
      <button
        onClick={() => setViewLeadReportOpen(false)}
        className="absolute top-4 right-4 text-red-600 font-semibold border border-red-600 px-2 py-1 rounded hover:bg-red-100"
      >
        Close
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Employee Activity Report Format
      </h2>

      {/* Employee Name */}
      <div className="mb-2">
        <span className="font-bold">Name of Employee:</span>{" "}
        <span>{selectedLeadData?.employeeName || "_________"}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-sm text-white bg-[#2c2b3f]">
  <thead className="bg-[#1f1e2e]">
    <tr>
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
        <th key={index} className="border border-[#3e3d53] px-2 py-2 text-left font-semibold">
          {col}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {selectedLeadData?.visits?.length > 0 ? (
      selectedLeadData.visits.map((visit, index) => (
        <tr key={index} className="hover:bg-[#393857]">
          <td className="border border-[#3e3d53] px-2 py-1">{visit.date}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.type}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.startTime}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.endTime}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.customerName}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.contactPerson}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.companyName}</td>
          <td className="border border-[#3e3d53] px-2 py-1 italic">{visit.industryType}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.location}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.pincode}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.customerNeed}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.productProposed}</td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.totalCost}</td>
          <td className="border border-[#3e3d53] px-2 py-1">
            <ol className="list-decimal list-inside">
              {visit.remarks?.map((remark, i) => (
                <li key={i}>{remark}</li>
              ))}
            </ol>
          </td>
          <td className="border border-[#3e3d53] px-2 py-1">{visit.nextVisitDate}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="15" className="text-center py-4 text-gray-400 border border-[#3e3d53]">
          No visit data available.
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default TodaysLeadReport;
