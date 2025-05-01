import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../AlertMessage/ErrorMessage";
import { fetchAllProducts } from "../../../redux/productSlice";
// import { getProductByLeadId } from "../../../redux/leadSlice";

const DealCreationForm = ({
  dealCreationOpenForm,
  setDealCreationOpenForm,
  selectedLead,
  dealData,
  setDealData,
  handleDealInputChange,
  handleProductInputChange,
  handleSubmitDeal,
  addDealFlashMessage,
  addDealFlashMsgType,
  dealFormErrors,
  setDealFormErrors,
}) => {
  console.log("dealData",dealData);
  const dispatch = useDispatch();
  const { allProducts, totalPages, productLoading, productError } = useSelector(
    (state) => state.product
  );

  // const { pductByleadId } = useSelector((state) => state.lead);

  //console.log("pductByleadId", pductByleadId?.data);

  useEffect(() => {
    // dispatch(getProductByLeadId({ lead_id: selectedLead?.id }));
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // const [dealData, setDealData] = useState({
  //   products:
  //   pductByleadId?.data?.map((prod) => ({
  //       product_id: prod.id,
  //       product_name: prod.product_name,
  //       date: "",
  //       area: "",
  //       quantity: "",
  //       rate: "",
  //       amount: "",
  //     })) || [],
  //   advance_amount: "",
  //   deal_amount: "",
  // });

  // const handleProductInputChange = (index, field, value) => {
  //   const updatedProducts = [...dealData.products];
  //   updatedProducts[index][field] = value;

  //   setDealData({
  //     ...dealData,
  //     products: updatedProducts,
  //   });
  // };

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        {addDealFlashMessage && addDealFlashMsgType === "success" && (
          <SuccessMessage message={addDealFlashMessage} />
        )}
        {addDealFlashMessage && addDealFlashMsgType === "error" && (
          <ErrorMessage message={addDealFlashMessage} />
        )}
      </div>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[900px] pt-0 pb-4 rounded-[6px] flex flex-col">
          <h2 className="text-white text-[20px] font-poopins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
            Add Deal
          </h2>

          {/* <div className="mt-5 md:mt-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto h-fit">
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Date:</label>
              <input
                type="date"
                name="date"
                value={dealData.date || ""}
                onChange={handleDealInputChange}
                className="block w-full mb-1 text-gray-500 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.date && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.date}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Product Name:</label>
                <select
                      name="product_id"
                      value={dealData.product_id  || ""}
                      onChange={handleDealInputChange}
                      className="block w-full rounded-[5px] border px-3 py-2"
                    >
                      <option value="">Select Product</option>
                      {allProducts?.data?.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.product_name}
                        </option>
                      ))}
                    </select>
              {dealFormErrors.product_id  && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.product_id }</p>
              )}
            </div>
            
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Area - Sq mtr / Cub Mtre</label>
              <input
                type="number"
                name="area"
                value={dealData.area || ""}
                onChange={handleDealInputChange}
                placeholder="Area"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.area && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.area}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={dealData.quantity || ""}
                onChange={handleDealInputChange}
                placeholder="Quantity"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.quantity && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.quantity}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Rate:</label>
              <input
                type="number"
                name="rate"
                value={dealData.rate || ""}
                onChange={handleDealInputChange}
                placeholder="Rate"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.rate && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.rate}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Amount:</label>
              <input
                type="number"
                name="amount"
                value={dealData.amount || ""}
                onChange={handleDealInputChange}
                placeholder="Amount"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.amount && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.amount}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Advance Amount:</label>
              <input
                type="number"
                name="advance_amount"
                value={dealData.advance_amount || ""}
                onChange={handleDealInputChange}
                placeholder="Advance Amount"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.advance_amount && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.advance_amount}</p>
              )}
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">Deal Amount:</label>
              <input
                type="number"
                name="deal_amount"
                value={dealData.deal_amount || ""}
                onChange={handleDealInputChange}
                placeholder="Deal Amount"
                className="block w-full mb-1 rounded-[5px] border border-solid border-[#473b33] px-3 py-2"
              />
              {dealFormErrors.deal_amount && (
                <p className="text-red-500 text-sm mt-1">{dealFormErrors.deal_amount}</p>
              )}
            </div>
          </div> */}

          <div className="mt-5 md:mt-6 px-4">
            {/* Scrollable Products List */}
            <div className="max-h-[350px] overflow-y-auto border border-gray-300 rounded p-2 space-y-3">
              {dealData?.deals?.map((product, index) => (
                <div
                  key={product.product_id}
                  className="border p-2 rounded bg-white"
                >
                  <h3 className="text-sm font-medium mb-2">
                    <span className="font-semibold">{index + 1}. </span>
                    {product.product_name}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    <div>
                      <label className="text-xs block mb-1">Date</label>
                      <input
                        type="date"
                        value={product.date}
                        onChange={(e) =>
                          handleProductInputChange(
                            index,
                            "date",
                            e.target.value
                          )
                        }
                        className="block w-full text-xs rounded border px-2 py-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs block mb-1">Area</label>
                      <input
                        type="number"
                        value={product.area}
                        onChange={(e) =>
                          handleProductInputChange(
                            index,
                            "area",
                            e.target.value
                          )
                        }
                        className="block w-full text-xs rounded border px-2 py-1"
                        placeholder="Area"
                      />
                    </div>

                    <div>
                      <label className="text-xs block mb-1">Qty</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductInputChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="block w-full text-xs rounded border px-2 py-1"
                        placeholder="Qty"
                      />
                    </div>

                    <div>
                      <label className="text-xs block mb-1">Rate</label>
                      <input
                        type="number"
                        value={product.rate}
                        onChange={(e) =>
                          handleProductInputChange(
                            index,
                            "rate",
                            e.target.value
                          )
                        }
                        className="block w-full text-xs rounded border px-2 py-1"
                        placeholder="Rate"
                      />
                    </div>

                    <div>
                      <label className="text-xs block mb-1">Amount</label>
                      <input
                        type="number"
                        value={product.amount}
                        onChange={(e) =>
                          handleProductInputChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        className="block w-full text-xs rounded border px-2 py-1"
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Advance and Deal Amount */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-4">
              <div>
                <label className="text-sm block mb-1">Advance Amt</label>
                <input
                  type="number"
                  value={dealData.advance_amount}
                  onChange={(e) =>
                    setDealData({ ...dealData, advance_amount: e.target.value })
                  }
                  className="block w-full text-xs rounded border px-2 py-1"
                  placeholder="Advance"
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Deal Amt</label>
                <input
                  type="number"
                  value={dealData.deal_amount}
                  onChange={(e) =>
                    setDealData({ ...dealData, deal_amount: e.target.value })
                  }
                  className="block w-full text-xs rounded border px-2 py-1"
                  placeholder="Deal Amount"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end justify-end gap-2 px-4">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleSubmitDeal}
            >
              Add Deal
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setDealCreationOpenForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCreationForm;
