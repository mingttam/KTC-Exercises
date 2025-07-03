import { useState } from "react";
import style from "./slidewThumbs.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  id: number;
  imgsrc: string;
}

const ThumbItem = ({
  imgsrc,
  isActive,
  onHandleClick,
}: {
  imgsrc: string;
  isActive: boolean;
  onHandleClick: () => void;
}) => {
  return (
    <span
      onClick={onHandleClick}
      className={`${style.thumbItem} ${isActive ? style.active : ""}`}
    >
      <img className={style.thumbImg} src={imgsrc} alt="" />
    </span>
  );
};

const SlidewThumbs = ({ data }: { data: Props[] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const handleNextSlide = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className={style.slideContainer}>
      <div className={style.slide}>
        <button onClick={handlePrevSlide} className={style.navButtonLeft}>
          <ChevronLeft />
        </button>
        <img
          className={style.slideImg}
          src={data[currentIndex].imgsrc}
          alt=""
        />
        <button onClick={handleNextSlide} className={style.navButton}>
          <ChevronRight />
        </button>
      </div>
      <div className={style.thumbs}>
        {data.length > 0 &&
          data.map((attr) => {
            return (
              <ThumbItem
                onHandleClick={() => {
                  setCurrentIndex(attr.id - 1);
                }}
                isActive={currentIndex === attr.id - 1}
                key={attr.id}
                imgsrc={attr.imgsrc}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SlidewThumbs;
