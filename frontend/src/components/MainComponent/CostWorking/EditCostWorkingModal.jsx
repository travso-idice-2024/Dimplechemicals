import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { fetchAllProducts } from "../../../redux/productSlice";
import { fetchAllCategories } from "../../../redux/categorySlice";
import CategoryAutocomplete from "./CategoryAutocomplete";
import Select from "react-select";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

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
  //console.log("editCostWorkingData", editCostWorkingData);
  const dispatch = useDispatch();
  const { allProducts, totalPages, productLoading, productError } = useSelector(
    (state) => state.product
  );

  const { allCategories, categoryLoading, categoryError } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
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
          category_id: "",
          product_id: "",
          unit: "",
          qty_for: "",
          std_pak: "",
          std_basic_rate: "",
          basic_amount: "",
          qty_for_1:""
        },
      ],
    }));
    setProductOptions((prev) => [...prev, []]);
  };

  const [productOptions, setProductOptions] = useState([]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const token = getAuthToken();
      //console.log("token",token);
      const response = await axios.get(
        `${API_URL}/auth/get-product-category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.data);

      return response.data.data; // assuming your API responds with { data: [...] }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadProductOptionsForEdit = async () => {
      const optionsArray = [...productOptions]; // clone

      for (let i = 0; i < editCostWorkingData?.products?.length; i++) {
        const prod = editCostWorkingData?.products[i];
        if (prod.category_id) {
          const products = await fetchProductsByCategory(prod.category_id);
          optionsArray[i] = products;
        }
      }

      setProductOptions(optionsArray);
    };

    if (editCostWorkingData?.products?.length > 0) {
      loadProductOptionsForEdit();
    }
  }, [editCostWorkingData?.products]);

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

  const handleProductChange = async (e, index) => {
    const { name, value } = e.target;

    const updatedProducts = [...editCostWorkingData.products];
    const productToUpdate = { ...updatedProducts[index] };

    // Update the value
    productToUpdate[name] = value;

    // If product_id changed, set unit too
    if (name === "product_id") {
      const selectedProduct = productOptions[index]?.find(
        (prod) => prod.id.toString() === value
      );
      productToUpdate.unit = selectedProduct ? selectedProduct.unit : "";
    }

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

    // If category changed, fetch new product list for this row
    if (name === "category_id") {
      const products = await fetchProductsByCategory(value);
      setProductOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[index] = products;
        return updatedOptions;
      });
    }

    // Update full state
    setEditCostWorkingData({
      ...editCostWorkingData,
      products: updatedProducts,
      total_material_cost: totalMaterialCost.toFixed(2),
    });
  };

  //select customer
  const customerOptions =
    allCustomers?.data?.map((customer) => ({
      value: customer.id,
      label: customer.company_name,
    })) || [];

  const customFilterOption = (option, inputValue) =>
    option.label.toLowerCase().startsWith(inputValue.toLowerCase());

  return (
    <>
      {/* Flash Messages */}

      {/* Modal Container */}
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full md:w-[1400px] rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Update Cost Working
          </h2>
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


{/* Old Code */}
          {/* <div className="p-4 mt-5 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div>
                <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                  Select Name of Company:
                </label>
                
                <Select
                  options={customerOptions}
                  value={customerOptions.find(
                    (option) => option.value == editCostWorkingData.company_name
                  )}
                  onChange={(selectedOption) =>
                    handleEditCostWorkingCustomerChange({
                      target: {
                        name: "company_name",
                        value: selectedOption.value,
                      },
                    })
                  }
                  placeholder="Select the Customer"
                  className="block w-full text-textdata whitespace-nowrap mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-0"
                  isSearchable
                  filterOption={customFilterOption}
                />

                {editCostWorkingFormErrors?.company_name && (
                  <p className="text-red-500">
                    {editCostWorkingFormErrors?.company_name}
                  </p>
                )}
              </div>

             
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
                      <option key={index} value={address.location}>
                        {address.location}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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

            <h3 className="mt-12 mb-2 text-bgDataNew font-poppins border w-[300px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Products
            </h3>
            <div className="px-4">
              {editCostWorkingData?.products?.map((product, index) => (
                <>
                  <h3 className=" text-bgDataNew font-poppins font-medium text-textdatanew text-bgData mt-5">
                    Product {index + 1} :
                  </h3>
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                  >
                    <CategoryAutocomplete
                      allCategories={allCategories}
                      handleProductChange={handleProductChange}
                      index={index}
                      product={product}
                    />

                    <select
                      name="product_id"
                      value={product.product_id || ""}
                      onChange={(e) => handleProductChange(e, index)}
                      className="block w-full rounded-[5px] border px-3 py-2"
                    >
                      <option value="">Select Product</option>
                      {productOptions[index]?.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.product_name}
                        </option>
                      ))}
                    </select>



                    {[
                      "unit",
                      "qty_for_1",
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
                    ))}

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
          </div> */}


{/* New Code */}
<div className="p-4 mt-5 overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* General Information */}
            <h3 className="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Cost Working Format
            </h3>
            <div className="border border-gray-400 mx-[2px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2">
                {[
                  [
                    {
                      label: "Name of Company",
                      type: "dropdown",
                      options: ["Company A", "Company B"],
                    },
                    {
                      label: "Location/Site",
                      type: "dropdown",
                      options: ["Site A", "Site B"],
                    },
                    { label: "Nature of Work", type: "text" },
                    { label: "Technology Used", type: "text" },
                    { label: "Area to be Coated", type: "number" },
                    { label: "Thickness in mm", type: "number" },
                  ],
                  [
                    { label: "Estimate No", type: "number" },
                    { label: "Estimate Date", type: "date" },
                    { label: "Revision No", type: "number" },
                    { label: "Revision Date", type: "date" },
                  ],
                ].map((fields, tableIndex) => (
                  <div key={tableIndex} className="overflow-x-auto">
                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                      <tbody>
                        {fields.map((field, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 whitespace-nowrap"
                          >
                            <td className="px-4 py-2 text-gray-900 font-poopins text-[16px] border border-gray-300 font-medium">
                              {field.label}:
                            </td>
                            <td className="px-4 py-2 text-[15px] text-gray-600 border border-gray-300">
                              {field.type === "dropdown" ? (
                                <select className="w-full px-2 py-1 border border-gray-300 rounded">
                                  <option value="">Select</option>
                                  {field.options.map((option, i) => (
                                    <option key={i} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  className="w-full px-2 py-1 border border-gray-300 rounded"
                                  placeholder={`Enter ${field.label}`}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* Materials Table */}
              <div className="overflow-x-auto mt-8">
                {/* New Code */}
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-400">
                    <tr>
                      {[
                        "S.N.",
                        "Item",
                        "HSN Code",
                        "Qty/M²",
                        "Unit",
                        "Qty for 1",
                        "Std Pak",
                        "Basic Rate",
                        "Basic Amount",
                      ].map((header, index) => (
                        <th
                          key={index}
                          className={`border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2 ${
                            header === "S.N." ? "text-left" : "text-center"
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Section Header: Material Cost */}
                    <tr className="bg-gray-300 text-center">
                      <td colSpan="9" className="py-2">
                        <div className="border border-gray-400 w-fit mx-auto px-4 py-0 rounded-[3px] font-poppins font-medium text-[18px]  text-gray-700">
                          A - Material Cost
                        </div>
                      </td>
                    </tr>

                    {/* Subsection Header: Bond Coat */}
                    <tr
                      className="bg-gray-100 font-medium text-left"
                      colSpan="9"
                    >
                      <td className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2">
                        1
                      </td>
                      <td className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2">
                        Bond coat
                      </td>
                      <td
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2"
                        colSpan="7"
                      ></td>
                    </tr>

                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left"></td>
                      <td
                        className="border border-gray-300 px-4 py-2 text-textdata text-left"
                        colSpan="1"
                      >
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the Text"
                          value="Kelox R 101"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the number"
                          value="390720"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the number"
                          value="0.200"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the Kg"
                          value="Kg"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 0.20"
                          value="0.20"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 10"
                          value="10"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 746.00"
                          value="746.00"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 149.20"
                          value="149.20"
                        />
                      </td>
                    </tr>

                    {/* Subsection Header: PICC 50 mm Depth coat */}
                    <tr
                      className="bg-gray-100 font-medium text-left"
                      colSpan="9"
                    >
                      <td className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2">
                        2
                      </td>
                      <td className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2">
                        PICC 50 mm Depth coat
                      </td>
                      <td
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2"
                        colSpan="7"
                      ></td>
                    </tr>

                    {/* PICC Items */}
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the Nicocil C 80"
                          value="Nicocil C 80"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 382450"
                          value="382450"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 38"
                          value="38"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the Kg"
                          value="Kg"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 38"
                          value="38"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 30"
                          value="30"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 34.00"
                          value="34.00"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1,297.44"
                          value="1,297.44"
                        />
                      </td>
                    </tr>
                    {/* <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Cement 53 Grade Birla Super
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        252329
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        22
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        Kg
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        22
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        50
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        10.00
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        222.60
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Aggregate 10 to 20 mm
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        42
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        Kg
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        42
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        2.00
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        84.80
                      </td>
                    </tr> */}

                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold text-black">
                      <td
                        className="px-4 py-2 text-bgDataNew border border-gray-300 text-right"
                        colSpan="6"
                      >
                        Total Material basic Cost :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        A
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        Rs
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        2052.44
                      </td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold text-black">
                      <td
                        className="px-4 py-2 text-bgDataNew border border-gray-300 text-right"
                        colSpan="6"
                      >
                        Total Material basic Cost :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        A
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        M2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        2052.44
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="min-w-full border border-gray-300 mt-14">
                  <thead className="bg-gray-400">
                    <tr>
                      {["Description", "Area", "Unit", "Amount"].map(
                        (header, index) => (
                          <th
                            key={index}
                            className={`border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2 ${
                              header === "Description"
                                ? "text-left"
                                : "text-center"
                            }`}
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                    <tr className="bg-gray-300 text-center">
                      <th colspan="4" className="py-2">
                        <div className="border border-gray-400 w-fit mx-auto px-4 py-0 rounded-[3px] font-poppins font-medium text-[18px]  text-gray-700">
                          B - Cost as per project / Site condition
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <br />
                    {/* Subsection Header: Bond Coat */}
                    <tr className="bg-gray-300 font-medium text-left">
                      <td
                        colSpan="4"
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2"
                      >
                        B1
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Labour cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the M2"
                          value="M2"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 400.00"
                          value="400.00"
                        />
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Consumable cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the M2"
                          value="M2"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 30.00"
                          value="30.00"
                        />
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Transport cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the M2"
                          value="M2"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 20.00"
                          value="20.00"
                        />
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Supervision cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the M2"
                          value="M2"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 30.00"
                          value="30.00"
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-100 font-semibold text-black">
                      <td
                        colspan=""
                        className="px-4 py-2 text-bgDataNew border border-gray-300 text-right"
                      >
                        Total :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        b1
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        M2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        480.00
                      </td>
                    </tr>

                    <br />
                    {/* Subsection Header: Bond Coat */}
                    <tr className="bg-gray-300 font-medium text-left">
                      <td
                        colSpan="4"
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2"
                      >
                        B2
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left w-[400px]">
                        Finance cost consider payment received after 6 month
                        Interest will be 1% per month
                      </td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 6.0%"
                          value="6.0%"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 28.80"
                          value="28.80"
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold text-black">
                      <td
                        colspan=""
                        className="px-4 py-2 text-bgDataNew border border-gray-300 text-right"
                      >
                        Total Cost :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        b2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        M2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        508.80
                      </td>
                    </tr>

                    <br />
                    {/* Subsection Header: Bond Coat */}
                    <tr className="bg-gray-300 font-medium text-left">
                      <td
                        colSpan="4"
                        className="border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2"
                      >
                        B3
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left">
                        Over Head Charges for 1 sqm
                      </td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 1"
                          value="1"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 20%"
                          value="20%"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata bg-yellow-100">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          placeholder="Enter the 101.76"
                          value="101.76"
                        />
                      </td>
                    </tr>
                    <tr className="bg-gray-100 font-semibold text-black">
                      <td
                        colspan=""
                        className="px-4 py-2 text-bgDataNew border border-gray-300 text-right"
                      >
                        Total application ( Labour) Cost :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        B=(b1+b2+b3)
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        M2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-white text-center bg-red-400">
                        610.56
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="min-w-full border border-gray-300 mt-14">
                  <thead className="bg-gray-400">
                    <tr>
                      {["Total", "Unit", "Qty", "Total Project Cost RS"].map(
                        (header, index) => (
                          <th
                            key={index}
                            className={`border text-black border-gray-300 font-poopins font-medium text-[16px] px-4 py-2 ${
                              header === "Total" ? "text-left" : "text-center"
                            }`}
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                    <tr className="bg-gray-300 text-center">
                      <th colspan="4" className="py-2">
                        <div className="border border-gray-400 w-fit mx-auto px-4 py-0 rounded-[3px] font-poppins font-medium text-[18px]  text-gray-700">
                          C - Project Calculation
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left font-bold text-gray-700">
                        Total Material basic Cost
                      </td>
                      <td className="border border-gray-300 p-2">A</td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        M2
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        2052.44
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left font-bold text-gray-700">
                        Total application (Labour) cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        B
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        M2
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        610.56
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left font-bold text-gray-700">
                        Total Material + Application basic Cost
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata"></td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        M2
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        2663.00
                      </td>
                    </tr>
                    <tr className="text-center hover:bg-gray-200 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2 text-textdata text-left font-bold text-gray-700">
                        Contractor profit
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        C
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        10%
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-textdata">
                        266.30
                      </td>
                    </tr>
                    <br />
                    <tr className="bg-gray-100 font-semibold text-black text-center">
                      <td className="px-4 py-2 font-bold text-gray-700 border border-gray-300 text-left">
                        Total Material basic Cost :
                      </td>
                      <td className="px-4 py-2 border border-gray-300 font-bold text-gray-600 text-center">
                        A+B+C
                      </td>
                      <td className="px-4 py-2 border border-gray-300 font-bold text-gray-600 text-center"></td>
                      <td className="px-4 py-2 border border-gray-300 font-bold text-gray-600 text-center">
                        2929.30
                      </td>
                    </tr>
                    <tr className="bg-gray-100 font-semibold text-black text-center">
                      <td className="px-4 py-2 text-bgDataNew border border-gray-300 text-left">
                        Total project Area
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        M2
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        1
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-bgDataNew text-center">
                        2929.30
                      </td>
                    </tr>
                  </tbody>
                </table>
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
