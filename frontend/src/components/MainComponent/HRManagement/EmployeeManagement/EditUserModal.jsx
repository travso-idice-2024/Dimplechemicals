import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  listUsers,
  fetchAllUsers,
} from "../../../../redux/userSlice";
import { fetchAllRoles } from "../../../../redux/authSlice";
import { fetchAllDepartments } from "../../../../redux/departmentSlice";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";
import SignatureCanvas from "react-signature-canvas";

const API_URL = import.meta.env.VITE_API_URL;

const EditUserModal = ({ 
  setEditUserModalOpen,
  selectedEmployee,
  setSelectedEmployee,
  updateFormData,
  setupdateFormData,
  updateFormErrors,
  setUpdateFormErrors,
  updateFlashMessage,
  setUpdateFlashMessage,
  updateFlashMsgType,
  setUpdateFlashMsgType,
  handleUpdateChange,
  handleUpdateFileChange,
  handleUpdateMultipleFileChange,
  validateUpdateInputs,
  handleUpdateSubmit,
  handleUpdateFlashMessage, }) => {
  //console.log("selectedEmployee", selectedEmployee);
  const dispatch = useDispatch();

  const { allRoles, loading, error } = useSelector((state) => state.auth);

  const { allDepartments, departmentloading, departmenterror } = useSelector(
    (state) => state.department
  );

  const { allusers, userLoading, userError } = useSelector(
    (state) => state.user
  );

  // Fetch roles whenever searchTerm or currentPage changes
  useEffect(() => {
    dispatch(fetchAllRoles());
    dispatch(fetchAllDepartments());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // const [  updateFormData, set  updateFormData] = useState({
  //   // User Table Fields
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirm_password: "",
  //   phone: "",
  //   emergency_contact: "",
  //   date_of_birth: "",
  //   gender: "",
  //   profile_image: "",
  //   fullname: "",
  //   address: "",
  //   status: "",
  //   aadhar_no: "",
  //   pan_no: "",
  //   remarks: "",
  //   digital_signature: "",

  //   // Employee Roles Table Fields
  //   role_id: "",

  //   // Job Details Table Fields
  //   department_id: "",
  //   job_title: "",
  //   employment_type: "",
  //   date_of_joining: "",
  //   currently_working: "",
  //   salary: "",
  //   work_location: "",
  //   reporting_manager_id: "",
  //   offer_letter_date: "",
  //   date_of_exit: "",

  //   // Bank Details Table Fields
  //   bank_name: "",
  //   account_number: "",
  //   ifsc_code: "",
  //   branch_name: "",
  //   account_type: "",

  //   // Documents Table Fields
  //   documents: [],
  // });

  // const [updateFormErrors, setupdateFormErrors] = useState({});
  // const [flashMessage, setFlashMessage] = useState("");
  // const [flashMsgType, setFlashMsgType] = useState("");

  // useEffect(() => {
  //   if (selectedEmployee) {
  //     set  updateFormData({
  //       username: selectedEmployee.username || "",
  //       email: selectedEmployee.email || "",
  //       password: "",
  //       confirm_password: "",
  //       phone: selectedEmployee.phone || "",
  //       emergency_contact: selectedEmployee.emergency_contact || "",
  //       date_of_birth: selectedEmployee.date_of_birth
  //         ? selectedEmployee.date_of_birth.split("T")[0]
  //         : "",
  //       gender: selectedEmployee.gender || "",
  //       profile_image: selectedEmployee.profile_image || "",
  //       fullname: selectedEmployee.fullname || "",
  //       address: selectedEmployee.address || "",
  //       status: selectedEmployee.status || "",
  //       aadhar_no: selectedEmployee.aadhar_no || "",
  //       pan_no: selectedEmployee.pan_no || "",
  //       remarks: selectedEmployee.remarks || "",
  //       digital_signature: selectedEmployee.digital_signature || "",
  //       role_id: selectedEmployee.employeeRole.role_id || "",
  //       department_id: selectedEmployee.jobDetail.department_id || "",
  //       job_title: selectedEmployee.jobDetail.job_title || "",
  //       employment_type: selectedEmployee.jobDetail.employment_type || "",
  //       date_of_joining: selectedEmployee.jobDetail.date_of_joining
  //         ? selectedEmployee.jobDetail.date_of_joining.split("T")[0]
  //         : "",
  //       currently_working:
  //         selectedEmployee.jobDetail.currently_working || false,
  //       salary: selectedEmployee.jobDetail.salary || "",
  //       work_location: selectedEmployee.jobDetail.work_location || "",
  //       reporting_manager_id:
  //         selectedEmployee.jobDetail.reporting_manager_id || "",
  //       offer_letter_date: selectedEmployee.jobDetail.offer_letter_date
  //         ? selectedEmployee.jobDetail.offer_letter_date.split("T")[0]
  //         : "",
  //       date_of_exit: selectedEmployee.jobDetail.date_of_exit
  //         ? selectedEmployee.jobDetail.date_of_exit.split("T")[0]
  //         : "",
  //       bank_name: selectedEmployee.bankDetail.bank_name || "",
  //       account_number: selectedEmployee.bankDetail.account_number || "",
  //       ifsc_code: selectedEmployee.bankDetail.ifsc_code || "",
  //       branch_name: selectedEmployee.bankDetail.branch_name || "",
  //       account_type: selectedEmployee.bankDetail.account_type || "",
  //       documents: selectedEmployee.documents || [],
  //     });
  //   }
  // }, [selectedEmployee]);

  // const handleFlashMessage = (message, type) => {
  //   setFlashMessage(message);
  //   setFlashMsgType(type);
  //   setTimeout(() => {
  //     setFlashMessage("");
  //     setFlashMsgType("");
  //   }, 3000);
  // };

  // const   handleUpdateChange = (e) => {
  //   const { name, value } = e.target;
  //   set  updateFormData((prevData) => ({ ...prevData, [name]: value }));

  //   // Clear error when user types
  //   setupdateFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  // };

  // const handleUpdateFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     set  updateFormData((prevData) => ({
  //       ...prevData,
  //       profile_image: file, // Store the file object
  //       profile_image_preview: URL.createObjectURL(file), // For preview
  //     }));

  //     // Clear validation error for profile_image
  //     setupdateFormErrors((prevErrors) => ({ ...prevErrors, profile_image: "" }));
  //   }
  // };

  // //multiple document upload
  // const handleUpdateMultipleFileChange = (event) => {
  //   const files = Array.from(event.target.files); // Convert FileList to Array
  //   set  updateFormData((prevState) => ({
  //     ...prevState,
  //     documents: files, // Store multiple selected files
  //   }));
  // };


  const sigauditCanvas = useRef(null);
  const [isSignatureauditEmpty, setIsSignatureauditEmpty] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Function to clear the signature
  const clearauditSignature = () => {
    sigauditCanvas.current.clear();
    setIsSignatureauditEmpty(true);
  };

  const saveauditSignature = () => {
    const originalCanvas = sigauditCanvas.current.getTrimmedCanvas();

    // Set the willReadFrequently attribute before any read operation
    const ctx = originalCanvas.getContext("2d");
    ctx.willReadFrequently = true; // Enable this flag to optimize read operations

    const resizeWidth = 300;
    const aspectRatio = originalCanvas.height / originalCanvas.width;
    const resizeHeight = resizeWidth * aspectRatio;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = resizeWidth;
    tempCanvas.height = resizeHeight;

    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(originalCanvas, 0, 0, resizeWidth, resizeHeight);

    const resizedDataUrl = tempCanvas.toDataURL("image/png");

    console.log("resizedDataUrl" , resizedDataUrl);

    setupdateFormData((prevData) => ({
      ...prevData,
      digital_signature: resizedDataUrl,
    }));

    alert("Saved Signature");
  };

  // const validateInputs = () => {
  //   let errors = {};

  //   // ✅ Required fields validation (only necessary fields)
  //   if (!  updateFormData.fullname.trim()) {
  //     errors.fullname = "*Full name is required";
  //   }
  //   if (!  updateFormData.username.trim()) {
  //     errors.username = "*Username is required";
  //   } else if (  updateFormData.username.length < 6) {
  //     errors.username = "*Username must be at least 6 characters";
  //   }
  //   if (!  updateFormData.email.trim()) {
  //     errors.email = "*Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(  updateFormData.email)) {
  //     errors.email = "*Invalid email format";
  //   }
  //   if (!  updateFormData.phone.trim()) {
  //     errors.phone = "*Phone number is required";
  //   } else if (!/^\d{10}$/.test(  updateFormData.phone)) {
  //     errors.phone = "*Phone number must be 10 digits";
  //   }
  //   // if (!  updateFormData.password.trim()) {
  //   //   errors.password = "*Password is required";
  //   // } else if (  updateFormData.password.length < 6) {
  //   //   errors.password = "*Password must be at least 6 characters";
  //   // }
  //   // if (!  updateFormData.confirm_password.trim()) {
  //   //   errors.confirm_password = "*Confirm Password is required";
  //   // } else if (  updateFormData.password !==   updateFormData.confirm_password) {
  //   //   errors.confirm_password = "*Passwords do not match";
  //   // }

  //   if (!  updateFormData.gender.trim()) {
  //     errors.gender = "*Gender is required";
  //   }
  //   if (!  updateFormData.status.trim()) {
  //     errors.status = "*Status is required";
  //   }
  //   // if (!  updateFormData.role_id.trim()) {
  //   //   errors.role_id = "*Role is required";
  //   // }
  //   // if (!  updateFormData.department_id.trim()) {
  //   //   errors.department_id = "*Department is required";
  //   // }
  //   // Validate Profile Image (Required)
  //   // if (!  updateFormData.profile_image) {
  //   //   errors.profile_image = "Profile picture is required.";
  //   // } else if (!  updateFormData.profile_image.type.startsWith("image/")) {
  //   //   errors.profile_image = "Only image files are allowed.";
  //   // }
  //   if (!  updateFormData.job_title.trim()) {
  //     errors.job_title = "*Job title is required";
  //   }
  //   if (!  updateFormData.employment_type.trim()) {
  //     errors.employment_type = "*Employment type is required";
  //   }
  //   if (!  updateFormData.date_of_joining.trim()) {
  //     errors.date_of_joining = "*Date of joining is required";
  //   }
  //   if (!  updateFormData.salary.trim()) {
  //     errors.salary = "*Salary is required";
  //   }
  //   if (!  updateFormData.work_location.trim()) {
  //     errors.work_location = "*Work location is required";
  //   }
  //   if (!  updateFormData.bank_name.trim()) {
  //     errors.bank_name = "*Bank name is required";
  //   }
  //   if (!  updateFormData.account_number.trim()) {
  //     errors.account_number = "*Account number is required";
  //   }
  //   if (!  updateFormData.ifsc_code.trim()) {
  //     errors.ifsc_code = "*IFSC code is required";
  //   }
  //   if (!  updateFormData.account_type.trim()) {
  //     errors.account_type = "*Account type is required";
  //   }

  //   // ✅ Update state and return validation result
  //   setupdateFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const handleSubmit = async (e) => {
  //   console.log("update function calling");
  //   e.preventDefault();
  //   if (validateInputs()) {
  //     try {
  //       console.log("  updateFormData",   updateFormData);
  //       const response = await dispatch(
  //         updateUser({ id: selectedEmployee.id, userData:   updateFormData })
  //       ).unwrap();

  //       if (response.success) {
  //         handleFlashMessage(response.message, "success");
  //         await dispatch(listUsers());
  //         setTimeout(() => {
  //           setEditUserModalOpen(false);
  //         }, 3000);
  //       } else {
  //         handleFlashMessage(
  //           response.message || "Something went wrong",
  //           "error"
  //         );
  //       }
  //     } catch (error) {
  //       handleFlashMessage(error.message || "An error occurred", "error");
  //     }
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {updateFlashMessage && updateFlashMsgType === "success" && (
          <SuccessMessage message={updateFlashMessage} />
        )}
        {updateFlashMessage && updateFlashMsgType === "error" && (
          <ErrorMessage message={updateFlashMessage} />
        )}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full md:w-[1100px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Update Employee
          </h2>
          <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-3 gap-2 overflow-y-auto h-[450px]">
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Name :
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="name"
                value={  updateFormData.fullname}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.fullname && (
                <p className="text-red-500 text-sm">{updateFormErrors.fullname}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Username :
              </label>
              <input
                type="text"
                name="username"
                placeholder="name"
                value={  updateFormData.username}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.username && (
                <p className="text-red-500 text-sm">{updateFormErrors.username}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Email :
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={  updateFormData.email}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.email && (
                <p className="text-red-500 text-sm">{updateFormErrors.email}</p>
              )}
            </div>

            {/* <div>
                  <label className="font-poppins font-medium text-[18px] text-bgData">
                    Enter Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    placeholder="YYYY-MM-DD"
                    value={  updateFormData.date_of_birth}
                    onChange={  handleUpdateChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                  {updateFormErrors.date_of_birth && (
                    <p className="text-red-500 text-sm">
                      {updateFormErrors.date_of_birth}
                    </p>
                  )}
                </div> */}

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter Date of Birth:
              </label>
              <input
                type="date"
                name="date_of_birth"
                placeholder="YYYY-MM-DD"
                value={  updateFormData.date_of_birth}
                onChange={  handleUpdateChange}
                max={(() => {
                  const today = new Date();
                  today.setFullYear(today.getFullYear() - 18);
                  return today.toISOString().split("T")[0]; // Set max date to 18 years ago
                })()}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Status:
              </label>
              <select
                name="status"
                value={  updateFormData.status}
                onChange={  handleUpdateChange}
                required
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              >
                <option value="" disabled>
                  Select the Status
                </option>
                <option value="Active" selected={  updateFormData.status === "Active"}>
                  Active
                </option>
                <option
                  value="Inactive"
                  selected={  updateFormData.status === "Inactive"}
                >
                  Inactive
                </option>
              </select>
              {updateFormErrors.status && (
                <p className="text-red-500 text-sm">{updateFormErrors.status}</p>
              )}
            </div>

            <div className="relative">
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Password :
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={  updateFormData.password}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 pr-10"
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-[#473b33]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {updateFormErrors.password && (
                <p className="text-red-500 text-sm">{updateFormErrors.password}</p>
              )}
            </div>

            <div className="relative">
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Confirm Password :
              </label>
              <input
                type={showCPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="confirm password"
                value={  updateFormData.confirm_password}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 pr-10"
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-[#473b33]"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {showCPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {updateFormErrors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.confirm_password}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Role :
              </label>
              <select
                name="role_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] 
      focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                value={  updateFormData.role_id} // React will auto-select based on this
                onChange={  handleUpdateChange} // Updates state when changed
              >
                <option value="">Select the Role</option>
                {allRoles?.data?.map((role) => (
                  <option
                    key={role.id}
                    value={role.id}
                    selected={  updateFormData.role_id === role.id}
                  >
                    {role.role_name}
                  </option>
                ))}
              </select>
              {updateFormErrors.role_id && (
                <p className="text-red-500 text-sm">{updateFormErrors.role_id}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Gender:
              </label>
              <select
                name="gender"
                value={  updateFormData.gender}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select the gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {updateFormErrors.gender && (
                <p className="text-red-500 text-sm">{updateFormErrors.gender}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Phone :
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={  updateFormData.phone}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.phone && (
                <p className="text-red-500 text-sm">{updateFormErrors.phone}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Emergency Contact :
              </label>
              <input
                type="number"
                name="emergency_contact"
                placeholder="emergency contact"
                value={  updateFormData.emergency_contact}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.emergency_contact && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.emergency_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Department:
              </label>
              <select
                name="department_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                value={  updateFormData.department_id} // Controlled state
                onChange={  handleUpdateChange} // Update state
              >
                <option value="">Select the Department</option>
                {allDepartments?.data?.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                    selected={  updateFormData.department_id === department.id}
                  >
                    {department.department_name}
                  </option>
                ))}
              </select>
              {updateFormErrors.department_id && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.department_id}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Upload Profile Picture:
              </label>
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={(e) => handleUpdateFileChange(e)}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              <img
                src={
                    updateFormData.profile_image
                    ? `${API_URL.replace("api", "")}${  updateFormData.profile_image}`
                    : ""
                }
                className="w-10"
                alt="Profile"
              />
              {updateFormErrors.profile_image && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.profile_image}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Basic Salary:
              </label>
              <input
                type="number"
                name="salary"
                placeholder="Basic Salary"
                value={  updateFormData.salary}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.salary && (
                <p className="text-red-500 text-sm">{updateFormErrors.salary}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Bank Name:
              </label>
              <input
                type="text"
                name="bank_name"
                placeholder="Bank Name"
                value={  updateFormData.bank_name}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.bank_name && (
                <p className="text-red-500 text-sm">{updateFormErrors.bank_name}</p>
              )}
            </div>

            {/* Branch Name */}
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Branch Name:
              </label>
              <input
                type="text"
                name="branch_name"
                placeholder="Branch Name"
                value={  updateFormData.branch_name}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.branch_name && (
                <p className="text-red-500 text-sm">{updateFormErrors.branch_name}</p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Account Type:
              </label>
              <input
                type="text"
                name="account_type"
                placeholder="Account Type"
                value={  updateFormData.account_type}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.account_type && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.account_type}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Bank Account Number:
              </label>
              <input
                type="number"
                name="account_number"
                placeholder="Bank Account Number"
                value={  updateFormData.account_number}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.account_number && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.account_number}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the IFSC Code:
              </label>
              <input
                type="text"
                name="ifsc_code"
                placeholder="IFSC Code"
                value={  updateFormData.ifsc_code}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.ifsc_code && (
                <p className="text-red-500 text-sm">{updateFormErrors.ifsc_code}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Aadhar No:
              </label>
              <input
                type="number"
                name="aadhar_no"
                placeholder="Aadhar No"
                value={  updateFormData.aadhar_no}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.aadhar_no && (
                <p className="text-red-500 text-sm">{updateFormErrors.aadhar_no}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the PAN No:
              </label>
              <input
                type="text"
                name="pan_no"
                placeholder="PAN No"
                value={  updateFormData.pan_no}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.pan_no && (
                <p className="text-red-500 text-sm">{updateFormErrors.pan_no}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Offer Letter Date:
              </label>
              <input
                type="date"
                name="offer_letter_date"
                value={  updateFormData.offer_letter_date}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.offer_letter_date && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.offer_letter_date}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Joining Date:
              </label>
              <input
                type="date"
                name="date_of_joining"
                value={  updateFormData.date_of_joining}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.date_of_joining && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.date_of_joining}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Currently Working:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="currently_working"
                  checked={  updateFormData.currently_working}
                  onChange={(e) =>
                    setupdateFormData({
                      ...  updateFormData,
                      currently_working: e.target.checked,
                    })
                  }
                  className="w-5 h-5 border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] rounded"
                />
                <label
                  htmlFor="currently_working"
                  className="font-poppins text-[18px]"
                >
                  Yes
                </label>
              </div>
              {updateFormErrors.currently_working && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.currently_working}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Exit Date:
              </label>
              <input
                type="date"
                name="date_of_exit"
                value={  updateFormData.date_of_exit}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.date_of_exit && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.date_of_exit}
                </p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Designantion:
              </label>
              <input
                type="text"
                name="job_title"
                placeholder="Designantion"
                value={  updateFormData.job_title}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.job_title && (
                <p className="text-red-500 text-sm">{updateFormErrors.job_title}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Employment Type:
              </label>
              <select
                name="employment_type"
                value={  updateFormData.employment_type}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
              {updateFormErrors.employment_type && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.employment_type}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Reporting Manager:
              </label>
              <select
                name="reporting_manager_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                value={  updateFormData.reporting_manager_id} // Controlled state
                onChange={  handleUpdateChange} // Update state
              >
                <option value="">Select Reporting Manager</option>
                {allusers?.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullname}{" "}
                    {/* Assuming user object has "name" property */}
                  </option>
                ))}
              </select>
              {updateFormErrors.reporting_manager_id && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.reporting_manager_id}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Reporting Location:
              </label>
              <input
                type="text"
                name="work_location"
                placeholder="Enter Work Location"
                value={  updateFormData.work_location}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.work_location && (
                <p className="text-red-500 text-sm">
                  {updateFormErrors.work_location}
                </p>
              )}
            </div>
            {/* <div>
                  <label className="font-poppins font-medium text-[18px] text-bgData">
                    Enter the Document Type:
                  </label>
                  <input
                    type="text"
                    name="document_type"
                    placeholder="Document Type"
                    value={  updateFormData.document_type}
                    onChange={  handleUpdateChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                  {updateFormErrors.document_type && (
                    <p className="text-red-500 text-sm">
                      {updateFormErrors.document_type}
                    </p>
                  )}
                </div> */}

            {/* File Path */}
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Documents Upload:
              </label>
              <input
                type="file"
                name="documents"
                multiple
                onChange={handleUpdateMultipleFileChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {updateFormErrors.documents && (
                <p className="text-red-500 text-sm">{updateFormErrors.documents}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Address:
              </label>
              <textarea
                placeholder="Address"
                name="address"
                value={  updateFormData.address}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 resize-none"
                rows="3"
              />
              {updateFormErrors.address && (
                <p className="text-red-500 text-sm">{updateFormErrors.address}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Summary for Remarks:
              </label>
              <textarea
                placeholder="Summary for Remarks"
                name="remarks"
                value={  updateFormData.remarks}
                onChange={  handleUpdateChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 resize-none"
                rows="3"
              />
              {updateFormErrors.remarks && (
                <p className="text-red-500 text-sm">{updateFormErrors.remarks}</p>
              )}
            </div>

            {/* digital signature */}
            {/* <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Digital Signature:
              </label>
              <div className="border border-solid border-[#473b33] p-2">
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-[150px] bg-white rounded",
                  }}
                  ref={(ref) => setSigPad(ref)}
                />
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="mt-2 mr-2 bg-gray-300 p-2"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={saveSignature}
                className="mt-2 bg-blue-500 text-white p-2"
              >
                Save Signature
              </button>
              <img
                src={  updateFormData.digital_signature} // Assuming   updateFormData.digital_signature contains the base64 data
                alt="Digital Signature"
                style={{ width: "50px", height: "50px" }} // Adjust size if needed
              />
            </div> */}

            <div className="">
              <label className="font-poppins font-medium text-[16px] text-bgData">
                Upload Written Signature :
              </label>

              <div className="signature-container block w-full mb-2 text-black rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 placeholder:text-gray-400">
                <SignatureCanvas
                  ref={sigauditCanvas}
                  penColor="white"
                  canvasProps={{
                    width: 312,
                    height: 150,
                    className: "signature-canvas",
                    style: {
                      borderRadius: "8px",
                      backgroundColor: "#fe6c00",
                    },
                  }}
                  onEnd={() => setIsSignatureauditEmpty(false)}
                />
                <div className="flex items-center justify-end gap-2 mt-2">
                  <div
                    onClick={clearauditSignature}
                    className="bg-gray-500 text-[15px] text-white px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    Clear
                  </div>
                  <div
                    onClick={saveauditSignature}
                    disabled={isSignatureauditEmpty}
                    className={`${
                      isSignatureauditEmpty
                        ? "bg-gray-400 cursor-not-allowed" // Disabled state style
                        : "bg-green-700 hover:bg-green-600 cursor-pointer" // Enabled state style
                    } text-[15px] text-white px-3 py-1 rounded`}
                  >
                    Save Signature
                  </div>
                </div>
              </div>
              <img
              src={  updateFormData.digital_signature} // Assuming   updateFormData.digital_signature contains the base64 data
              alt="Digital Signature"
              style={{ width: "100px", height: "60px" , background:"#fe6c00", padding:"5px"}} // Adjust size if needed
            />
            </div>

            
          </div>
          
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleUpdateSubmit}
            >
              Update Employee
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditUserModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
