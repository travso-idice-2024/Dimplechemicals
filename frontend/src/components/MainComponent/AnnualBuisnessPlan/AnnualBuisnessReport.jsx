import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnnualBuisnessReport.css";
import { iconsImgs } from "../../../utils/images";
import ContentTop from "../../ContentTop/ContentTop";
import AddAnnualReport from "./AddAnnualReport";
import ListTableReport from "./ListTableReport";
import ViewAnnualReport from "./ViewAnnualReport";
import { addAnualBussinessPlan, listABP } from "../../../redux/userSlice";
import { fetchCurrentUser } from "../../../redux/authSlice";
import {
  fetchAllCustomers,
  getAllAddressByCustomerId,
} from "../../../redux/customerSlice";

const AnnualBuisnessReport = () => {
  const dispatch = useDispatch();
  const { anualbsplan } = useSelector((state) => state.user);

  console.log("anualbsplan", anualbsplan);

  const { user: userDeatail } = useSelector((state) => state.auth);
  const { allCustomers, customerAddress } = useSelector(
    (state) => state.customer
  );

  const [selectedABP, setSelectedABP] = useState({});
  //-------- New Pagination Code Start --------//
  const [entriesPerPageNewData, setEntriesPerPageNewData] = useState(20);
  //-------- New Pagination Code End --------//

  // Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [monthWise, setMonthWise] = useState(3);
  const abpPerPage = entriesPerPageNewData ? entriesPerPageNewData : 20;

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllCustomers());
    // dispatch(
    //   fetchUserWithRole({
    //     roleId: 4,
    //   })
    // );
    dispatch(
      listABP({
        page: currentPage,
        limit: abpPerPage,
        search: searchTerm,
        monthWise: monthWise
      })
    );
  }, [dispatch, currentPage, searchTerm, abpPerPage, monthWise, entriesPerPageNewData]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log("userDeatail", userDeatail);

  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [isAnnualListTable, setIsAnnualListTable] = useState(false);

  //add anual bussiness plan
  const [abpData, setabpData] = useState({
    emp_id: userDeatail?.id,
    customer_id: "",
    location: "",
    associate_id: "",
    contact_person_id: "",
    project_name: "",
    area_mtr2: "",
    buisness_potential: "",
    for_month: "",
    products: [], // Array to store multiple products
  });

  const [abpFormErrors, setabpErrors] = useState({});
  const [abpFlashMessage, setAbpFlashMessage] = useState("");
  const [abpFlashMsgType, setAbpFlashMsgType] = useState("");

  const handleABPChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...abpData,
      [name]: value,
    };

    setabpData(updatedData);
  };

  const handleABPCustomerChange = (e) => {
    const { value } = e.target;

    dispatch(getAllAddressByCustomerId({ id: value }));

    setabpData((prevData) => ({
      ...prevData,
      customer_id: value,
    }));
  };

  const handleABPFlashMessage = (message, type) => {
    setAbpFlashMessage(message);
    setAbpFlashMsgType(type);
    setTimeout(() => {
      setAbpFlashMessage("");
      setAbpFlashMsgType("");
    }, 3000);
  };

  const abpValidateForm = () => {
    let errors = {};

    // if (!abpData.emp_id) errors.emp_id = "Employee is required.";
    if (!abpData.customer_id) errors.customer_id = "Customer is required.";
    if (!abpData.associate_id) errors.associate_id = "Associate is required.";
    if (!abpData.contact_person_id)
      errors.contact_person_id = "Contact Person is required.";
    if (!abpData.project_name)
      errors.project_name = "Project Name is required.";
    if (!abpData.area_mtr2) errors.area_mtr2 = "Area (m²) is required.";
    if (!abpData.buisness_potential)
      errors.buisness_potential = "Business Potential is required.";
    if (!abpData.for_month) errors.for_month = "Month is required.";

    setabpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitABP = async (e) => {
    console.log("formData", abpData);
    if (abpValidateForm()) {
      try {
        const response = await dispatch(
          addAnualBussinessPlan(abpData)
        ).unwrap();

        if (response?.success) {
          handleABPFlashMessage(response?.message, "success");

          // Assuming you have a list fetch function, like for costWorking
          dispatch(
            listABP({
              page: currentPage,
              limit: abpPerPage,
              search: searchTerm,
            })
          );

          // Reset form to empty values
          setabpData({
            emp_id: "",
            customer_id: "",
            associate_id: "",
            contact_person_id: "",
            project_name: "",
            area_mtr2: "",
            buisness_potential: "",
            technology_used: "",
            for_month: "",
            products: [],
          });

          setTimeout(() => {
            setIsABPModalOpen(false);
          }, 3000);
        } else {
          handleABPFlashMessage(
            response?.message || "Something went wrong",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding ABP:", error);
        handleABPFlashMessage(error?.message || "An error occurred", "error");
      }
    }
  };

  //end add anual bussiness plan

  return (
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between gap-[8px] md:gap-[0px] ">
          <div className="md:mb-0 mb-2">
            <h1 className="text-white text-textdata whitespace-nowrap font-semibold">
              AnnualBuisness Report
            </h1>
          </div>
          <div className="flex items-start md:items-center flex-col md:flex-row gap-[5px]">
            <div className="md:mb-0 mb-2">
              <input
                type="search"
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                placeholder="Search"
              />
            </div>
            <div>
              <button
                className="flex items-center text-textdata whitespace-nowrap text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                onClick={() => setIsAnnualModalOpen(true)}
              >
                <img
                  src={iconsImgs.plus}
                  alt="plus icon"
                  className="w-[18px] mr-1"
                />{" "}
                Add New Report
              </button>
            </div>
          </div>
        </div>
        <div className="main-content-holder max-h-[600px] heightfixalldevice overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}
            <ListTableReport
              setIsAnnualListTable={setIsAnnualListTable}
              anualbsplan={anualbsplan?.data}
              selectedABP={selectedABP}
              setSelectedABP={setSelectedABP}
              monthWise={monthWise}
              setMonthWise={setMonthWise}
            />

            {/*------- Table Data End -------*/}
          </div>
        </div>

        {/* Add User Modal */}
        {isAnnualModalOpen && (
          <AddAnnualReport
            userDeatail={userDeatail}
            setIsAnnualModalOpen={setIsAnnualModalOpen}
            abpData={abpData}
            setabpData={setabpData}
            abpFormErrors={abpFormErrors}
            setabpErrors={setabpErrors}
            selectedABP={selectedABP}
            setSelectedABP={setSelectedABP}
            abpFlashMessage={abpFlashMessage}
            abpFlashMsgType={abpFlashMsgType}
            handleABPChange={handleABPChange}
            handleSubmitABP={handleSubmitABP}
            allCustomers={allCustomers}
            customerAddress={customerAddress}
            handleABPCustomerChange={handleABPCustomerChange}
          />
        )}

        {/* View User Modal */}
        {isAnnualListTable && (
          <ViewAnnualReport
            setIsAnnualListTable={setIsAnnualListTable}
            selectedABP={selectedABP}
            setSelectedABP={setSelectedABP}
          />
        )}
      </div>
    </div>
  );
};

export default AnnualBuisnessReport;
