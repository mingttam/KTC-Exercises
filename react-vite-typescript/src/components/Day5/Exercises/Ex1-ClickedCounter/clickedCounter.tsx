import { useState } from "react";

const ClickedCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>Clicked: {count} times</p>
    </div>
  );
};

export default ClickedCounter;
