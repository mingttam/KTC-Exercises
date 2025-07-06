import React from "react";
import styles from "./CartIcon.module.css";

interface CartIconProps {
  itemCount: number;
  onToggleDropdown: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onToggleDropdown }) => {
  return (
    <div className={styles["cart-icon"]} onClick={onToggleDropdown}>
      <span className={styles["cart-icon-symbol"]}>🛒</span>
      {itemCount > 0 && (
        <span className={styles["cart-count"]}>{itemCount}</span>
      )}
    </div>
  );
};

export default CartIcon;
