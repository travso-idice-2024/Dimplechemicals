import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDepartment, listDepartments } from "../../../redux/departmentSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const EditDepartmentModal = ({ setEditModalOpen, selectedDepartment }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    department_name: "",
    status: "",
    department_description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        department_name: selectedDepartment.department_name || "",
        status: selectedDepartment.status || "Active",
        department_description: selectedDepartment.department_description || "",
      });
    }
  }, [selectedDepartment]);

  const handleFlashMessage = (message, type) => {
    setFlashMessage(message);
    setFlashMsgType(type);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateInputs = () => {
    let errors = {};
    if (!formData.department_name.trim()) {
      errors.department_name = "*Department name is required";
    }
    if (!formData.status.trim()) {
      errors.status = "*Department status is required";
    }
    if (!formData.department_description.trim()) {
      errors.department_description = "*Department description is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await dispatch(
          updateDepartment({ id: selectedDepartment.id, departmentData: formData })
        ).unwrap();

        if (response.success) {
          handleFlashMessage(response.message, "success");
          await dispatch(listDepartments());
          setTimeout(() => {
            setEditModalOpen(false);
          }, 3000);
        } else {
          handleFlashMessage(response.message || "Something went wrong", "error");
        }
      } catch (error) {
        handleFlashMessage(error.message || "An error occurred", "error");
      }
    }
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {flashMessage && flashMsgType === "success" && <SuccessMessage message={flashMessage} />}
        {flashMessage && flashMsgType === "error" && <ErrorMessage message={flashMessage} />}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Edit Department
          </h2>

          <div className="mt-5 md:mt-5 px-4 flex flex-col gap-2">
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">Department Name:</label>
              <input
                type="text"
                name="department_name"
                value={formData.department_name}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {formErrors.department_name && <p className="text-red-500 text-sm">{formErrors.department_name}</p>}
            </div>
            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="font-poppins font-medium text-[18px] text-bgData">Department Description:</label>
              <textarea
                name="department_description"
                value={formData.department_description}
                onChange={handleChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {formErrors.department_description && <p className="text-red-500 text-sm">{formErrors.department_description}</p>}
            </div>

            <div className="flex items-end justify-end gap-2">
              <button onClick={handleSubmit} className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]">
                Save Changes
              </button>
              <button
                className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDepartmentModal;