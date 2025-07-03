import { useState } from "react";
import style from "./buttonAccordtion.module.css";

interface AccordionItemProps {
  id: number;
  label: string;
  content: string;
}

const AccordionItem = ({
  label,
  content,
  isOpen,
  onClick,
}: {
  label: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className={style.accordionItem}>
    <div
      className={`${style.accordionHeader} ${isOpen ? style.open : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </div>
    {isOpen && <div className={style.accordionContent}>{content}</div>}
  </div>
);
const handleChoice = (prev: number[], id: number) =>
  prev.includes(id) ? prev.filter((idx) => idx !== id) : [...prev, id];

const ButtonAccordtion = ({ data }: { data: AccordionItemProps[] }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (id: number) => {
    setOpenIndexes(handleChoice(openIndexes, id));
  };

  return (
    <div className={style.accordionContainer}>
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          label={item.label}
          content={item.content}
          isOpen={openIndexes.includes(item.id)}
          onClick={() => toggleIndex(item.id)}
        />
      ))}
    </div>
  );
};

export default ButtonAccordtion;
