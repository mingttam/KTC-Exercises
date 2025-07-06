import { useState } from "react";

const HoverHighlight = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={{
        backgroundColor: isHovered ? "yellow" : "white",
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        border: "1px solid black",
        cursor: "pointer",
      }}
    >
      Hover me!
    </div>
  );
};

export default HoverHighlight;
