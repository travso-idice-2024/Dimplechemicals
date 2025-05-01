import React from "react";
import { useNavigate } from "react-router-dom";

const ViewUserModal = ({ setViewModalOpen, selectedLead }) => {
  const navigate = useNavigate();
  console.log("selectedLead", selectedLead);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[800px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Lead Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Company Name */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Company Name
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.customer?.company_name}</p>
            </div>

            {/* Client Name */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Client Name
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.customer?.client_name}</p>
            </div>

            {/* Lead Owner */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Lead Owner
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.leadOwner?.fullname}</p>
            </div>

            {/* Lead Source */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Lead Source
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.lead_source}</p>
            </div>

            {/* Lead Status */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Lead Status
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.lead_status}</p>
            </div>

            {/* Assigned Person */}
            <div className="flex items-center gap-3">
              <label className="font-poppins font-semibold text-textdata text-bgData">
                Assigned Person
              </label>
              <p className="font-poppins font-semibold text-textdata">:</p>
              <p>{selectedLead?.assignedPerson?.fullname}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* <div className="mt-4">
              <label className="font-poppins font-semibold text-textdata text-bgData block mb-2">
                Lead Re-Assigned Persons
              </label>

              {selectedLead?.assignmentHistory?.length > 0 ? (
                <table className="w-full text-left border border-gray-300 text-sm shadow-md rounded">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="border px-3 py-2">Sr No.</th>
                      <th className="border px-3 py-2">Assigned Person</th>
                      <th className="border px-3 py-2">Assigned Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLead.assignmentHistory.map((person, index) => {
                      const formattedDate = new Date(
                        person.createdAt
                      ).toLocaleDateString("en-GB"); // DD-MM-YYYY

                      return (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="border px-3 py-2">{index + 1}</td>
                          <td className="border px-3 py-2">
                            {person?.assignedPerson?.fullname}
                          </td>
                          <td className="border px-3 py-2">{formattedDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No assigned persons found.
                </p>
              )}
            </div> */}
            <div className="mt-4">
              <label className="font-poppins font-semibold text-[18px] text-center text-bgData block mb-2">
                Lead Re-Assigned Persons
              </label>

              {selectedLead?.assignmentHistory?.length > 0 ? (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  {selectedLead.assignmentHistory.map((person, index) => {
                    const formattedDate = new Date(
                      person.createdAt
                    ).toLocaleDateString("en-GB"); // DD-MM-YYYY

                    return (
                      <React.Fragment key={index}>
                        {/* Card */}
                        <div className="bg-gray-100 p-4 rounded-md shadow-md text-center min-w-[200px] flex flex-col items-center">
                          <p className="text-sm font-semibold text-gray-500">
                            #{index + 1}
                          </p>
                          <p className="text-base font-bold text-gray-800 mt-1">
                            {person?.assignedPerson?.fullname || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Assigned on: {formattedDate}
                          </p>
                        </div>

                        {/* Arrow */}
                        {index < selectedLead.assignmentHistory.length - 1 && (
                          <div className="text-[25px] text-green-800 font-bold">→</div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No assigned persons found.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button
              className="mt-4 text-textdata bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
