import style from "./renderList04.module.css";

type renderList04Props = {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  discountStatus: boolean;
};

const RenderList04 = ({
  image,
  name,
  price,
  oldPrice,
  discount,
  discountStatus = false,
}: renderList04Props) => {
  return (
    <div className={style.container}>
      <div className={style.listComponent}>
        <img className={style.img} src={image} alt={name} />
        <p className={style.name}>{name}</p>
        <div className={style.priceContainer}>
          <span className={style.price}>{price}</span>
          {discountStatus && (
            <>
              <span className={style.oldPrice}> {oldPrice}</span>
              <div className={style.discount}>{discount}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderList04;
