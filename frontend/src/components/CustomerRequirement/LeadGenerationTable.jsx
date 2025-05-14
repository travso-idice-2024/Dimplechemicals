import React from 'react'

const LeadGenerationTable = ({currentUsers, indexOfFirstUser}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#473b33] rounded-[8px]">
            <th className="px-4 py-2 text-left text-bgDataNew">SNo.</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Name</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Email</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Title</th>
            <th className="px-4 py-2 text-left text-bgDataNew">Description</th>
            <th className="px-4 py-2 text-left text-bgDataNew">
              Contact
            </th>
            <th className="px-4 py-2 text-left text-bgDataNew">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{indexOfFirstUser + index + 1}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.title}</td>
              <td className="px-4 py-2 w-[370px]">{user.requirement}</td>
              <td className="px-4 py-2">{user.contact}</td>
              <td className="px-4 py-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadGenerationTable
