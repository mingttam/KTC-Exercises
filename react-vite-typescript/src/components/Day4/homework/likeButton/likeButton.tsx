import { useState } from "react";
import style from "./likeButton.module.css";
import { ThumbsUp } from "lucide-react";

type Props = {
  status: boolean;
};

const LikeButton = ({ status }: Props) => {
  const [like, setLike] = useState(status);

  const handleLike = () => {
    setLike(!like);
  };

  const likeText = like ? "I love you xoxo" : "Please Like";

  return (
    <div className={style.likeButton} style={{ margin: "20px" }}>
      <span onClick={handleLike} style={{ color: like ? "blue" : "black" }}>
        <ThumbsUp />
      </span>
      <span className={style.buttonText}>{likeText}</span>
    </div>
  );
};

export default LikeButton;
