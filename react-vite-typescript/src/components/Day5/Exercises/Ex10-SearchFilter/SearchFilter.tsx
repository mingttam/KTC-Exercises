import React, { useState } from "react";

const SearchFilter = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search items..."
      />
      {searchText && (
        <ul>
          {filteredItems.map((item) => (
            <li key={item} style={{ listStyle: "none" }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchFilter;
