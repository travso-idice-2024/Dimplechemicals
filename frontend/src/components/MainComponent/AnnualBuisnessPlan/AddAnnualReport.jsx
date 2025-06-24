import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { fetchAllProducts } from "../../../redux/productSlice";
import { fetchAllCategories } from "../../../redux/categorySlice";
import CategoryAutocomplete from "./CategoryAutocomplete";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const AddAnnualReport = ({
  userDeatail,
  setIsAnnualModalOpen,
  abpData,
  setabpData,
  abpFormErrors,
  setabpErrors,
  selectedABP,
  setSelectedABP,
  abpFlashMessage,
  abpFlashMsgType,
  handleABPChange,
  handleSubmitABP,
  allCustomers,
  customerAddress,
  handleABPCustomerChange,
}) => {
  console.log("abpData", abpData);
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

  // Function to add a new product entry
  const handleAddProduct = () => {
    setabpData((prevData) => ({
      ...prevData,
      products: [
        ...prevData.products,
        {
          technology_used: "",
          product_id: "",
          qty: "",
          rate: "",
          value_in_rs: "",
          gst_amt: "",
          gross_sale_include_gst: "",
          commission: "",
          net_sale: "",
        },
      ],
    }));
    setProductOptions((prev) => [...prev, []]);
  };

  const [productOptions, setProductOptions] = useState([]); // dynamic products for each category

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
      // console.log(response.data.data);

      return response.data.data; // assuming your API responds with { data: [...] }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...abpData.products];
    updatedProducts.splice(index, 1);

    setabpData({
      ...abpData,
      products: updatedProducts,
    });
  };

  // const handleProductChange = async (e, index) => {
  //   const { name, value } = e.target;

  //   const updatedProducts = [...abpData.products];
  //   const productToUpdate = { ...updatedProducts[index] };

  //   // Update the selected field value
  //   productToUpdate[name] = value;

  //   // Replace updated product in the array
  //   updatedProducts[index] = productToUpdate;

  //   // If category changed, fetch new product list for this row
  //   if (name === "technology_used") {
  //     const products = await fetchProductsByCategory(value);
  //     console.log("products", products);
  //     setProductOptions((prev) => {
  //       const updatedOptions = [...prev];
  //       updatedOptions[index] = products;
  //       return updatedOptions;
  //     });
  //   }

  //   // Update the overall state
  //   setabpData({
  //     ...abpData,
  //     products: updatedProducts,
  //   });
  // };

  // const fields = [
  //   { name: "qty", placeholder: "Qty." },
  //   { name: "rate", placeholder: "Rate" },
  //   { name: "value_in_rs", placeholder: "Value in Rs." },
  //   { name: "gst_amt", placeholder: "GST Amt" },
  //   { name: "gross_sale_include_gst", placeholder: "Gross Sale including GST" },
  //   { name: "commission", placeholder: "Commission" },
  //   { name: "net_sale", placeholder: "Net Sale including GST " },
  // ];

  const handleProductChange = async (e, index) => {
    const { name, value } = e.target;

    const updatedProducts = [...abpData.products];
    const productToUpdate = { ...updatedProducts[index] };

    // Update field value immediately
    productToUpdate[name] = value;

    // Get latest values — use value from event if it's qty, rate, gst_amt or commission
    const quantity =
      name === "qty" ? parseFloat(value) : parseFloat(productToUpdate.qty) || 0;
    const rate =
      name === "rate"
        ? parseFloat(value)
        : parseFloat(productToUpdate.rate) || 0;
    const gstPercent =
      name === "gst_percent"
        ? parseFloat(value)
        : parseFloat(productToUpdate.gst_percent) || 0;
    const commission =
      name === "commission"
        ? parseFloat(value)
        : parseFloat(productToUpdate.commission) || 0;

    const valueInRs = quantity * rate;
    const gstAmt = parseFloat(((gstPercent / 100) * valueInRs).toFixed(2));
    //const gstAmt = (gstPercent / 100) * valueInRs;
    const grossSale = valueInRs + gstAmt;
    const netSale = grossSale - commission;

    productToUpdate.value_in_rs = valueInRs || 0;
    productToUpdate.gst_amt = gstAmt || 0;
    productToUpdate.gross_sale_include_gst = grossSale || 0;
    productToUpdate.net_sale = netSale || 0;

    updatedProducts[index] = productToUpdate;

    // If category changed, fetch products
    if (name === "technology_used") {
      const products = await fetchProductsByCategory(value);
      setProductOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[index] = products;
        return updatedOptions;
      });
    }

    setabpData({
      ...abpData,
      products: updatedProducts,
    });
  };

  const fields = [
    { name: "qty", placeholder: "Qty.", type: "number" },
    { name: "rate", placeholder: "Rate", type: "number" },
    {
      name: "value_in_rs",
      placeholder: "Value in Rs.",
      type: "number",
      disabled: true,
    },
    { name: "gst_percent", placeholder: "GST %", type: "select" }, // new field for GST percentage
    { name: "gst_amt", placeholder: "GST Amt", type: "number", disabled: true }, // now separate
    {
      name: "gross_sale_include_gst",
      placeholder: "Gross Sale including GST",
      type: "number",
      disabled: true,
    },
    { name: "commission", placeholder: "Commission", type: "number" },
    {
      name: "net_sale",
      placeholder: "Net Sale including GST",
      type: "number",
      disabled: true,
    },
  ];

  const customerOptions =
    allCustomers?.data?.map((customer) => ({
      value: customer.id,
      label: customer.company_name,
    })) || [];

  const customFilterOption = (option, inputValue) =>
    option.label.toLowerCase().startsWith(inputValue.toLowerCase());

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const countryOptions = [
  //   { value: "india", label: "India" },
  //   { value: "usa", label: "USA" },
  //   { value: "canada", label: "Canada" },
  // ];

  // const customerOptions = [
  //   { value: "SunFarma", label: "India" },
  //   { value: "usa", label: "USA" },
  //   { value: "canada", label: "Canada" },
  // ]

  // const stateOptions = [
  //   { value: "maharashtra", label: "Maharashtra" },
  //   { value: "gujarat", label: "Gujarat" },
  //   { value: "california", label: "California" },
  //   { value: "ontario", label: "Ontario" },
  // ];

  // const cityOptions = [
  //   { value: "mumbai", label: "Mumbai" },
  //   { value: "ahmedabad", label: "Ahmedabad" },
  //   { value: "los_angeles", label: "Los Angeles" },
  //   { value: "toronto", label: "Toronto" },
  // ];

  const departmentOptions = [
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
  ];

  // const technologyOptions = [
  //   { value: "HTML", label: "HTML" },
  //   { value: "CSS", label: "CSS" },
  //   { value: "ReactJS", label: "React" },
  //   { value: "NodeJS", label: "NodeJS" },
  // ];

  return (
    <>
      {/* Modal Container */}
      <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full md:w-[1300px]  rounded-[6px]">
          <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add New Report
          </h2>

          <div className="fixed top-5 right-5 z-50">
            {abpFlashMessage && abpFlashMsgType === "success" && (
              <SuccessMessage message={abpFlashMessage} />
            )}
            {abpFlashMessage && abpFlashMsgType === "error" && (
              <ErrorMessage message={abpFlashMessage} />
            )}
          </div>

          <div className="p-4 mt-2 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h3 className="mt-2 mb-2 text-bgDataNew font-poppins border w-[300px] font-medium text-[20px] text-bgData mb-0 text-center mx-auto">
              Annual Business Plan
            </h3>
            <h3 className="mt-2 mb-8 text-bgDataNew font-poppins border w-[540px] font-medium text-[17px] text-bgData mb-0 text-center mx-auto">
              Business Plan for the year 2024-2025 for Work Execution
            </h3>

            <div className="w-100 flex items-start justify-between px-0 mt-12 ">
              <div className="bg-[#e5e7eb38] rounded-[5px] w-[450px]">
                <table className="w-full border border-gray-300 text-sm table-fixed">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600 w-[40%]">
                        Name of Employee
                      </td>
                      <td className="py-2 text-right align-middle w-[5%]">:</td>
                      <td className="py-2 px-4 text-right text-gray-800 w-[55%]">
                        {userDeatail?.fullname}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left font-bold text-gray-600">
                        Employee code
                      </td>
                      <td className="py-2 text-right align-middle">:</td>
                      <td className="py-2 px-4 text-right text-gray-800">
                        {userDeatail?.emp_id}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <select
                    name="for_month"
                    value={abpData.for_month || ""}
                    onChange={handleABPChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                  >
                    <option value="">Select Duration</option>

                    <option value={3}>3 month</option>
                    <option value={6}>6 month</option>
                    <option value={9}>9 month</option>
                    <option value={12}>12 month</option>
                  </select>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-white text-[12px] mb-[2px]"
                  />
                </div>
                {abpFormErrors?.for_month && (
                  <p className="text-red-500">{abpFormErrors?.for_month}</p>
                )}
              </div>
            </div>

            <div className="mt-8 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Customer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 px-1 mt-2">
                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Customer Name :
                  </label>
                  <Select
                    options={customerOptions}
                    value={customerOptions.find(
                      (option) => option.value === abpData.customer_id
                    )}
                    onChange={(selectedOption) =>
                      handleABPCustomerChange({
                        target: {
                          name: "customer_id",
                          value: selectedOption.value,
                        },
                      })
                    }
                    placeholder="Select the Customer"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                    isSearchable
                    filterOption={customFilterOption}
                  />
                  {abpFormErrors?.customer_id && (
                    <p className="text-red-500">{abpFormErrors?.customer_id}</p>
                  )}
                  {/* <Select
                    options={customerOptions}
                    placeholder="Select Customer"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  /> */}
                </div>

                {/* Select Address */}

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Select Location Site:
                  </label>
                  <select
                    name="location"
                    value={abpData.location || ""}
                    onChange={handleABPChange}
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

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData ">
                    Business Associate code
                  </label>
                  :{" "}
                  <select
                    name="associate_id"
                    value={abpData.associate_id || ""}
                    onChange={handleABPChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                  >
                    <option value="">Select the Address</option>
                    {customerAddress?.data?.business_associates?.map(
                      (associate, index) => (
                        <option key={index} value={associate.id}>
                          {associate.code}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Country :
                  </label>
                  <Select
                    //options={countryOptions}
                    placeholder="Select Country"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    State :
                  </label>
                  <Select
                    //options={stateOptions}
                    placeholder="Select State"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    City :
                  </label>
                  <Select
                    //options={cityOptions}
                    placeholder="Select City"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Location :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder=""
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Department :
                  </label>
                  <Select
                    options={departmentOptions}
                    placeholder="Select Department"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div> */}

                <div>
                  <label>Contact Person Name</label>
                  <select
                    name="contact_person_id"
                    value={abpData?.contact_person_id || ""}
                    onChange={handleABPChange}
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  >
                    <option value="">Select Contact Person</option>

                    {/* Dynamic customer options */}
                    {customerAddress?.data?.contact_persons?.map(
                      (contact_person, index) => (
                        <option key={index} value={contact_person.id}>
                          {contact_person.name}
                        </option>
                      )
                    )}
                  </select>
                  {abpFormErrors?.contact_persion_name && (
                    <p className="text-red-500">
                      {abpFormErrors?.contact_person_id}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Project Name / Application Area :
                  </label>
                  <input
                    name="project_name"
                    value={abpData.project_name || ""}
                    onChange={handleABPChange}
                    type="text"
                    placeholder="Project Name / Application Area"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                  {abpFormErrors?.project_name && (
                    <p className="text-red-500">
                      {abpFormErrors?.project_name}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Designation :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Phone No. :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Email ID :
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="number"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                </div> */}

                {/* <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Technology :
                  </label>
                  <Select
                    //options={technologyOptions}
                    placeholder="Select Technology"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] py-[0.8px]"
                  />
                </div> */}

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Approx Area in SqM :
                  </label>
                  <input
                    name="area_mtr2"
                    value={abpData.area_mtr2 || ""}
                    onChange={handleABPChange}
                    type="number"
                    placeholder="Area in SqM"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                  {abpFormErrors?.area_mtr2 && (
                    <p className="text-red-500">{abpFormErrors?.area_mtr2}</p>
                  )}
                </div>

                <div>
                  <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                    Business Potential :
                  </label>
                  <input
                    name="buisness_potential"
                    value={abpData.buisness_potential || ""}
                    onChange={handleABPChange}
                    type="number"
                    placeholder="Business Potential"
                    className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                  />
                  {abpFormErrors?.buisness_potential && (
                    <p className="text-red-500">
                      {abpFormErrors?.buisness_potential}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-auto">
              <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-1 rounded-t-[4px] font-medium text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
                {" "}
                Product Details
              </h3>
              <div className="px-4">
                {abpData.products.map((product, index) => (
                  <>
                    <h3 className=" text-bgDataNew font-poppins font-medium text-textdatanew text-bgData mt-5">
                      Product {index + 1} :
                    </h3>
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
                    >
                      {/* category drop down */}
                      <CategoryAutocomplete
                        allCategories={allCategories}
                        handleProductChange={handleProductChange}
                        index={index}
                      />

                      {/* Product ID as Dropdown */}
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
                      {fields.map(({ name, placeholder, type, disabled }) =>
                        type === "select" ? (
                          <select
                            key={name}
                            name={name}
                            value={product[name] || ""}
                            onChange={(e) => handleProductChange(e, index)}
                            className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                          >
                            <option value="">Select GST %</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        ) : (
                          <input
                            key={name}
                            type={type}
                            name={name}
                            value={product[name] || ""}
                            onChange={(e) => handleProductChange(e, index)}
                            placeholder={placeholder}
                            className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
                            disabled={disabled}
                          />
                        )
                      )}

                      {/* {fields.map(({ name, placeholder }) => (
                      <input
                        key={name}
                        type="text"
                        name={name}
                        value={product[name] || ""}
                        onChange={(e) => handleProductChange(e, index)}
                        placeholder={placeholder}
                        className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
                      />
                      ))} */}

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
              </div>
            </div>

            {/* comment section */}
            <div className="mt-8 overflow-auto"
            >
              <div>
                <label className="font-poppins font-medium text-textdata whitespace-nowrap text-bgData">
                  Product Comment :
                </label>
                <textarea
                  name="comment"
                  value={abpData.comment || ""}
                  onChange={handleABPChange}
                  placeholder="Business Potential"
                  className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2 resize-none"
                />

                {abpFormErrors?.comment && (
                  <p className="text-red-500">{abpFormErrors?.comment}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end gap-2 px-4 my-4">
            <button
              type="submit"
              className="bg-bgDataNew text-white px-3 py-2 rounded hover:bg-[#cb6f2ad9]"
              onClick={handleSubmitABP}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setIsAnnualModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnualReport;
