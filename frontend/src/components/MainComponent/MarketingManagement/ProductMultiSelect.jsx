import { useState } from "react";

function ProductMultiSelect({ allProducts, leadData, setLeadData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleProduct = (id) => {
    const selected = leadData.product_ids || [];
    if (selected.includes(id)) {
      setLeadData({
        ...leadData,
        product_ids: selected.filter((prodId) => prodId !== id),
      });
    } else {
      setLeadData({
        ...leadData,
        product_ids: [...selected, id],
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="block w-full border px-3 py-2 rounded-[5px] text-left"
      >
        {leadData?.product_ids?.length > 0
          ? `${leadData?.product_ids.length} product(s) selected`
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
                checked={leadData.product_ids?.includes(prod.id)}
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
