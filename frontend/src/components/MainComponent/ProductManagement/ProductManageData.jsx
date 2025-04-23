import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductManageData.css";
import { iconsImgs } from "../../../utils/images";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import AddProductModal from "./AddProductModal";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import ContentTop from "../../ContentTop/ContentTop";
import {
  listProducts,
  addProduct,
  updateProduct,
  removeProduct,
} from "../../../redux/productSlice";


import {fetchCurrentUser} from "../../../redux/authSlice";

const ProductManageData = () => {
  const dispatch = useDispatch();
  const { products, totalPages, productLoading, productError } = useSelector(
    (state) => state.product
  );
 
  const {user:userDeatail}  = useSelector((state) => state.auth);

  //console.log("login user", userDataWithRole);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ProductsPerPage = 10;

  // Fetch Products whenever searchTerm or currentPage changes
  useEffect(() => {
    //dispatch(fetchCurrentUser());
   
    dispatch(
      listProducts({
        page: currentPage,
        limit: ProductsPerPage,
        search: searchTerm,
      })
    );
  }, [dispatch, currentPage, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //add Product functinality===============================================================
  const [formData, setFormData] = useState({
    product_name: "",
    HSN_code: "",
    stock: "",
    unit: "",
    rate: "",
    product_description: "",
    status: "",
    category_id:""
  });

  const [formErrors, setFormErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  const handleFlashMessage = (message, type) => {
    setFlashMessage(message);
    setFlashMsgType(type);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error when user types
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateInputs = () => {
    let errors = {};
  
    if (!formData.product_name.trim())
      errors.product_name = "*Product name is required";
    if (!formData.HSN_code.trim()) 
      errors.HSN_code = "*HSN Code is required";
    if (!formData.stock.trim()) 
      errors.stock = "*Stock is required";
    if (!formData.unit.trim()) 
      errors.unit = "*Unit is required";
    if (!formData.rate.trim()) 
      errors.rate = "*Rate is required";
    if (!formData.product_description.trim()) 
      errors.product_description = "*Product description is required";
    if (!formData.status.trim()) 
      errors.status = "*Status is required";
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await dispatch(addProduct(formData)).unwrap();
        //console.log(response);
        if (response?.success) {
          handleFlashMessage(response?.message, "success");
          //dispatch(listProducts());
          dispatch(
            listProducts({
              page: currentPage,
              limit: ProductsPerPage,
              search: searchTerm,
            })
          );
          setTimeout(() => {
            setAddProductModalOpen(false);
          }, 3000);
        } else {
          handleFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding Product:", error);
        handleFlashMessage(error?.message || "An error occurred", "error");
      }
    }
  };

  //end add Product functinality==========================================================================

  //edit Product function=================================================================================

  const [editFormData, setEditFormData] = useState({
    product_name: "",
    HSN_code: "",
    stock: "",
    unit: "",
    rate: "",
    product_description: "",
    status: "",
    category_id:""
  });

  const [editFormErrors, setEditFormErrors] = useState({});
  const [editFlashMessage, setEditFlashMessage] = useState("");
  const [editFlashMsgType, setEditFlashMsgType] = useState("");

  // Update form data when a Product is selected for editing
  useEffect(() => {
    if (selectedProduct) {
      setEditFormData({
        product_name: selectedProduct.product_name || "",
        HSN_code: selectedProduct.HSN_code || "",
        stock: selectedProduct.stock || "",
        unit: selectedProduct.unit || "",
        rate: selectedProduct.rate || "",
        product_description: selectedProduct.product_description || "",
        status: selectedProduct.status || "",
        category_id:selectedProduct.category_id || ""
      });
    }
  }, [selectedProduct]);
  

  const handleEditFlashMessage = (message, type) => {
    setEditFlashMessage(message);
    setEditFlashMsgType(type);
    setTimeout(() => {
      setEditFlashMessage("");
      setEditFlashMsgType("");
    }, 3000);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    setEditFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateEditInputs = () => {
    let errors = {};
  
    if (!editFormData.product_name.trim())
      errors.product_name = "*Product name is required";
    if (!editFormData.HSN_code)
      errors.HSN_code = "*HSN code is required";
    if (!editFormData.stock)
      errors.stock = "*Stock is required";
    if (!editFormData.unit.trim())
      errors.unit = "*Unit is required";
    if (!editFormData.rate)
      errors.rate = "*Rate is required";
    if (!editFormData.product_description.trim())
      errors.product_description = "*Product description is required";
    if (!editFormData.status)
      errors.status = "*Status is required";
  
    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (validateEditInputs()) {
      try {
        //console.log("editFormData",editFormData);
        const response = await dispatch(
          updateProduct({
            id: selectedProduct.id,
            ProductData: editFormData,
          })
        ).unwrap();

        if (response.success) {
          handleEditFlashMessage(response.message, "success");
          dispatch(
            listProducts({
              page: currentPage,
              limit: ProductsPerPage,
              search: searchTerm,
            })
          );
          setTimeout(() => {
            setEditProductModalOpen(false);
          }, 3000);
        } else {
          handleEditFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        handleEditFlashMessage(error.message || "An error occurred", "error");
      }
    }
  };

  //end edit Product function==============================================================================

  // delete Product =======================================================================================
  // const [deleteFlashMessage, setDeleteFlashMessage] = useState("");
  // const [deleteFlashMsgType, setDeleteFlashMsgType] = useState("");

  // // Function to show flash messages for delete actions
  // const handleDeleteFlashMessage = (message, type) => {
  //   setDeleteFlashMessage(message);
  //   setDeleteFlashMsgType(type);
  //   setTimeout(() => {
  //     setDeleteFlashMessage("");
  //     setDeleteFlashMsgType("");
  //   }, 3000); // Hide the message after 3 seconds
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await dispatch(removeProduct(id)).unwrap();
  //     handleDeleteFlashMessage("Product Status Updated successfully!", "success");
  //     dispatch(
  //       listProducts({
  //         page: currentPage,
  //         limit: ProductsPerPage,
  //         search: searchTerm,
  //       })
  //     );
  //   } catch (error) {
  //     handleDeleteFlashMessage(
  //       error?.message || "Failed to update status Product",
  //       "error"
  //     );
  //   }
  // };
  
  //end delete Product ========================================================================

  const handleDeactive = async (id) => {
    try {
      await dispatch(removeProduct(id)).unwrap();
      dispatch(
        listProducts({
          page: currentPage,
          limit: ProductsPerPage,
          search: searchTerm,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

 

  //if (ProductLoading) return <p>Loading...</p>;
  //if (ProductError) return <p>{ProductError}</p>;

  return (
    <div className="main-content">
      <ContentTop />
      <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-textdata font-semibold">
                Product Management
              </h1>
            </div>
            <div className="flex items-center gap-[5px]">
              <div>
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-textdata text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                  onClick={() => setAddProductModalOpen(true)}
                >
                  <img
                    src={iconsImgs.plus}
                    alt="plus icon"
                    className="w-[18px] mr-1"
                  />{" "}
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}
            <ProductTable
              Products={products?.data}
              setEditProductModalOpen={setEditProductModalOpen}
              setViewModalOpen={setViewModalOpen}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              setIsAssignModalOpen={setIsAssignModalOpen}
              // deleteFlashMessage={deleteFlashMessage}
              // deleteFlashMsgType={deleteFlashMsgType}
              // handleDeleteFlashMessage={handleDeleteFlashMessage}
              handleDeactive={handleDeactive}
            />

            {/*------- Table Data End -------*/}
          </div>
          {/* Pagination Controls with Number */}
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>

        {/* Add User Modal */}
        {isAddProductModalOpen && (
          <AddProductModal
            setAddProductModalOpen={setAddProductModalOpen}
            handleSubmitAddProduct={handleSubmitAddProduct}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            setFormErrors={setFormErrors}
            formErrors={formErrors}
            flashMessage={flashMessage}
            setFlashMessage={setFlashMessage}
            setFlashMsgType={setFlashMsgType}
            flashMsgType={flashMsgType}
          />
        )}

        {/* Edit User Modal */}
        {isEditProductModalOpen && (
          <EditProductModal
            setEditProductModalOpen={setEditProductModalOpen}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            editFormErrors={editFormErrors}
            setEditFormErrors={setEditFormErrors}
            editFlashMessage={editFlashMessage}
            setEditFlashMessage={setEditFlashMessage}
            editFlashMsgType={editFlashMsgType}
            setEditFlashMsgType={setEditFlashMsgType}
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
          />
        )}

        {/* View User Modal */}
        {isViewModalOpen && (
          <ViewProductModal
            setViewModalOpen={setViewModalOpen}
            selectedProduct={selectedProduct}
          />
        )}

        {/* Assign Product Modal */}
       
      </div>
    </div>
  );
};

export default ProductManageData;
