import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../../redux/categorySlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";

const EditProductModal = ({
  setEditProductModalOpen,
  selectedProduct,
  setSelectedProduct,
  editFormData,
  setEditFormData,
  editFormErrors,
  setEditFormErrors,
  editFlashMessage,
  setEditFlashMessage,
  editFlashMsgType,
  setEditFlashMsgType,
  handleEditChange,
  handleEditSubmit,
}) => {
  const dispatch = useDispatch();
  const { allCategories, categoryLoading, categoryError } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {editFlashMessage && editFlashMsgType === "success" && (
          <SuccessMessage message={editFlashMessage} />
        )}
        {editFlashMessage && editFlashMsgType === "error" && (
          <ErrorMessage message={editFlashMessage} />
        )}
      </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[950px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Edit Product
          </h2>
          <div className="mt-5 md:mt-9 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto h-fit">
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Product Name :
              </label>
              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={editFormData.product_name}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.product_name && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.product_name}
                </p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Select Category :
              </label>
              <select
                name="category_id"
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-[9px]"
                value={editFormData.category_id} // Controlled state
                onChange={handleEditChange} // Update state
              >
                <option value="">Select Category</option>
                {allCategories?.data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              {editFormErrors.category_id && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.category_id}
                </p>
              )}
            </div>

            {/* HSN Code */}
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                HSN Code :
              </label>
              <input
                type="text"
                name="HSN_code"
                placeholder="HSN Code"
                value={editFormData.HSN_code}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.HSN_code && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.HSN_code}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Stock :
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={editFormData.stock}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.stock && (
                <p className="text-red-500 text-sm">{editFormErrors.stock}</p>
              )}
            </div>

            {/* Unit */}
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Unit :
              </label>
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={editFormData.unit}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.unit && (
                <p className="text-red-500 text-sm">{editFormErrors.unit}</p>
              )}
            </div>

            {/* Rate */}
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                Rate :
              </label>
              <input
                type="number"
                name="rate"
                placeholder="Rate"
                value={editFormData.rate}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              />
              {editFormErrors.rate && (
                <p className="text-red-500 text-sm">{editFormErrors.rate}</p>
              )}
            </div>

            {/* Status */}
            <div className="">
              <label className="font-poppins font-medium text-textdata text-bgData">
                Status :
              </label>
              <select
                name="status"
                value={editFormData.status}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2"
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {editFormErrors.status && (
                <p className="text-red-500 text-sm">{editFormErrors.status}</p>
              )}
            </div>

            {/* Product Description */}
            <div className="col-span-3">
              <label className="font-poppins font-medium text-textdata text-bgData">
                Product Description :
              </label>
              <textarea
                name="product_description"
                placeholder="Product Description"
                value={editFormData.product_description}
                onChange={handleEditChange}
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] px-3 py-2 h-[80px]"
              ></textarea>
              {editFormErrors.product_description && (
                <p className="text-red-500 text-sm">
                  {editFormErrors.product_description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-textdata text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleEditSubmit}
            >
              Update Product
            </button>
            <button
              className="mt-4 bg-gray-500 text-textdata text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditProductModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
