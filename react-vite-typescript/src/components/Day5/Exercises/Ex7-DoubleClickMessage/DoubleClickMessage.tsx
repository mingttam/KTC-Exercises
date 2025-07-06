import { useState } from "react";

const DoubleClickMessage = () => {
  const [message, setMessage] = useState<string>("");

  const handleDoubleClick = () => {
    setMessage("Double-clicked!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

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
      <button onDoubleClick={handleDoubleClick}>Double Click Me!</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DoubleClickMessage;
