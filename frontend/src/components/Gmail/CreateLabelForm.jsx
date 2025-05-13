import React, { useState } from "react";

const CreateLabelForm = ({ createLabel }) => {
  const [labelName, setLabelName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!labelName.trim()) return alert("Please enter a label name.");
    await createLabel(labelName);
    setLabelName("");
    alert("Label created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
      <input
        type="text"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        placeholder="New Label Name"
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create
      </button>
    </form>
  );
};

export default CreateLabelForm;
