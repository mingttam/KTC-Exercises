import React from "react";
import style from "./state2.module.css";
type Props = {
  stars?: number;
};

export default function State2({ stars = 0 }: Props) {
  const [rating, setRating] = React.useState(stars);

  const handleClick = (index: number) => {
    setRating(index);
  };

  const ratingText = {
    0: "Chưa đánh giá",
    1: "Rất tệ",
    2: "Tệ",
    3: "Trung bình",
    4: "Khá",
    5: "Tốt",
  };

  return (
    <div className={style.rating_container}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <span>
            <span
              key={index}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: rating >= item ? "orange" : "gray",
              }}
              onClick={() => handleClick(item)}
            >
              ★
            </span>
            {item === 5 && (
              <span className={style.rating_text}>
                {ratingText[rating as keyof typeof ratingText]}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
