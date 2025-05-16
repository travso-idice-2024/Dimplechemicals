import React from "react";
import dcpllogo from "../../../assets/images/Dimple-Logos.png";

const CustomerInformationForm = ({ setViewModalOpen, selectedCustomer }) => {
  console.log("selectedCustomer", selectedCustomer);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full md:w-[950px] rounded-[6px]">
        <h2 className="text-white text-[20px] font-poppins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          DIMPLE CHEMICALS & SERVICES PVT. LTD.
        </h2>

        <div className="p-4 mt-5 overflow-y-auto h-[400px]">
          {/* Logo + Meta */}
          <div className="flex justify-between items-center mb-4 pr-1">
            <img src={dcpllogo} alt="DC Logo" className="h-14" />
            <div className="text-right text-xs space-y-1 mt-2">
              <div className="font-medium"><b>FORMAT NO:</b> SAL-F-02</div>
              <div className="bg-yellow-300 rounded-[5px] inline-block px-2 py-1 mr-2">
               <b> REVISION NO.:</b> 01
              </div>
              <div className="bg-yellow-300 rounded-[5px] inline-block py-1 px-2">
                <b>ISSUE NO.:</b> 04
              </div>
            </div>
          </div>

          <div className="mt-5 px-1">
            {/* Title Row */}
            <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-2 rounded-t-[4px] font-semibold text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
              {" "}
              Customer Information Form (CIF)
            </h3>
            <div className="px-[1px]">
              <table className="table-auto w-full text-left border-collapse border border-gray-600">
                <tbody>
                  {/* CIF No. and Date */}
                  <tr className="hover:bg-gray-50 whitespace-nowrap ">
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      CIF NO.
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={3}
                    >
                      {selectedCustomer?.cust_id || ""}
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold text-right">
                      Date :
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={2}
                    >
                      {selectedCustomer?.createdAt
                        ? new Date(
                            selectedCustomer.createdAt
                          ).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                  </tr>

                  {/* Customer Name */}
                  <tr>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold"
                      colSpan={1}
                    >
                      Customer Name
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={8}
                    >
                      {selectedCustomer?.company_name || ""}
                    </td>
                  </tr>

                  {/* GST No. and PAN No. */}
                  <tr>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold"
                      colSpan={1}
                    >
                      GST NO.
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={4}
                    >
                      {selectedCustomer?.gstNo || "GISTN345"}
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      PAN NO.
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={2}
                    >
                      {selectedCustomer?.pan_no || ""}
                    </td>
                  </tr>

                  {/* PRODUCT TO BE TARGETED SECTION */}
                  <tr>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      rowSpan={4}
                    >
                      Product to be
                      <br />
                      Targeted
                    </td>

                    {/* Headers for three product columns */}
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Product
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Business Potential in Rs.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Product
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Business Potential in Rs.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Product
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Business Potential in Rs.
                    </td>
                  </tr>

                  {/* Row 1 */}
                  <tr>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      Odour Remover
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp1 || "5000"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      DuraClean OD
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp2 || "6000"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      DuraGuard Multicolor
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp3 || "7000"}
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      BioWash
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp4 || "4500"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      DuraGuard Pro
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp5 || "7500"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      PICC EPOXY 80:20
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp6 || "8000"}
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      DuraClean WR
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp7 || "9000"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      DuraBond Pro
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium">
                      {selectedCustomer?.bp8 || "8500"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"></td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"></td>
                  </tr>

                  {/* FACTORY ADDRESS */}
                  <tr>
                    <td
                      rowSpan={1}
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                    >
                      Factory Address
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={8}
                    >
                      {selectedCustomer?.address || ""}
                      <br />
                      {selectedCustomer?.factoryAddressLine2 || ""}
                      <br />
                      {selectedCustomer?.factoryAddressLine3 || ""}
                    </td>
                  </tr>

                  {/* ADDRESS FOR CORRESPONDENCE */}
                  <tr>
                    <td
                      rowSpan={1}
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                    >
                      Address for Corrospondence
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium"
                      colSpan={6}
                    >
                      {selectedCustomer?.correspondenceAddressLine1 || ""}
                      <br />
                      {selectedCustomer?.correspondenceAddressLine2 || ""}
                      <br />
                      {selectedCustomer?.correspondenceAddressLine3 || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 px-1">
            <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-2 rounded-t-[4px] font-semibold text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
              {" "}
              Contact Person Details
            </h3>
            <div className="px-[1px]">
              <table className="table-auto w-full text-left border-collapse border border-gray-600">
                <tbody>
                  <tr className="text-center">
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold whitespace-nowrap "
                      colSpan={2}
                    >
                      Person Name
                    </td>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold  "
                      colSpan={1}
                    >
                      Designation
                    </td>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold "
                      colSpan={1}
                    >
                      Mobile No.
                    </td>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold "
                      colSpan={2}
                    >
                      Landline No.
                    </td>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold "
                      colSpan={2}
                    >
                      Email Id
                    </td>
                  </tr>

                  <tr className="text-center">
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap "
                      colSpan={2}
                    >
                      {selectedCustomer?.client_name || "Ravi Verma"}
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap  "
                      colSpan={1}
                    >
                      {selectedCustomer?.designation || "Purchase Head"}
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap "
                      colSpan={1}
                    >
                      +91 {selectedCustomer?.primary_contact || "9876543211"}
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap "
                      colSpan={2}
                    >
                      {selectedCustomer?.secondary_contact || "022-123456"}
                    </td>
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap "
                      colSpan={2}
                    >
                      {selectedCustomer?.email_id || "ravi@example.com"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 px-1">
            <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-2 rounded-t-[4px] font-semibold text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
              {" "}
              DCPSL Executive Details
            </h3>
            <div className="px-[1px]">
              <table className="table-auto w-full text-left border-collapse border border-gray-600">
                <tbody>
                  {/* DCPSL EXECUTIVE DETAILS */}
                  <tr className="text-center">
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold" colSpan={2}>
                      Executive Name
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Designation
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Mobile No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Landline No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold" colSpan={2}>
                      Email Id
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center" colSpan={2}>
                      {selectedCustomer?.executive_name || "Amit Sharma"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                      {selectedCustomer?.executive_designation ||
                        "Sales Manager"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                     +91 {selectedCustomer?.executive_mobile || "9876543210"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                      {selectedCustomer?.executive_landline || "022-789456"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center" colSpan={2}>
                      {selectedCustomer?.executive_email || "amit@dcpsl.com"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 px-1">
            <h3 class="-mb-0 text-black font-poppins border bg-gray-400 py-2 rounded-t-[4px] font-semibold text-[18px] text-bgData mb-0 text-center mx-auto capitalize">
              {" "}
              Buisness Associate Details
            </h3>
            <div className="px-[1px]">
              <table className="table-auto w-full text-left border-collapse border border-gray-600">
                <tbody>
                  {/* BUSINESS ASSOCIATE */}
                  <tr className="text-center">
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold" colSpan={2}>
                      Associate Name
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">Code No.</td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Mobile No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Landline No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold" colSpan={2}>
                      Email Id
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center" colSpan={2}>
                      {selectedCustomer?.business_associate_name ||
                        "Ravi Kumar"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                      {selectedCustomer?.business_associate_code || "BA001"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                      {selectedCustomer?.business_associate_mobile ||
                        "9876504321"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                      {selectedCustomer?.business_associate_landline ||
                        "022-123456"}
                    </td>
                    <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center" colSpan={2}>
                      {selectedCustomer?.business_associate_email ||
                        "ravi@associate.com"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex justify-between mt-4 px-4 text-[12px]">
            <div className="text-center border-black pt-2 w-1/2">
              SIGNATURE OF AUTHORISED SIGNATORY
              <br />
              <span className="text-xs">(Name of Customer)</span>
            </div>
            <div className="text-center border-black pt-2 w-1/2">
              SIGNATURE OF AUTHORISED SIGNATORY
              <br />
              <span className="text-xs">
                DIMPLE CHEMICALS AND SERVICES PVT. LTD.
              </span>
            </div>
          </div>

          <p className="text-xs text-center mt-3 text-gray-600">
            NO. OF COPIES: 2 (ONE FOR CUSTOMER & ONE FOR DCPSL SALES DEPARTMENT)
          </p>
        </div>
        {/* Close Button */}
        <div className="flex items-end justify-end gap-2 px-4 my-4">
          <button
            onClick={() => setViewModalOpen(false)}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationForm;