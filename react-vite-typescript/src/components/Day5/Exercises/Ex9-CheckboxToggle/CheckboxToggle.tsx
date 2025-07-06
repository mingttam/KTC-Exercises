import { useState } from "react";

const CheckboxToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      style={{
        margin: "40px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input type="checkbox" onChange={handleChange} />
      <label>Toggle me!</label>
      <p>{isChecked ? "Checkbox is: checked" : "Checkbox is: unchecked"}</p>
    </div>
  );
};

export default CheckboxToggle;
