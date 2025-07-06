import React, { useState } from "react";

const InputTracker = () => {
  const [input, setInput] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleInput} />
      <p>You typed: {input ? input : "nothing"}</p>
    </div>
  );
};

export default InputTracker;
