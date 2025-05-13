import { useState } from "react";

function ProductMultiSelect({ allProducts, poaData, setPoaData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleProduct = (id) => {
    const selected = poaData.product_ids || [];
    if (selected.includes(id)) {
      setPoaData({
        ...poaData,
        product_ids: selected.filter((prodId) => prodId !== id),
      });
    } else {
      setPoaData({
        ...poaData,
        product_ids: [...selected, id],
      });
    }
  };

  return (
    <div className="relative block w-full mb-2 rounded-[5px] border border-[#473b33]">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="block w-full border px-3 py-2 rounded-[5px] text-left block w-full rounded-[5px] border border-[#473b33] px-3 py-2"
      >
        {poaData.product_ids?.length > 0
          ? `${poaData.product_ids.length} product(s) selected`
          : "Select Products"}
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 bg-white border mt-1 w-full rounded-[5px] max-h-64 overflow-y-auto shadow-lg">
          {allProducts?.data?.map((prod) => (
            <label
              key={prod.id}
              className="flex items-center px-3 py-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={poaData.product_ids?.includes(prod.id)}
                onChange={() => toggleProduct(prod.id)}
                className="mr-2"
              />
              {prod.product_name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductMultiSelect;
