import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { fetchAllProducts } from "../../../redux/productSlice";

const AddCostWorkingModal = ({
  setIsCostWorkingModalOpen,
  costWorkingData,
  setCostWorkingData,
  costWorkingFormErrors,
  costWorkingFlashMessage,
  costWorkingFlashMsgType,
  handleCostWorkingChange,
  handleSubmitCostWorking,
  allCustomers,
  handleCostWorkingCustomerChange,
  customerAddress,
}) => {
  //console.log("costWorkingFormErrors", costWorkingFormErrors);
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
    setCostWorkingData((prevData) => ({
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
    const updatedProducts = [...costWorkingData.products];
    updatedProducts.splice(index, 1);

    // Recalculate total material cost
    const totalMaterialCost = updatedProducts.reduce((total, item) => {
      const basicAmount = parseFloat(item.basic_amount);
      return total + (isNaN(basicAmount) ? 0 : basicAmount);
    }, 0);

    setCostWorkingData({
      ...costWorkingData,
      products: updatedProducts,
      total_material_cost: totalMaterialCost.toFixed(2),
    });
  };

  // Function to handle product input change

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;

    const updatedProducts = [...costWorkingData.products];
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
    setCostWorkingData({
      ...costWorkingData,
      products: updatedProducts,
      total_material_cost: totalMaterialCost.toFixed(2),
    });
  };

  const fields = [
    { name: "unit", placeholder: "Unit No." },
    { name: "qty_for", placeholder: "Quantity" },
    { name: "std_pak", placeholder: "Std Pack (Unit No.)" },
    { name: "std_basic_rate", placeholder: "Std Basic Rate" },
    { name: "basic_amount", placeholder: "Basic Amount" },
  ];

  return (
    <>
      {/* Flash Messages */}
      <div className="fixed top-5 right-5 z-50">
        {costWorkingFlashMessage && costWorkingFlashMsgType === "success" && (
          <SuccessMessage message={costWorkingFlashMessage} />
        )}
        {costWorkingFlashMessage && costWorkingFlashMsgType === "error" && (
          <ErrorMessage message={costWorkingFlashMessage} />
        )}
      </div>

      {/* Modal Container */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[1100px]  rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add Cost Working
          </h2>

          <div className="p-4 mt-5 overflow-y-auto h-[440px]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
              {/* Select Customer */}
              <div>
                <label className="font-poppins font-medium text-textdata text-bgData">
                  Select Name of Company:
                </label>
                <select
                  name="company_name"
                  value={costWorkingData.company_name || ""}
                  onChange={handleCostWorkingCustomerChange}
                  className="block w-full text-textdata mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-[9.50px]"
                >
                  <option value="">Select the Customer</option>
                  {allCustomers?.data?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.company_name}
                    </option>
                  ))}
                </select>
                {costWorkingFormErrors?.company_name && (
                  <p className="text-red-500">
                    {costWorkingFormErrors?.company_name}
                  </p>
                )}
              </div>

              {/* Select Address */}
              {costWorkingData.company_name && (
                <div>
                  <label className="font-poppins font-medium text-textdata text-bgData">
                    Select Location Site:
                  </label>
                  <select
                    name="location"
                    value={costWorkingData.location || ""}
                    onChange={handleCostWorkingChange}
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
              {/* Additional Fields */}
              {[
                "estimate_date",
                "nature_of_work",
                "technology_used",
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
                  <label className="font-poppins font-medium text-textdata text-bgData">
                    {field
                      .split("_") // Split by underscore
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      ) // Capitalize each word
                      .join(" ")}
                    :
                  </label>
                  <input
                    type={field.includes("date") ? "date" : "text"}
                    name={field}
                    value={costWorkingData[field]}
                    onChange={handleCostWorkingChange}
                    className="block w-full mb-2 rounded-[5px] border px-3 py-2 border border-solid border-[#473b33]"
                  />
                  {costWorkingFormErrors?.[field] && (
                    <p className="text-red-500 text-sm">
                      {costWorkingFormErrors[field]}
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
              {costWorkingData.products.map((product, index) => (
                <>
                  <h3 className=" text-bgDataNew font-poppins font-medium text-textdatanew text-bgData mt-5">
                    Product {index + 1} :
                  </h3>
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                  >
                    {/* Product ID as Dropdown */}
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

                    {/* Other Input Fields (excluding total_material_cost) */}
                    {/* {[
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
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        className="block w-full rounded-[5px] border px-3 py-2"
                      />
                    ))} */}

                    {fields.map(({ name, placeholder }) => (
                      <input
                        key={name}
                        type="text"
                        name={name}
                        value={product[name] || ""}
                        onChange={(e) => handleProductChange(e, index)}
                        placeholder={placeholder}
                        className="block w-full rounded-[5px] border px-3 py-2"
                      />
                    ))}

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove Product Field
                    </button>
                  </div>
                </>
              ))}

              {/* Add Product Button */}
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-orange-600 mt-2"
              >
                Add Product
              </button>

              {/* Display Total Material Cost */}
              <div className="mt-4 font-poppins bg-bgDataNew w-fit text-white text-center rounded-[5px] py-2 px-3 text-[16px] font-semibold text-bgData">
                Total Material Cost: &nbsp;₹{" "}
                {costWorkingData.total_material_cost || 0}
              </div>
            </div>
          </div>

          {/* Submit and Close Buttons */}
          <div className="flex items-end justify-end gap-2 px-4 my-4">
            <button
              type="submit"
              className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
              onClick={handleSubmitCostWorking}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsCostWorkingModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCostWorkingModal;
