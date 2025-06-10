import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AnnualBuisnessReport.css";
import { iconsImgs } from "../../../utils/images";
import ContentTop from "../../ContentTop/ContentTop";
import AddAnnualReport from "./AddAnnualReport";
import ListTableReport from "./ListTableReport";
import ViewAnnualReport from "./ViewAnnualReport";


const AnnualBuisnessReport = () => {
  const dispatch = useDispatch();
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [isAnnualListTable, setIsAnnualListTable] = useState(false);

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
              
            />
            {/*------- Table Data End -------*/}
          </div>
        </div>

        {/* Add User Modal */}
        {isAnnualModalOpen && (
          <AddAnnualReport setIsAnnualModalOpen={setIsAnnualModalOpen} />
        )}


        {/* View User Modal */}
        {isAnnualListTable && (
          <ViewAnnualReport setIsAnnualListTable={setIsAnnualListTable} />
        )}
      </div>
    </div>
  );
};

export default AnnualBuisnessReport;
