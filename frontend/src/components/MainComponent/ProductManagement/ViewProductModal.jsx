import React from "react";

const ViewProductModal = ({ setViewModalOpen, selectedProduct }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[550px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Product Details
        </h2>
        <div className="mt-5 md:mt-6 px-6 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Product Name
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.product_name || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              HSN Code
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.HSN_code || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Stock
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.stock || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Unit
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.unit || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Rate
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.rate || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Product Description
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.product_description || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-poppins font-semibold text-textdata text-bgData">
              Status
            </label>
            <p className="font-poppins font-semibold text-textdata">:</p>
            <p className="text-textdata">{selectedProduct?.status === 1 ? "Active" : "InActive"}
            </p>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button
              className="mt-4 bg-gray-500 text-textdata text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
