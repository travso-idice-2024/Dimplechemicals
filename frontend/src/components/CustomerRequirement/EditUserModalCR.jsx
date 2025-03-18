import React from "react";

const EditUserModalCR = ({
  setEditUserModalOpen,
  handleEditUser,
  setNewUser,
  newUser,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] pt-0 pb-4 rounded-[6px] flex flex-col">
        <h2 className="text-white text-[20px] font-poopins font-semibold mb-2 px-0 py-2 text-center bg-bgDataNew rounded-t-[5px]">
          Edit Requirement
        </h2>

        <div className="mt-5 md:mt-9 px-4 flex flex-col gap-2">

          <div className="flex items-center gap-2">
          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Full Name :
            </label>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
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
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Title :
            </label>
            <input
              type="text"
              placeholder="Title"
              value={newUser.title}
              onChange={(e) => setNewUser({ ...newUser, title: e.target.value })}
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Requirement :
            </label>
            <textarea
              type="text"
              placeholder="Requirement"
              value={newUser.requirement}
              onChange={(e) => setNewUser({ ...newUser, requirement: e.target.value })}
              className="block w-full mb-2 h-[110px] rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Contact :
            </label>
            <input
              type="text"
              placeholder="Contact"
              value={newUser.contact}
              onChange={(e) =>
                setNewUser({ ...newUser, contact: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            />
          </div>

          <div>
            <label className="font-poppins font-medium text-[18px] text-bgData">
              Status :
            </label>
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              className="block w-full mb-2 rounded-[5px] border border-solid border-[#473b33] focus:border-[#473b33] dark:focus:border-[#473b33] px-3 py-2"
            >
              <option value="New">New</option>
              <option value="InProgress">InProgress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-end justify-end gap-2">
            <button
              className="bg-bgDataNew text-white px-3 py-2 rounded mt-2 hover:bg-[#cb6f2ad9]"
              onClick={handleEditUser}
            >
              Save Changes
            </button>
            <button
              className="mt-4 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditUserModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModalCR;
