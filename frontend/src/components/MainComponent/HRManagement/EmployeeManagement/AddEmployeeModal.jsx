import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser, listUsers, fetchAllUsers } from "../../../../redux/userSlice";
import { fetchAllRoles } from "../../../../redux/authSlice";
import { fetchAllDepartments } from "../../../../redux/departmentSlice";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";
import SignatureCanvas from "react-signature-canvas";

const AddEmployeeModal = ({ 
  setAddEmployeeModalOpen,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  flashMessage,
  setFlashMessage,
  flashMsgType,
  setFlashMsgType,
  handleFlashMessage,
  handleChange,
  handleFileChange,
  handleMultipleFileChange,
  clearauditSignature,
  saveauditSignature,
  handleSubmit,
  validateInputs,
  sigauditCanvas,
  isSignatureauditEmpty,
  setIsSignatureauditEmpty, }) => {
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

  // const [formData, setFormData] = useState({
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

  // const [formErrors, setFormErrors] = useState({});

  // const [flashMessage, setFlashMessage] = useState("");
  // const [flashMsgType, setFlashMsgType] = useState("");

  // // handle flash messages show
  // const handleFlashMessage = (errorMessage, msgType) => {
  //   console.log("this fun calling");
  //   setFlashMessage(errorMessage);
  //   setFlashMsgType(msgType);
  //   setTimeout(() => {
  //     setFlashMessage("");
  //     setFlashMsgType("");
  //   }, 3000); // Hide the message after 3 seconds
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));

  //   // Clear error when user types
  //   setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       profile_image: file, // Store the file object
  //       profile_image_preview: URL.createObjectURL(file), // For preview
  //     }));

  //     // Clear validation error for profile_image
  //     setFormErrors((prevErrors) => ({ ...prevErrors, profile_image: "" }));
  //   }
  // };

  // //multiple document upload
  // const handleMultipleFileChange = (event) => {
  //   const files = Array.from(event.target.files); // Convert FileList to Array
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     documents: files, // Store multiple selected files
  //   }));
  // };

  // //--------- Signature Data ----------//
  // const sigauditCanvas = useRef(null);
  // const [isSignatureauditEmpty, setIsSignatureauditEmpty] = useState(true);
  // const [currentIndex, setCurrentIndex] = useState(null);

  // // Function to clear the signature
  // const clearauditSignature = () => {
  //   sigauditCanvas.current.clear();
  //   setIsSignatureauditEmpty(true);
  // };

  // const saveauditSignature = () => {
  //   const originalCanvas = sigauditCanvas.current.getTrimmedCanvas();

  //   // Set the willReadFrequently attribute before any read operation
  //   const ctx = originalCanvas.getContext("2d");
  //   ctx.willReadFrequently = true; // Enable this flag to optimize read operations

  //   const resizeWidth = 300;
  //   const aspectRatio = originalCanvas.height / originalCanvas.width;
  //   const resizeHeight = resizeWidth * aspectRatio;

  //   const tempCanvas = document.createElement("canvas");
  //   tempCanvas.width = resizeWidth;
  //   tempCanvas.height = resizeHeight;

  //   const tempCtx = tempCanvas.getContext("2d");
  //   tempCtx.drawImage(originalCanvas, 0, 0, resizeWidth, resizeHeight);

  //   const resizedDataUrl = tempCanvas.toDataURL("image/png");

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     digital_signature: resizedDataUrl,
  //   }));

  //   alert("Saved Signature");
  // };

  // const validateInputs = () => {
  //   let errors = {};

  //   // ✅ Required fields validation (only necessary fields)
  //   if (!formData.fullname.trim()) {
  //     errors.fullname = "*Full name is required";
  //   }
  //   if (!formData.username.trim()) {
  //     errors.username = "*Username is required";
  //   } else if (formData.username.length < 6) {
  //     errors.username = "*Username must be at least 6 characters";
  //   }
  //   if (!formData.email.trim()) {
  //     errors.email = "*Email is required";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     errors.email = "*Invalid email format";
  //   }
  //   if (!formData.phone.trim()) {
  //     errors.phone = "*Phone number is required";
  //   } else if (!/^\d{10}$/.test(formData.phone)) {
  //     errors.phone = "*Phone number must be 10 digits";
  //   }
  //   if (!formData.password.trim()) {
  //     errors.password = "*Password is required";
  //   } else if (formData.password.length < 6) {
  //     errors.password = "*Password must be at least 6 characters";
  //   }
  //   if (!formData.confirm_password.trim()) {
  //     errors.confirm_password = "*Confirm Password is required";
  //   } else if (formData.password !== formData.confirm_password) {
  //     errors.confirm_password = "*Passwords do not match";
  //   }
  //   if (!formData.gender.trim()) {
  //     errors.gender = "*Gender is required";
  //   }
  //   if (!formData.status.trim()) {
  //     errors.status = "*Status is required";
  //   }
  //   if (!formData.role_id.trim()) {
  //     errors.role_id = "*Role is required";
  //   }
  //   if (!formData.department_id.trim()) {
  //     errors.department_id = "*Department is required";
  //   }
  //   // Validate Profile Image (Required)
  //   if (!formData.profile_image) {
  //     errors.profile_image = "Profile picture is required.";
  //   } else if (!formData.profile_image.type.startsWith("image/")) {
  //     errors.profile_image = "Only image files are allowed.";
  //   }
  //   if (!formData.job_title.trim()) {
  //     errors.job_title = "*Job title is required";
  //   }
  //   if (!formData.employment_type.trim()) {
  //     errors.employment_type = "*Employment type is required";
  //   }
  //   if (!formData.date_of_joining.trim()) {
  //     errors.date_of_joining = "*Date of joining is required";
  //   }
  //   if (!formData.salary.trim()) {
  //     errors.salary = "*Salary is required";
  //   }
  //   if (!formData.work_location.trim()) {
  //     errors.work_location = "*Work location is required";
  //   }
  //   if (!formData.bank_name.trim()) {
  //     errors.bank_name = "*Bank name is required";
  //   }
  //   if (!formData.account_number.trim()) {
  //     errors.account_number = "*Account number is required";
  //   }
  //   if (!formData.ifsc_code.trim()) {
  //     errors.ifsc_code = "*IFSC code is required";
  //   }
  //   if (!formData.account_type.trim()) {
  //     errors.account_type = "*Account type is required";
  //   }

  //   // ✅ Update state and return validation result
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // const handleSubmit = async (e) => {
  //   console.log("this function is calling");
  //   e.preventDefault();
  //   if (validateInputs()) {
  //     try {
  //       //console.log("formData", formData);
  //       const response = await dispatch(addUser(formData)).unwrap();
  //       console.log("response", response.success); // Debugging response

  //       if (response.success) {
  //         handleFlashMessage(response?.message, "success");
  //         dispatch(listRoles());
  //       } else {
  //         handleFlashMessage(
  //           response?.message || "Something went wrong",
  //           "error"
  //         );
  //       }
  //       setTimeout(() => {
  //         setAddEmployeeModalOpen(false);
  //       }, 3000);
  //       //setAddUserModalOpen(false);
  //     } catch (error) {
  //       console.error("Error adding employee:", error);
  //       handleFlashMessage(error?.message || "An error occurred", "error"); // Use error.message
  //     }
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {flashMessage && flashMsgType === "success" && (
          <SuccessMessage message={flashMessage} />
        )}
        {flashMessage && flashMsgType === "error" && (
          <ErrorMessage message={flashMessage} />
        )}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full md:w-[1100px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New Employee
          </h2>
          <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto h-[450px]">
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Name :
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="name"
                value={formData.fullname}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.fullname && (
                <p className="text-red-500 text-sm">{formErrors.fullname}</p>
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
                value={formData.username}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm">{formErrors.username}</p>
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
                value={formData.email}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
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
                value={formData.date_of_birth}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.date_of_birth && (
                <p className="text-red-500 text-sm">
                  {formErrors.date_of_birth}
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
                value={formData.date_of_birth}
                onChange={handleChange}
                max={(() => {
                  const today = new Date();
                  today.setFullYear(today.getFullYear() - 18);
                  return today.toISOString().split("T")[0]; // Set max date to 18 years ago
                })()}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[7px]"
              />
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Status:
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-[9px]"
              >
                <option value="">Select the Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {formErrors.status && (
                <p className="text-red-500 text-sm">{formErrors.status}</p>
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
                value={formData.password}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 pr-10"
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-[#473b33]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
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
                value={formData.confirm_password}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 pr-10"
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-[#473b33]"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {showCPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {formErrors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {formErrors.confirm_password}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Role :
              </label>
              <select
                name="role_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
                value={formData.role_id} // Controlled state
                onChange={handleChange} // Update state
              >
                <option value="">Select the Role</option>
                {allRoles?.data?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              {formErrors.role_id && (
                <p className="text-red-500 text-sm">{formErrors.role_id}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
              >
                <option value="">Select the gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && (
                <p className="text-red-500 text-sm">{formErrors.gender}</p>
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
                value={formData.phone}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm">{formErrors.phone}</p>
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
                value={formData.emergency_contact}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.emergency_contact && (
                <p className="text-red-500 text-sm">
                  {formErrors.emergency_contact}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Select the Department:
              </label>
              <select
                name="department_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
                value={formData.department_id} // Controlled state
                onChange={handleChange} // Update state
              >
                <option value="">Select the Department</option>
                {allDepartments?.data?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
              {formErrors.department_id && (
                <p className="text-red-500 text-sm">
                  {formErrors.department_id}
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
                onChange={(e) => handleFileChange(e)}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[5px]"
              />
              {formErrors.profile_image && (
                <p className="text-red-500 text-sm">
                  {formErrors.profile_image}
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
                value={formData.salary}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.salary && (
                <p className="text-red-500 text-sm">{formErrors.salary}</p>
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
                value={formData.bank_name}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.bank_name && (
                <p className="text-red-500 text-sm">{formErrors.bank_name}</p>
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
                value={formData.branch_name}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.branch_name && (
                <p className="text-red-500 text-sm">{formErrors.branch_name}</p>
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
                value={formData.account_type}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.account_type && (
                <p className="text-red-500 text-sm">
                  {formErrors.account_type}
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
                value={formData.account_number}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.account_number && (
                <p className="text-red-500 text-sm">
                  {formErrors.account_number}
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
                value={formData.ifsc_code}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.ifsc_code && (
                <p className="text-red-500 text-sm">{formErrors.ifsc_code}</p>
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
                value={formData.aadhar_no}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.aadhar_no && (
                <p className="text-red-500 text-sm">{formErrors.aadhar_no}</p>
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
                value={formData.pan_no}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.pan_no && (
                <p className="text-red-500 text-sm">{formErrors.pan_no}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Offer Letter Date:
              </label>
              <input
                type="date"
                name="offer_letter_date"
                value={formData.offer_letter_date}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[7px]"
              />
              {formErrors.offer_letter_date && (
                <p className="text-red-500 text-sm">
                  {formErrors.offer_letter_date}
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
                value={formData.date_of_joining}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[7px]"
              />
              {formErrors.date_of_joining && (
                <p className="text-red-500 text-sm">
                  {formErrors.date_of_joining}
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
                  checked={formData.currently_working}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
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
              {formErrors.currently_working && (
                <p className="text-red-500 text-sm">
                  {formErrors.currently_working}
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
                value={formData.date_of_exit}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[7px]"
              />
              {formErrors.date_of_exit && (
                <p className="text-red-500 text-sm">
                  {formErrors.date_of_exit}
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
                value={formData.job_title}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.job_title && (
                <p className="text-red-500 text-sm">{formErrors.job_title}</p>
              )}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Employment Type:
              </label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
              >
                <option value="">Select Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
              {formErrors.employment_type && (
                <p className="text-red-500 text-sm">
                  {formErrors.employment_type}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Reporting Manager:
              </label>
              <select
                name="reporting_manager_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
                value={formData.reporting_manager_id} // Controlled state
                onChange={handleChange} // Update state
              >
                <option value="">Select Reporting Manager</option>
                {allusers?.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullname}{" "}
                    {/* Assuming user object has "name" property */}
                  </option>
                ))}
              </select>
              {formErrors.reporting_manager_id && (
                <p className="text-red-500 text-sm">
                  {formErrors.reporting_manager_id}
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
                value={formData.work_location}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.work_location && (
                <p className="text-red-500 text-sm">
                  {formErrors.work_location}
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
                value={formData.document_type}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.document_type && (
                <p className="text-red-500 text-sm">
                  {formErrors.document_type}
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
                onChange={handleMultipleFileChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
              {formErrors.documents && (
                <p className="text-red-500 text-sm">{formErrors.documents}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Enter the Address:
              </label>
              <textarea
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 resize-none"
                rows="3"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">
                Summary for Remarks:
              </label>
              <textarea
                placeholder="Summary for Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 resize-none"
                rows="3"
              />
              {formErrors.remarks && (
                <p className="text-red-500 text-sm">{formErrors.remarks}</p>
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
            </div>
          </div>
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleSubmit}
            >
              Add Employee
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setAddEmployeeModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployeeModal;
