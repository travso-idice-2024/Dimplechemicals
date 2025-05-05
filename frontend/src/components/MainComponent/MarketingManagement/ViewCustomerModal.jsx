import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadCommunicationById } from "../../../redux/leadSlice";


const ViewCustomerModal = ({ setViewCustomerModalOpen, selectedCustomer }) => {
  const dispatch = useDispatch();
  const { communicationleadsList, totalPages, leadLoading, leadError } =
    useSelector((state) => state.lead);

  //console.log("communicationleadsList", communicationleadsList?.data);

  useEffect(() => {
    if (selectedCustomer?.id) {
      dispatch(
        leadCommunicationById({
          leadId: selectedCustomer?.id
        })
      );
    }
  }, [dispatch, selectedCustomer?.id]);

  //console.log("selectedCustomer", selectedCustomer);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[950px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer Details
        </h2>
        <div className="overflow-y-auto h-fit">
          {/* Profile Section */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between bg-[#e5e7eb61] p-2 rounded-[10px]">
              <div className="flex items-center gap-2">
                {/* <img
                  src={
                    selectedEmployee.profile_image
                      ? `${API_URL.replace("api", "")}${
                          selectedEmployee.profile_image
                        }`
                      : "https://via.placeholder.com/80"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full border"
                /> */}
                <div>
                  <h3 className="text-[15px] font-semibold">
                    {selectedCustomer?.customer?.company_name}
                  </h3>
                  <p className="text-gray-600 text-[12px]">
                    {selectedCustomer?.customer?.email_id}
                  </p>
                </div>
              </div>

              {/* Right Section - Status Badge with Ribbon Effect */}
              <div className="relative inline-block">
                <div className="bg-green-500 text-white font-bold px-5 py-1 rounded-l-lg pr-8 relative text-[14px]">
                  Active
                  {/* <div className="absolute top-0 right-0 h-full w-5 bg-red-500 clip-ribbon"></div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="py-3 px-7">
            <div className="grid grid-cols-2 gap-4 bg-[#e5e7eb38] rounded-[5px] px-4 py-2">
              <Detail
                label="Company Name"
                value={selectedCustomer?.customer?.company_name}
              />
              <Detail
                label="Contact person Name"
                value={selectedCustomer?.customer?.contact_persion1}
              />

              <Detail
                label="Designation"
                value={selectedCustomer?.customer?.designation}
              />
              <Detail
                label="Primary Contact"
                value={selectedCustomer?.customer?.primary_contact}
              />
              <Detail
                label="Email Id"
                value={selectedCustomer?.customer?.email_id}
              />

              <Detail
                label="City"
                value={selectedCustomer?.customer?.location}
              />
              <Detail
                label="Pincode"
                value={selectedCustomer?.customer?.pincode}
              />
              <Detail
                label="Pan No."
                value={selectedCustomer?.customer?.pan_no}
              />
              <Detail label="Address" value={selectedCustomer?.customer?.address} />
            </div>
          </div>



          {/* follow up list */}
          <div>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#473b33] rounded-[8px]">
                  <th className="px-4 py-2 text-left text-bgDataNew">Id</th>
                  <th className="px-4 py-2 text-left text-bgDataNew">Meeting Date</th>
                  <th className="px-4 py-2 text-left text-bgDataNew">Start Time</th>
                  <th className="px-4 py-2 text-left text-bgDataNew">End Time</th>

                  <th className="px-4 py-2 text-left text-bgDataNew">Next Meeting Date</th>
                  <th className="px-4 py-2 text-left text-bgDataNew">
                    Company Name
                  </th>
                  <th className="px-4 py-2 text-left text-bgDataNew">
                    Client Name
                  </th>
                  <th className="px-4 py-2 text-left text-bgDataNew">
                    Communication
                  </th>
                  <th className="px-4 py-2 text-left text-bgDataNew">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {communicationleadsList?.data &&
                  communicationleadsList?.data.map((user, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{index + 1}</td>
                      {/* <td className="px-4 py-2">{user?.lead_date?.split('T')[0]}</td> */}
                      <td className="px-4 py-2">
                        {new Date(user?.createdAt)?.toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-2">{user?.start_meeting_time}</td>
                      <td className="px-4 py-2">{user?.end_meeting_time}</td>

                      <td className="px-4 py-2">
                        {new Date(user?.lead_date)?.toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {user?.Customer?.company_name}
                      </td>
                      <td className="px-4 py-2">{user?.client_name}</td>
                      <td className="px-4 py-2 w-[300px]">
                        {user?.lead_text}
                      </td>
                      <td className="px-4 py-2">{user?.lead_status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* end follow up list */}


        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2 px-6">
          <button
            className="mt-4 bg-gray-500 text-texdata text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewCustomerModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <label className="font-poppins font-semibold text-textdata text-bgData">
      {label}
    </label>
    <p className="font-poppins font-semibold text-textdata">:</p>
    <p>{value}</p>
  </div>
);

export default ViewCustomerModal;
