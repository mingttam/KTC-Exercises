import style from "./renderList01.module.css";

type renderList01Props = {
  image: string;
  label: string;
  subLabel: string;
};

const RenderList01 = ({ image, label, subLabel }: renderList01Props) => {
  return (
    <div className={style.container}>
      <img className={style.img} src={image} alt={label} />
      <p className={style.label}>{label}</p>
      <p className={style.subLabel}>{subLabel}</p>
    </div>
  );
};

export default RenderList01;
