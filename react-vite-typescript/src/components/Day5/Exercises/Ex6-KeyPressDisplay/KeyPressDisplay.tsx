import React, { useState } from "react";

const KeyPressDisplay = () => {
  const [lastKey, setLastKey] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    setLastKey(e.key);
  };

  return (
    <div>
      <input type="text" onKeyDown={handleKeyPress} />
      <p>Last key: {lastKey}</p>
    </div>
  );
};

export default KeyPressDisplay;
