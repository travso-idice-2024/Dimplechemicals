import React from "react";
import { useNavigate } from "react-router-dom";

const ViewCostWorkingModal = ({
  setViewCostWorkingModalOpen,
  selectedCostWorking,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white md:w-[1000px]  rounded-[6px]">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Cost Working Report
        </h2>
        <div className="p-4 mt-5 overflow-y-auto h-[440px]">
          {/* General Information */}
          <h3 className="-mb-0 text-black font-poppins border bg-gray-400 py-2 rounded-t-[4px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
            Cost Working Format
          </h3>
          <div className="border border-gray-400 mx-[2px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-2">
              {[
                [
                  {
                    label: "Name of Company",
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
                  {
                    label: "Estimate No",
                    value: selectedCostWorking?.estimate_no,
                  },
                  {
                    label: "Estimate Date",
                    value: selectedCostWorking?.estimate_date?.split("T")[0],
                  },
                  {
                    label: "Revision No",
                    value: selectedCostWorking?.revision_no,
                  },
                  {
                    label: "Revision Date",
                    value: selectedCostWorking?.revision_date?.split("T")[0],
                  },
                ],
              ].map((fields, tableIndex) => (
                <div key={tableIndex} className="overflow-x-auto">
                  <table className="min-w-full table-auto border border-gray-300">
                    <tbody>
                      {fields.map((field, index) => (
                        <tr key={index} className="hover:bg-gray-50 whitespace-nowrap">
                          <td className="px-4 py-2 text-bgDataNew font-poopins text-[16px] border border-gray-300 font-medium">
                            {field.label}:
                          </td>
                          <td className="px-4 py-2 text-[15px] text-gray-600 border border-gray-300">
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
            <div className="overflow-x-auto mt-12">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-400">
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
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2 text-left"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedCostWorking?.products?.map((material, index) => (
                    <tr key={index} className="hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material?.Product?.product_name}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material?.Product?.HSN_code}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.qty_for}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.unit}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.qty_for}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.std_pak}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.std_basic_rate}
                      </td>
                      <td className="border border-gray-300 text-gray-700 text-[14px] px-4 py-2">
                        {material.basic_amount}
                      </td>
                    </tr>
                  ))}

                  {/* Total Row */}
                  <tr className="bg-gray-100 font-semibold text-gray-800">
                    <td
                      className="border border-gray-300 text-bgDataNew text-[14px] px-4 py-2 text-right"
                      colSpan={8}
                    >
                      Total Material Cost:
                    </td>
                    <td className="border border-gray-300 text-bgDataNew text-[14px] px-4 py-2">
                      {selectedCostWorking?.total_material_cost ?? "0"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cost Summary Section */}
            <div className="mt-12 overflow-x-auto">
              {/* <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
                Cost Summary
              </h3> */}
              <table className="min-w-full table-auto border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-400 text-left">
                    <th className="px-4 py-2 border font-poopins text-black font-medium text-[16px] border-gray-300">
                      Cost Category
                    </th>
                    <th className="px-4 py-2 border font-poopins text-black font-medium text-[16px] border-gray-300">Amount</th>
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
                    <tr key={index} className="text-sm hover:bg-gray-200 cursor-pointer">
                      <td className="px-4 py-2 border text-gray-700 text-[15px] border-gray-300 font-medium">
                        {field.label}
                      </td>
                      <td className="px-4 py-2 text-gray-700 text-[13.5px] font-poppins border border-gray-300">
                        {field.value ?? "N/A"}
                      </td>
                    </tr>
                  ))}

                  {/* Grand Total */}
                  <tr className="bg-gray-100 font-semibold text-black">
                    <td className="px-4 py-2 text-bgDataNew border border-gray-300 text-right">
                      Grand Total : 
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-bgDataNew ">
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
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-end justify-end gap-2 px-4 my-4">
          <button
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
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
