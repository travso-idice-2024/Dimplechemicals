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
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#473b33] rounded-[8px]">
              {/* <th className="px-4 py-2 text-left text-bgDataNew text-textdata"></th> */}
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Id
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Product 
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Category 
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                HSN Code{" "}
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Unit
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Rate
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Product Description
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Status
              </th>
              <th className="px-4 py-2 text-left text-bgDataNew text-textdata">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Products?.map((product, index) => (
              <tr key={index}>
                {/* <td className="px-4 py-2 text-textdata">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                  />
                </td> */}
                <td className="px-4 py-2 text-textdata">{index + 1}</td>
                <td className="px-4 py-2 text-textdata">
                  {product.product_name}
                </td>
                <td className="px-4 py-2 text-textdata">
                  {product?.category?.category_name || "-"}
                </td>
                <td className="px-4 py-2 text-textdata">{product.HSN_code}</td>
                <td className="px-4 py-2 text-textdata">{product.stock}</td>
                <td className="px-4 py-2 text-textdata">{product.unit}</td>
                <td className="px-4 py-2 text-textdata">{product.rate}</td>
                <td className="px-4 py-2 text-textdata">
                  {product.product_description}
                </td>
                <td><button
                    className={`${
                      product.status === 1 ? "bg-green-500" : "bg-red-500"
                    } text-white px-3 py-1 rounded hover:bg-red-600 text-[12px]`}
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
                <td className="flex items-center gap-2 px-4 py-2 text-textdata">
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
