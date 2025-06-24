import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessMessage from "../../../AlertMessage/SuccessMessage";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { addLeadCommunication } from "../../../../redux/leadSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");

const EmpSARReport = ({
  setShowFinlizeDealProduct,
  selectedLead,
  setSelectedLead,
}) => {
  const dispatch = useDispatch();

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
  //console.log("selectedPOA", selectedPOA);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[1400px] rounded-lg overflow-auto">
        <h2 className="text-white text-[20px] font-poppins mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Deal Products
        </h2>

        {/* Table */}
        <div className="overflow-x-auto p-4 max-h-[calc(100vh-200px)]">
          <table className="w-full border border-collapse text-sm">
            <thead>
              <tr className="bg-gray-400 rounded-[8px]">
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Id
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Date
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Product Name
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Area - Sq mtr / Cub Mtr
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Quantity
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Rate
                </th>
                <th className="px-4 py-2 text-center text-gray-800  whitespace-nowrap">
                  Deal Amount
                </th>
                <th className="px-4 py-2 text-center text-gray-800 whitespace-nowrap  whitespace-nowrap ">
                  Advance amount
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedLead?.deals?.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 text-newtextdata">{index + 1}</td>
                  <td className="px-4 py-2 text-newtextdata">{user?.date}</td>
                  <td className="px-4 py-2 text-newtextdata">
                    {user?.product_name}
                  </td>
                  <td className="px-4 py-2 text-newtextdata">
                    {user?.area} Sq mtr/cub mtr
                  </td>
                  <td className="px-4 py-2 text-newtextdata">
                    {user?.quantity}
                  </td>
                  <td className="px-4 py-2 text-newtextdata">₹{user?.rate}</td>
                  <td className="px-4 py-2 text-newtextdata text-center">
                    ₹{user?.amount}
                  </td>
                  <td className="px-4 py-2 text-newtextdata">
                    ₹{user?.advance_amount}
                  </td>
                </tr>
              ))}
              <tr className="text-center">
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center"></td>
                <td className="px-4 py-2 text-newtextdata text-center">
                  ₹{selectedLead?.total_deal_amount}
                </td>
                <td className="px-4 py-2 text-newtextdata">
                  ₹{selectedLead?.total_advance_amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setShowFinlizeDealProduct(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpSARReport;
