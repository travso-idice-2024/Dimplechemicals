import React from "react";
import "./LeadviaSourceData.css";
import ContentTop from "../../../ContentTop/ContentTop";

const LeadviaSourceData = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-textdata font-semibold">
              Lead Via Source Management
            </h1>
          </div>
          <div className="flex items-center gap-[5px]">
            {/* <div>
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-[#473b33] bg-transparent bg-clip-padding px-3 py-[0.15rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-[#473b33] focus:text-white focus:shadow-[#473b33] focus:outline-none dark:border-[#473b33] dark:text-white dark:placeholder:text-white dark:focus:border-[#473b33]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-textdata text-white bg-[#fe6c00] rounded-[3px] px-3 py-[0.28rem]"
                  onClick={() => setAddCustomerModalOpen(true)}
                >
                  <img
                    src={iconsImgs.plus}
                    alt="plus icon"
                    className="w-[18px] mr-1"
                  />{" "}
                  Add Customer
                </button>
              </div> */}
          </div>
        </div>
        <div className="main-content-holder max-h-[615px] overflow-y-auto scrollbar-hide">
          <div className="bg-bgData rounded-[8px] shadow-md shadow-black/5 text-white px-4 py-6 overflow-auto">
            {/*------- Table Data Start -------*/}

            <h3 className="text-center my-8 text-white">No Data Available</h3>
            {/*------- Table Data End -------*/}
          </div>
          {/* Pagination Controls with Number */}

          {/* Add User Modal */}
        </div>
        {/* <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          /> */}
      </div>
    </div>
  );
};

export default LeadviaSourceData;
