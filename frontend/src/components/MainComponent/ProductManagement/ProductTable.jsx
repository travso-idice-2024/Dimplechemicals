import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, removeProduct } from "../../../redux/productSlice";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ProductTable = ({
  Products,
  setEditProductModalOpen,
  setViewModalOpen,
  selectedProduct,
  setSelectedProduct,
  setIsAssignModalOpen,
  deleteFlashMessage,
  deleteFlashMsgType,
  handleDeleteFlashMessage,
  handleDeactive,
}) => {
  const dispatch = useDispatch();

  console.log("Products",Products);

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {deleteFlashMessage && deleteFlashMsgType === "success" && (
          <SuccessMessage message={deleteFlashMessage} />
        )}
        {deleteFlashMessage && deleteFlashMsgType === "error" && (
          <ErrorMessage message={deleteFlashMessage} />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap"></th> */}
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Id
              </th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Product 
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Category 
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                HSN Code{" "}
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Unit
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Rate
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
              Consumption per Sq. Mtr.
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-newtextdata whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Products?.map((product, index) => (
              <tr key={index} >
                {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                  />
                </td> */}
                {/* <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{index + 1}</td> */}
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  {product.product_name}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  {product?.category?.category_name || "-"}
                </td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{product.HSN_code}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{product.stock}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{product.unit}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">{product.rate}</td>
                <td className="px-4 py-2 text-newtextdata whitespace-nowrap">
                  {product.product_description}
                </td>
                <td className="text-center"><button
                    className={`${
                      product.status === 1 ? "bg-green-500" : "bg-red-500"
                    } text-white px-3 text-center py-1 rounded hover:bg-red-600 text-[12px]`}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to deactive this Product?"
                        )
                      ) {
                        handleDeactive(product.id);
                      }
                    }}
                  >
                    {product.status == 1 ? "Active" : "Inactive"}
                  </button></td>
                <td className="flex items-center gap-2 px-4 py-2 text-newtextdata whitespace-nowrap">
                  {" "}
                  
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedProduct(product);
                      setViewModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedProduct(product);
                      setEditProductModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                   {/* <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this Product?"
                        )
                      ) {
                        handleDelete(product.id);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button> */}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
