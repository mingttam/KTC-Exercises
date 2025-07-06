import React, { useState } from "react";

const DropdownSelection = () => {
  const [selectedFruit, setSelectedFruit] = useState("Apple");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFruit(event.target.value);
  };

  const fruits = ["Apple", "Banana", "Orange", "Mango", "Pineapple"];

  return (
    <div
      style={{
        margin: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select value={selectedFruit} onChange={handleChange}>
        {fruits.map((fruit) => (
          <option value={fruit}>{fruit}</option>
        ))}
      </select>
      <p>Selected fruit: {selectedFruit}</p>
    </div>
  );
};

export default DropdownSelection;
