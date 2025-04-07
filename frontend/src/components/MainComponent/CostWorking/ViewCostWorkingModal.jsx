import React from "react";
import { useNavigate } from "react-router-dom";

const ViewCostWorkingModal = ({
  setViewCostWorkingModalOpen,
  selectedCostWorking,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Cost Working Report
        </h2>

        {/* General Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  {[ 
    [
      {
        label: "Company Name",
        value: selectedCostWorking?.company?.company_name,
      },
      { label: "Location", value: selectedCostWorking?.location },
      {
        label: "Nature of Work",
        value: selectedCostWorking?.nature_of_work,
      },
      {
        label: "Technology Used",
        value: selectedCostWorking?.technology_used,
      },
      {
        label: "Area to be Coated",
        value: selectedCostWorking?.area_to_be_coated,
      },
      {
        label: "Thickness in mm",
        value: selectedCostWorking?.thickness_in_mm,
      },
    ],
    [
      { label: "Estimate No", value: selectedCostWorking?.estimate_no },
      {
        label: "Estimate Date",
        value: selectedCostWorking?.estimate_date?.split("T")[0],
      },
      { label: "Revision No", value: selectedCostWorking?.revision_no },
      {
        label: "Revision Date",
        value: selectedCostWorking?.revision_date?.split("T")[0],
      },
    ]
  ].map((fields, tableIndex) => (
    <div key={tableIndex} className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <tbody>
          {fields.map((field, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300 font-medium">
                {field.label}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {field.value || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</div>


        {/* Materials Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "#",
                  "Item",
                  "HSN Code",
                  "Qty/M²",
                  "Unit",
                  "Qty For",
                  "Std Pak",
                  "Basic Rate",
                  "Amount",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-left text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCostWorking?.products?.map((material, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material?.Product?.product_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material?.Product?.HSN_code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.qty_for}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.unit}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.qty_for}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.std_pak}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.std_basic_rate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {material.basic_amount}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-gray-100 font-semibold text-gray-800">
                <td
                  className="border border-gray-300 px-4 py-2 text-right"
                  colSpan={8}
                >
                  Total Material Cost
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {selectedCostWorking?.total_material_cost ?? "0"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Cost Summary Section */}
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            Cost Summary
          </h3>
          <table className="min-w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700">
                <th className="px-4 py-2 border border-gray-300">
                  Cost Category
                </th>
                <th className="px-4 py-2 border border-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Labour Cost",
                  value: selectedCostWorking?.labour_cost,
                },
                {
                  label: "Supervision Cost",
                  value: selectedCostWorking?.supervision_cost,
                },
                {
                  label: "Transport Cost",
                  value: selectedCostWorking?.transport_cost,
                },
                {
                  label: "Consumable Cost",
                  value: selectedCostWorking?.cunsumable_cost,
                },
                {
                  label: "Overhead Charges",
                  value: selectedCostWorking?.over_head_charges,
                },
                {
                  label: "Contractor Profit",
                  value: selectedCostWorking?.contractor_profit,
                },
                {
                  label: "Total Application Labour Cost",
                  value: selectedCostWorking?.total_application_labour_cost,
                },
                {
                  label: "Total Material Cost",
                  value: selectedCostWorking?.total_material_cost,
                },
                {
                  label: "Total Project Cost",
                  value: selectedCostWorking?.total_project_cost,
                },
              ].map((field, index) => (
                <tr key={index} className="text-sm hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300 font-medium">
                    {field.label}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {field.value ?? "N/A"}
                  </td>
                </tr>
              ))}

              {/* Grand Total */}
              <tr className="bg-gray-100 font-semibold text-gray-900">
                <td className="px-4 py-2 border border-gray-300 text-right">
                  Grand Total
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {[
                    selectedCostWorking?.labour_cost || 0,
                    selectedCostWorking?.supervision_cost || 0,
                    selectedCostWorking?.transport_cost || 0,
                    selectedCostWorking?.cunsumable_cost || 0,
                    selectedCostWorking?.over_head_charges || 0,
                    selectedCostWorking?.contractor_profit || 0,
                    selectedCostWorking?.total_application_labour_cost || 0,
                    selectedCostWorking?.total_material_cost || 0,
                  ].reduce((acc, val) => acc + parseFloat(val), 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewCostWorkingModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCostWorkingModal;
