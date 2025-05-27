import React from "react";

const ViewCustomerModal = ({ setViewModalOpen, selectedCustomer }) => {
  console.log(selectedCustomer);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full md:w-[950px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Customer Details
        </h2>

        <div className="overflow-y-auto md:h-[380px]">
          {/* Profile Section */}
          <div className="px-5 py-4">
            <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between bg-[#e5e7eb61] p-2 rounded-[10px]">
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
                    {selectedCustomer.company_name}
                  </h3>
                  <p className="text-gray-600 text-[12px]">
                    {selectedCustomer.email_id}
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
            <div className="grid grid-cols-2 gap-4 bg-[#e5e7eb38] rounded-[5px] px-2 py-2">
              <Detail
                label="Company Name"
                value={selectedCustomer.company_name}
              />

              <Detail
                label="Primary Contact"
                value={selectedCustomer.primary_contact}
              />
              <Detail label="Email Id" value={selectedCustomer.email_id} />

              <Detail label="Pan No." value={selectedCustomer.pan_no} />
              <Detail label="Gst No." value={selectedCustomer.gst_number} />
              <Detail label="Business Associate" value={selectedCustomer?.businessAssociates[0]?.associate_name} />
            </div>
             {/* Multiple Contact Persons */}
             {selectedCustomer?.contactPersons && selectedCustomer?.contactPersons?.length > 0 && (
              <div className="mt-6">
              <h3 className="text-[17px] font-semibold mb-2 text-bgDataNew">
                Contact Persons
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-[#d1d5db] rounded-[5px]">
                  <thead className="bg-[#f3f4f6]">
                    <tr>
                      <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">#</th>
                      <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Designation</th>
                      <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Name</th>
                      <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Email</th>
                      <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer?.contactPersons.map((person, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-[#e5e7eb]">{index + 1}</td>
                        <td className="px-4 py-2 border-b border-[#e5e7eb]">{person.designation}</td>
                        <td className="px-4 py-2 border-b border-[#e5e7eb]">{person.name}</td>
                        <td className="px-4 py-2 border-b border-[#e5e7eb]">{person.email}</td>
                        <td className="px-4 py-2 border-b border-[#e5e7eb]">{person.phone_no}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            )}

            {/* multiple address */}
            {selectedCustomer?.addresses && selectedCustomer?.addresses?.length > 0 && (
           <div className="mt-6">
           <h3 className="text-[17px] font-semibold mb-2 text-bgDataNew">
             Company Address's
           </h3>
           <div className="overflow-x-auto">
             <table className="w-full text-left border border-[#d1d5db] rounded-[5px]">
               <thead className="bg-[#f3f4f6]">
                 <tr>
                   <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">#</th>
                   <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">PIN Code</th>
                   <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Location</th>
                   <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">City</th>
                   <th className="px-4 py-2 border-b border-[#d1d5db] text-gray-700">Address Type</th>
                 </tr>
               </thead>
               <tbody>
                 {selectedCustomer?.addresses?.map((address, index) => (
                   <tr key={index} className="bg-white hover:bg-gray-50">
                     <td className="px-4 py-2 border-b border-[#e5e7eb]">{index + 1}</td>
                     <td className="px-4 py-2 border-b border-[#e5e7eb]">{address.pincode}</td>
                     <td className="px-4 py-2 border-b border-[#e5e7eb]">{address.location}</td>
                     <td className="px-4 py-2 border-b border-[#e5e7eb]">{address.city}</td>
                     <td className="px-4 py-2 border-b border-[#e5e7eb]">{address.address_type}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
         
            
            )}


          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2 px-6">
          <button
            className="mt-4 bg-gray-500 text-texdata text-white px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setViewModalOpen(false)}
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
    <label className="font-poppins font-semibold text-textdata whitespace-nowrap text-bgData">
      {label}
    </label>
    <p className="font-poppins font-semibold text-textdata">:</p>
    <p>{value}</p>
  </div>
);

export default ViewCustomerModal;
