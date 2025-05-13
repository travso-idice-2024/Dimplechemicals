import React from "react";

const AddUserModalCR = ({
  newUser,
  setNewUser,
  handleAddUser,
  setAddUserModalOpen,
}) => {
  return (
    <div className="fixed inset-0 p-2 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white md:w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-textdata font-poopins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Add New Requirement
        </h2>
        <div className="mt-5 md:mt-9 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                 Full Name :
              </label>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>

            <div>
              <label className="font-poppins font-medium text-textdata text-bgData">
                 Email :
              </label>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Title :
            </label>
            <input
              type="text"
              placeholder="Title"
              value={newUser.title}
              onChange={(e) =>
                setNewUser({ ...newUser, title: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Requirement :
            </label>
            <textarea
              type="text"
              placeholder="Requirement"
              value={newUser.requirement}
              onChange={(e) =>
                setNewUser({ ...newUser, requirement: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Contact :
            </label>
            <input
              type="number"
              placeholder="Contact"
              value={newUser.contact}
              onChange={(e) =>
                setNewUser({ ...newUser, contact: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-textdata text-bgData">
               Status :
            </label>
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            >
              <option>Select the Status</option>
              <option value="New">New</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-end justify-end gap-2">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleAddUser}
            >
              Add User
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setAddUserModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModalCR;
