import { useState } from "react";
import style from "./state1.module.css";

interface IAttribute {
  id: number;
  label: string;
}
const AttrItem = ({
  label,
  isActive,
  onHandleClick,
}: {
  label: string;
  isActive: boolean;
  onHandleClick: () => void;
}) => {
  return (
    <span
      onClick={onHandleClick}
      className={`${style.attr_vale} ${isActive ? style.active : ""}`}
    >
      {label}
    </span>
  );
};

const State1 = ({ data }: { data: IAttribute[] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <div className={style.attributes}>
      <span className={style.attr_name}>Màu sắc</span>

      {data.length > 0 &&
        data.map((attr) => {
          return (
            <AttrItem
              onHandleClick={() => {
                setCurrentIndex(attr.id);
              }}
              isActive={currentIndex === attr.id}
              key={attr.id}
              label={attr.label}
            />
          );
        })}
    </div>
  );
};

export default State1;
