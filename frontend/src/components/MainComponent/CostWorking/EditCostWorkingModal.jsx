import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { fetchAllProducts } from "../../../redux/productSlice";

const EditCostWorkingModal = ({
  setEditCostWorkingModalOpen,
  selectedCostWorking,
  setSelectedCostWorking,
  allCustomers,
  editCostWorkingData,
  setEditCostWorkingData,
  editCostWorkingFormErrors,
  setEditCostWorkingFormErrors,
  editCostWorkingFlashMessage,
  setEditCostWorkingFlashMessage,
  editCostWorkingFlashMsgType,
  setEditCostWorkingFlashMsgType,
  handleEditCostWorkingChange,
  handleEditCostWorkingFlashMessage,
  editCostWorkingValidateForm,
  handleSubmitEditCostWorking,
  handleEditCostWorkingCustomerChange,
  customerAddress,
}) => {
  const dispatch = useDispatch();
  const { allProducts, totalPages, productLoading, productError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //console.log("allProducts", allProducts?.data);
  // Function to add a new product entry
  const handleAddProduct = () => {
    setEditCostWorkingData((prevData) => ({
      ...prevData,
      products: [
        ...prevData.products,
        {
          product_id: "",
          unit: "",
          qty_for: "",
          std_pak: "",
          std_basic_rate: "",
          basic_amount: "",
        },
      ],
    }));
  };

  // Function to remove a product entry
  const handleRemoveProduct = (index) => {
    const updatedProducts = [...editCostWorkingData.products];
    updatedProducts.splice(index, 1);

    // Recalculate total material cost
    const totalMaterialCost = updatedProducts.reduce((total, item) => {
      const basicAmount = parseFloat(item.basic_amount);
      return total + (isNaN(basicAmount) ? 0 : basicAmount);
    }, 0);

    setEditCostWorkingData({
      ...editCostWorkingData,
      products: updatedProducts,
      total_material_cost: totalMaterialCost.toFixed(2),
    });
  };

  // Function to handle product input change

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;

    const updatedProducts = [...editCostWorkingData.products];
    const productToUpdate = { ...updatedProducts[index] };

    // Update the value
    productToUpdate[name] = value;

    // Recalculate basic_amount if relevant fields changed
    const qty = parseFloat(productToUpdate.qty_for) || 0;
    const pak = parseFloat(productToUpdate.std_pak) || 0;
    const rate = parseFloat(productToUpdate.std_basic_rate) || 0;

    productToUpdate.basic_amount = (qty * pak * rate).toFixed(2);

    // Replace updated product
    updatedProducts[index] = productToUpdate;

    // Recalculate total material cost
    const totalMaterialCost = updatedProducts.reduce(
      (sum, item) => sum + (parseFloat(item.basic_amount) || 0),
      0
    );

    // Update full state
    setEditCostWorkingData({
      ...editCostWorkingData,
      products: updatedProducts,
      total_material_cost: totalMaterialCost.toFixed(2),
    });
  };

  return (
    <>
      {/* Flash Messages */}
      <div className="fixed top-5 right-5 z-50">
        {editCostWorkingFlashMessage &&
          editCostWorkingFlashMsgType === "success" && (
            <SuccessMessage message={editCostWorkingFlashMessage} />
          )}
        {editCostWorkingFlashMessage &&
          editCostWorkingFlashMsgType === "error" && (
            <ErrorMessage message={editCostWorkingFlashMessage} />
          )}
      </div>

      {/* Modal Container */}
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full md:w-[900px] rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Update Cost Working
          </h2>

          <div className="p-4 mt-5 overflow-y-auto h-[440px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-48 gap-y-2">
              {/* Select Customer */}
              <div>
                <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                  Select Name of Company:
                </label>
                <select
                  name="company_name"
                  value={editCostWorkingData.company_name || ""}
                  onChange={handleEditCostWorkingCustomerChange}
                  className="block w-full text-textdata whitespace-nowrap mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                >
                  <option value="">Select the Customer</option>
                  {allCustomers?.data?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.company_name}
                    </option>
                  ))}
                </select>
                {editCostWorkingFormErrors?.company_name && (
                  <p className="text-red-500">
                    {editCostWorkingFormErrors?.company_name}
                  </p>
                )}
              </div>

              {/* Select Address */}
              {editCostWorkingData.company_name && (
                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Select Location:
                  </label>
                  <select
                    name="location"
                    value={editCostWorkingData.location || ""}
                    onChange={handleEditCostWorkingChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                  >
                    <option value="">Select the Address</option>
                    {customerAddress?.data?.addresses?.map((address, index) => (
                      <option key={index} value={address}>
                        {address}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dynamic Input Fields */}
              {[
                "nature_of_work",
                "technology_used",
                "estimate_date",
                "revision_date",
                "area_to_be_coated",
                "thickness_in_mm",
                "labour_cost",
                "cunsumable_cost",
                "transport_cost",
                "supervision_cost",
                "contractor_profit",
                "over_head_charges",
                "total_application_labour_cost",
                "total_project_cost",
              ].map((field) => (
                <div key={field}>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    :
                  </label>
                  <input
                    type={field.includes("date") ? "date" : "text"}
                    name={field}
                    value={editCostWorkingData[field]}
                    onChange={handleEditCostWorkingChange}
                    className="block w-full mb-2 rounded-[5px] border px-3 py-2 border border-solid border-[#473b33]"
                  />
                  {editCostWorkingFormErrors?.[field] && (
                    <p className="text-red-500 text-sm">
                      {editCostWorkingFormErrors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>


{/* Product List */}
<h3 className="mt-12 mb-2 text-bgDataNew font-poppins border w-[300px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Products
            </h3>
            <div className="px-4">
              
              {editCostWorkingData.products.map((product, index) => (
                <>
                <h3 className=" text-bgDataNew font-poppins font-medium text-textdatanew text-bgData mt-5">
                  Product {index+1} :
                </h3>
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                >
                  <select
                    name="product_id"
                    value={product.product_id || ""}
                    onChange={(e) => handleProductChange(e, index)}
                    className="block w-full rounded-[5px] border px-3 py-2"
                  >
                    <option value="">Select Product</option>
                    {allProducts?.data?.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.product_name}
                      </option>
                    ))}
                  </select>

                  {[
                    "unit",
                    "qty_for",
                    "std_pak",
                    "std_basic_rate",
                    "basic_amount",
                  ].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      value={product[field] || ""}
                      onChange={(e) => handleProductChange(e, index)}
                      placeholder={field
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                      className="block w-full rounded-[5px] border px-3 py-2"
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() => handleEditRemoveProduct(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove Product Field
                  </button>
                </div>
                </>
              ))}

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-orange-600 mt-2"
              >
                Add Product
              </button>

              <div className="mt-4 font-poppins bg-bgDataNew w-fit text-white text-center rounded-[5px] py-2 px-3 text-[16px] font-semibold text-bgData">
                Total Material Cost: ₹{" "}
                {editCostWorkingData.total_material_cost || 0}
              </div>
            </div>
          </div>

          {/* Submit and Close Buttons */}
          <div className="flex items-end justify-end gap-2 px-4 my-4">
            <button
              type="submit"
              className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
              onClick={handleSubmitEditCostWorking}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditCostWorkingModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCostWorkingModal;
