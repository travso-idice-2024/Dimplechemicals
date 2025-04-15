import React from "react";
import dcpllogo from "../../../assets/images/Picture1.png";


const CustomerInformationForm = ({ setViewModalOpen, selectedCustomer }) => {
  console.log("selectedCustomer",selectedCustomer);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[95vh] overflow-y-auto rounded shadow-lg">

        <table className="w-full border border-black text-[12px]">
          <tbody>
            {/* Top Header */}
            <tr>
              <td
                colSpan={6}
                className="text-center text-2xl font-bold border border-white py-2"
              >
                DIMPLE CHEMICALS & SERVICES PVT. LTD.
              </td>
              <td
                rowSpan={3}
                className="border border-white text-right align-top p-2"
              >
                <img
                  src={dcpllogo}
                  alt="DC Logo"
                  className="h-12 float-right"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="border border-white py-1"></td>
              <td
                colSpan={4}
                className="border border-white text-xs text-right pr-2"
              >
                FORMAT NO: SAL-F-02
              </td>
            </tr>
            <tr>
              <td colSpan={4}></td>
              <td colSpan={4} className="text-right text-xs pr-2">
                <div className="bg-yellow-300 inline-block px-1 font-semibold">
                  REVISION NO.: 01
                </div>{" "}
              </td>
              
            </tr>
            <tr>
              <td colSpan={4}></td>
              <td colSpan={4} className="text-right text-xs pr-2">
                <div className="bg-yellow-300 inline-block px-1 font-semibold ml-2">
                  ISSUE NO.: 04
                </div>
              </td>
              
            </tr>

            {/* Title Row */}
            <tr>
              <td
                colSpan={7}
                className="text-center font-bold border border-black py-1 text-lg"
              >
                CUSTOMER INFORMATION FORM (CIF)
              </td>
            </tr>

            {/* CIF No. and Date */}
            <tr>
              <td className="border border-black font-semibold px-2 py-1">
                CIF NO. :
              </td>
              <td className="border border-black px-2 py-1" colSpan={3}>
                {selectedCustomer?.cust_id || ""}
              </td>
              <td className="border border-black font-semibold px-2 py-1 text-right">
                Date :
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
              {selectedCustomer?.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString('en-GB') : ""}

              </td>
            </tr>

            {/* Customer Name */}
            <tr>
              <td
                className="border border-black font-semibold px-2 py-1"
                colSpan={2}
              >
                CUSTOMER NAME
              </td>
              <td className="border border-black px-2 py-1" colSpan={5}>
                {selectedCustomer?.company_name || ""}
              </td>
            </tr>

            {/* GST No. and PAN No. */}
            <tr>
              <td
                className="border border-black font-semibold px-2 py-1"
                colSpan={2}
              >
                GST NO.
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.gstNo || "GISTN345"}
              </td>
              <td className="border border-black font-semibold px-2 py-1">
                PAN NO.
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.pan_no || ""}
              </td>
            </tr>

            {/* PRODUCT TO BE TARGETED SECTION */}
            <tr>
              <td
                className="border border-black px-2 py-1 font-semibold text-center align-top"
                rowSpan={4}
              >
                PRODUCT TO BE
                <br />
                TARGETED
              </td>

              {/* Headers for three product columns */}
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Product
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Business Potential in Rs.
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Product
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Business Potential in Rs.
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Product
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                Business Potential in Rs.
              </td>
            </tr>

            {/* Row 1 */}
            <tr>
              <td className="border border-black px-2 py-1">Odour Remover</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp1 || "5000"}
              </td>
              <td className="border border-black px-2 py-1">DuraClean OD</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp2 || "6000"}
              </td>
              <td className="border border-black px-2 py-1">
                DuraGuard Multicolor
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp3 || "7000"}
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td className="border border-black px-2 py-1">BioWash</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp4 || "4500"}
              </td>
              <td className="border border-black px-2 py-1">DuraGuard Pro</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp5 || "7500"}
              </td>
              <td className="border border-black px-2 py-1">
                PICC EPOXY 80:20
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp6 || "8000"}
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <td className="border border-black px-2 py-1">DuraClean WR</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp7 || "9000"}
              </td>
              <td className="border border-black px-2 py-1">DuraBond Pro</td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.bp8 || "8500"}
              </td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>

            {/* FACTORY ADDRESS */}
            <tr>
              <td
                rowSpan={3}
                className="border border-black px-2 py-1 align-top font-semibold text-center"
              >
                FACTORY
                <br />
                ADDRESS
              </td>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.address || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.factoryAddressLine2 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.factoryAddressLine3 || ""}
              </td>
            </tr>

            {/* ADDRESS FOR CORRESPONDENCE */}
            <tr>
              <td
                rowSpan={3}
                className="border border-black px-2 py-1 align-top font-semibold text-center"
              >
                ADDRESS FOR
                <br />
                CORROSPONDENCE
              </td>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.correspondenceAddressLine1 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.correspondenceAddressLine2 || ""}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-4" colSpan={6}>
                {selectedCustomer?.correspondenceAddressLine3 || ""}
              </td>
            </tr>

            {/* CONTACT PERSON DETAILS */}
            <tr className="bg-blue-200">
              <td
                className="border border-black px-2 py-1 font-semibold text-center"
                colSpan={7}
              >
                CONTACT PERSON DETAILS
              </td>
            </tr>
            <tr className="bg-blue-100 font-semibold text-center">
              <td className="border border-black px-2 py-1" colSpan={2}>CONTACT PERSON NAME</td>
              <td className="border border-black px-2 py-1">DESIGNATION</td>
              <td className="border border-black px-2 py-1">MOBILE NO.</td>
              <td className="border border-black px-2 py-1">LANDLINE NO.</td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                OFFICIAL EMAIL ID
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.client_name || "Ravi Verma"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.designation || "Purchase Head"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.primary_contact || "9876543211"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.secondary_contact || "022-123456"}
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.email_id || "ravi@example.com"}
              </td>
            </tr>

            {/* DCPSL EXECUTIVE DETAILS */}
            <tr className="bg-blue-200">
              <td
                className="border border-black px-2 py-1 font-semibold text-center"
                colSpan={7}
              >
                DCPSL EXECUTIVE DETAILS
              </td>
            </tr>
            <tr className="bg-blue-100 font-semibold text-center">
              <td className="border border-black px-2 py-1" colSpan={2}>DCSPL EXECUTIVE NAME</td>
              <td className="border border-black px-2 py-1">DESIGNATION</td>
              <td className="border border-black px-2 py-1">MOBILE NO.</td>
              <td className="border border-black px-2 py-1">LANDLINE NO.</td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                OFFICIAL EMAIL ID
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.executive_name || "Amit Sharma"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.executive_designation || "Sales Manager"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.executive_mobile || "9876543210"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.executive_landline || "022-789456"}
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.executive_email || "amit@dcpsl.com"}
              </td>
            </tr>

            {/* BUSINESS ASSOCIATE */}
            <tr className="bg-yellow-200">
              <td
                className="border border-black px-2 py-1 font-semibold text-center"
                colSpan={7}
              >
                BUSINESS ASSOCIATE DETAILS
              </td>
            </tr>
            <tr className="bg-yellow-100 font-semibold text-center">
              <td className="border border-black px-2 py-1" colSpan={2}>BUSINESS ASSOCIATE NAME</td>
              <td className="border border-black px-2 py-1">CODE NO.</td>
              <td className="border border-black px-2 py-1">MOBILE NO.</td>
              <td className="border border-black px-2 py-1">LANDLINE NO.</td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                OFFICIAL EMAIL ID
              </td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.business_associate_name || "Ravi Kumar"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.business_associate_code || "BA001"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.business_associate_mobile || "9876504321"}
              </td>
              <td className="border border-black px-2 py-1">
                {selectedCustomer?.business_associate_landline || "022-123456"}
              </td>
              <td className="border border-black px-2 py-1" colSpan={2}>
                {selectedCustomer?.business_associate_email || "ravi@associate.com"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Signature Section */}
        <div className="flex justify-between mt-4 px-4 text-[12px]">
          <div className="text-center border-t border-black pt-2 w-1/2">
            SIGNATURE OF AUTHORISED SIGNATORY
            <br />
            <span className="text-xs">(Name of Customer)</span>
          </div>
          <div className="text-center border-t border-black pt-2 w-1/2">
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

        {/* Close Button */}
        <div className="text-right px-4 py-3">
          <button
            onClick={() => setViewModalOpen(false)}
            className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationForm;
