import React from "react";
import dcpllogo from "../../../assets/images/Dimple-Logos.png";

const CustomerInformationForm = ({ setViewModalOpen, selectedCustomer }) => {
  console.log("selectedCustomer", selectedCustomer);
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full lg:w-[950px] rounded-[6px]">
        <h2 className="text-white text-[20px] font-poppins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          DIMPLE CHEMICALS & SERVICES PVT. LTD.
        </h2>

        <div className="p-4 mt-5 overflow-y-auto h-[480px]">
          {/* Logo + Meta */}
          <div className="flex justify-between items-center mb-4 pr-1">
            <img src={dcpllogo} alt="DC Logo" className="h-14" />
            <div className="text-right text-xs space-y-1 mt-2">
              <div className="font-medium">
                <b>FORMAT NO:</b> SAL-F-02
              </div>
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
                  {/* <tr>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      rowSpan={4}
                    >
                      Product to be
                      <br />
                      Targeted
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
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Product
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[14px] border border-gray-600 font-semibold">
                      Business Potential in Rs.
                    </td>
                  </tr> */}

                  {/* Row 1 */}
                  {/* <tr>
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
                  </tr> */}

                  {/* Row 2 */}
                  {/* <tr>
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
                  </tr> */}

                  {/* Row 3 */}
                  {/* <tr>
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
                  </tr> */}

                  <tr>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      rowSpan={
                        Math.ceil(selectedCustomer?.mergedDeals?.length / 3) + 1
                      }
                    >
                      Product to be
                      <br />
                      Targeted
                    </td>

                    {/* Table header cells */}
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

                  {Array.from({
                    length: Math.ceil(
                      selectedCustomer?.mergedDeals?.length / 3
                    ),
                  }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {selectedCustomer?.mergedDeals
                        ?.slice(rowIndex * 3, rowIndex * 3 + 3)
                        .map((deal, i) => (
                          <React.Fragment key={i}>
                            <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                              {deal.product.product_name}
                            </td>
                            <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium">
                              ₹ {deal.business_potential || "-"}
                            </td>
                          </React.Fragment>
                        ))}

                      {/* Empty filler cells if less than 3 products */}
                      {Array.from({
                        length:
                          3 -
                          selectedCustomer?.mergedDeals?.slice(
                            rowIndex * 3,
                            rowIndex * 3 + 3
                          ).length,
                      }).map((_, idx) => (
                        <React.Fragment key={`empty-${idx}`}>
                          <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium"></td>
                          <td className="px-4 py-2 text-[#72360a] font-poopins text-[14px] border border-gray-600 font-medium"></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}

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

                  {selectedCustomer?.contactPersons &&
                  selectedCustomer.contactPersons.length > 0 ? (
                    selectedCustomer.contactPersons.map((person, index) => (
                      <tr className="text-center" key={person.id}>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap"
                          colSpan={2}
                        >
                          {person.name || "-"}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap"
                          colSpan={1}
                        >
                          {person.designation || "-"}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap"
                          colSpan={1}
                        >
                          +91 {person.phone_no || "-"}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap"
                          colSpan={2}
                        >
                          {person.secondary_contact || "-"}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center whitespace-nowrap"
                          colSpan={2}
                        >
                          {person.email || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-4 py-2 text-gray-500 font-poopins text-[15px] border border-gray-600 text-center"
                      >
                        No contact persons available.
                      </td>
                    </tr>
                  )}
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
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      colSpan={2}
                    >
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
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      colSpan={2}
                    >
                      Email Id
                    </td>
                  </tr>
                  {selectedCustomer?.assignedPersons &&
                  selectedCustomer.assignedPersons.length > 0 ? (
                    selectedCustomer.assignedPersons.map((person) => (
                      <tr key={person.id} className="text-center">
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                          colSpan={2}
                        >
                          {person.fullname}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          {/* If you have designation, else static */}
                          {"Sales Executive"}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          +91 {person.phone}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          {/* If no landline, use a static placeholder */}
                          {person.emergency_contact}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                          colSpan={2}
                        >
                          {person.email}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-2 text-gray-500 font-poopins text-[15px] border border-gray-600 text-center"
                      >
                        No assigned person data available.
                      </td>
                    </tr>
                  )}

                  {/* <tr className="text-center">
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                      colSpan={2}
                    >
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
                    <td
                      className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                      colSpan={2}
                    >
                      {selectedCustomer?.executive_email || "amit@dcpsl.com"}
                    </td>
                  </tr> */}
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
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      colSpan={2}
                    >
                      Associate Name
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Code No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Mobile No.
                    </td>
                    <td className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold">
                      Landline No.
                    </td>
                    <td
                      className="px-4 py-2 text-[#000000] font-poopins text-[15px] border border-gray-600 font-semibold"
                      colSpan={2}
                    >
                      Email Id
                    </td>
                  </tr>

                  {selectedCustomer?.businessAssociates &&
                  selectedCustomer.businessAssociates.length > 0 ? (
                    selectedCustomer.businessAssociates.map((associate) => (
                      <tr key={associate.id}>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                          colSpan={2}
                        >
                          {associate.associate_name}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          {/* No code field in response, so keep static fallback */}
                          {"BA001"}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          {associate.phone_no}
                        </td>
                        <td className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center">
                          {/* No landline field in response */}
                          {"022-123456"}
                        </td>
                        <td
                          className="px-4 py-2 text-[#72360a] font-poopins text-[15px] border border-gray-600 font-medium text-center"
                          colSpan={2}
                        >
                          {associate.email}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-2 text-gray-500 font-poopins text-[15px] border border-gray-600 text-center"
                      >
                        No business associate data available.
                      </td>
                    </tr>
                  )}
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
