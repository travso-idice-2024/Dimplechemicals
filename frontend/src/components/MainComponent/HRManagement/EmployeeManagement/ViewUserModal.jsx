import React from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ViewUserModal = ({ setViewModalOpen , selectedEmployee,setEditUserModalOpen}) => {
   //console.log("selectedEmployee",selectedEmployee);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[500px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Employee Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2 overflow-y-auto h-[400px]">
          <Detail label="Name" value={selectedEmployee.fullname} />
          <Detail label="Email" value={selectedEmployee.email} />
          <Detail label="Status" value={selectedEmployee.status} />
          <Detail label="Role" value={selectedEmployee.employeeRole.role.role_name} />
          <Detail label="Gender" value={selectedEmployee.gender} />
          <Detail label="Phone" value={selectedEmployee.phone} />
          <Detail label="Department" value={selectedEmployee.jobDetail.department.department_name} />
          <Detail label="Profile Picture" value={selectedEmployee.profile_image
                    ? `${API_URL.replace("api", "")}${selectedEmployee.profile_image}`
                    : ""} isImage />
          <Detail label="Basic Salary" value={selectedEmployee.salary} />
          <Detail label="Bank Account Number" value={selectedEmployee.bankDetail.account_number} />
          <Detail label="IFSC Code" value={selectedEmployee.bankDetail.ifsc_code} />
          <Detail label="Address" value={selectedEmployee.address} />
          <Detail label="Aadhar No." value={selectedEmployee.aadhar_no} />
          <Detail label="PAN No." value={selectedEmployee.pan_no} />
          <Detail label="Offer Letter Date" value={selectedEmployee.jobDetail.offer_letter_date} />
          <Detail label="Joining Date" value={selectedEmployee.jobDetail.date_of_joining} />
          <Detail label="Exit Date" value={selectedEmployee.jobDetail.date_of_exit} />
          <Detail label="Employment Type" value={selectedEmployee.jobDetail.employment_type} />
          <Detail label="Reporting Manager" value={selectedEmployee.jobDetail.reportingManager.fullname} />
          <Detail label="Work Location" value={selectedEmployee.jobDetail.work_location} />
        </div>
        <div className="flex items-end justify-end gap-2 px-6">
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => {setEditUserModalOpen(true)
                setViewModalOpen(false)
              }}
            >
              Edit
            </button>
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

// Reusable component for displaying details
const Detail = ({ label, value, isImage }) => (
  <div className="flex items-center gap-3">
    <label className="font-poppins font-semibold text-[18px] text-bgData">
      {label}
    </label>
    <p className="font-poppins font-semibold text-[18px]">:</p>
    {isImage ? (
      <img src={value} alt={label} className="w-12 h-12 rounded-full" />
    ) : (
      <p>{value}</p>
    )}
    </div>
);

export default ViewUserModal;
