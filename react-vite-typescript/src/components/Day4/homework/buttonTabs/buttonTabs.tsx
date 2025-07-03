import { useState } from "react";
import style from "./buttonTabs.module.css";

interface TabItemProps {
  id: number;
  label: string;
  content: string;
}

const TabItem = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${style.tabItem} ${isActive ? style.active : ""} `}
    >
      <span>{label}</span>
    </div>
  );
};

const ButtonTabs = ({ data }: { data: TabItemProps[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //   const onClick = (id: number) => {
  //     setCurrentIndex(id);
  //   };

  return (
    <div className={style.tabContainer}>
      <div className={style.tabItem}>
        {data.length > 0 &&
          data.map((attr) => {
            return (
              <TabItem
                onClick={() => {
                  setCurrentIndex(attr.id);
                }}
                isActive={currentIndex === attr.id}
                key={attr.id}
                label={attr.label}
              />
            );
          })}
      </div>

      <div className={style.tabContent}>{data[currentIndex].content}</div>
    </div>
  );
};

export default ButtonTabs;
