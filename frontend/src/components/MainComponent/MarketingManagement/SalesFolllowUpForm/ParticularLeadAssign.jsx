import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";

const ParticularLeadAssign = ({
  setIsLeadAssignPopup,
  setSelectedPOAId,
  selectedPOA,
  userDataWithRole,
  handleAssignSalesPerson,
  poaUpdateData,
  setPoaUpdateData,
  handlePoaUpdateChange,
  validatePoaUpdateForm,
  poaFlashMessage,
  poaFlashMsgType,
  poaFormErrors,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {/* Flash Messages */}
      <div className="fixed top-5 right-5 z-50">
        {poaFlashMessage && poaFlashMsgType === "success" && (
          <SuccessMessage message={poaFlashMessage} />
        )}
        {poaFlashMessage && poaFlashMsgType === "error" && (
          <ErrorMessage message={poaFlashMessage} />
        )}
      </div>

      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-[400px]">
          <h2 className="text-lg font-semibold mb-4">Assign Sales Person</h2>

          {/* Sales Person */}
          <div>
            <label>Select Sales Person</label>
            <select
              name="sales_persion_id"
              value={poaUpdateData?.sales_persion_id}
              onChange={handlePoaUpdateChange}
              className="block w-full mb-2 rounded-[5px] border border-[#473b33] px-3 py-2"
            >
              <option value="">Select the Person</option>
              {userDataWithRole?.data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullname}
                </option>
              ))}
            </select>
            {poaFormErrors?.sales_persion_id && (
              <p className="text-red-500">{poaFormErrors?.sales_persion_id}</p>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setIsLeadAssignPopup(false);
                setSelectedPOAId(null);
              }}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleAssignSalesPerson}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticularLeadAssign;
