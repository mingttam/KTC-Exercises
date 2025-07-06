import { useState } from "react";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <button onClick={handleToggle}>{isOn ? "Turn off" : "Turn on"}</button>
      <p>State: {isOn ? "ON" : "OFF"}</p>
    </div>
  );
};

export default ToggleSwitch;
