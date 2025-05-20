import { useState } from "react";

const SearchableSelect = ({ options, value, onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setShowOptions(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm || options.find((opt) => opt.value === value)?.label || ""}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        placeholder={placeholder}
        className="block w-full border border-[#473b33] px-3 py-2 rounded-[5px]"
      />

      {showOptions && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
